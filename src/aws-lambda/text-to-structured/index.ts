import { z } from "zod";
import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { zodToJsonSchema } from "zod-to-json-schema";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "langchain/prompts";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";

const resumeKeyWordsSchema = z
  .object({
    skills: z.array(z.string()).describe("An array of skills"),
    qualifications: z.array(z.string()).describe("An array of qualifications"),
    tasks: z.array(z.string()).describe("An array of performed tasks"),
  })
  .describe("The object with the skills and qualifications");

const careerKeyWordsSchema = z
  .object({
    tasks: z.array(z.string()).describe("An array of performed tasks"),
  })
  .describe("The object with the skills");

export type KeyPhrases = {
  skills: string[];
  tasks: string[];
  qualifications?: string[];
};

const llm = new ChatOpenAI({
  modelName: "gpt-4-0613", // use the gpt-3.5-turbo-0613 model for development and  gpt-4-0613 for production
  temperature: 0,
});

const outputParser = new JsonOutputFunctionsParser();

export const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  const requestBody = JSON.parse(event.body!);
  const { text, includeQualifications, promptMessage } = requestBody;
  try {
    const prompt = new ChatPromptTemplate({
      promptMessages: [
        SystemMessagePromptTemplate.fromTemplate(promptMessage),
        HumanMessagePromptTemplate.fromTemplate("{inputText}"),
      ],
      inputVariables: ["inputText"],
    });

    // Binding "function_call" below makes the model always call the specified function.
    // If you want to allow the model to call functions selectively, omit it.
    const functionCallingModel = llm.bind({
      functions: [
        {
          name: "output_formatter",
          description: "Should always be used to properly format output",
          parameters: zodToJsonSchema(
            includeQualifications ? resumeKeyWordsSchema : careerKeyWordsSchema
          ),
        },
      ],
      function_call: { name: "output_formatter" },
    });

    const chain = prompt.pipe(functionCallingModel).pipe(outputParser);

    const response = await chain.invoke({
      inputText: text,
    });

    console.log(JSON.stringify(response, null, 2), "extracted keywords");
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};
