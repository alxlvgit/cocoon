"use server";

import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "langchain/prompts";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";


// send request to lambda function to extract text from pdf
export const extractTextFromPdf = async (
  requestBody: string
): Promise<string | undefined> => {
  try {
    const extractedText = await fetch(process.env.LAMBDA_ENDPOINT_TEXTRACT!, {
      method: "POST",
      body: JSON.stringify({ Bytes: requestBody }),
    });
    if (extractedText.status !== 200) {
      return undefined;
    }
    const data = await extractedText.json();
    if (Object.keys(data).length === 0) {
      return undefined;
    } else {
      return data;
    }
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

// send request to lambda function to extract text from docx
export const extractTextFromDocx = async (
  requestBody: string
): Promise<string | undefined> => {
  try {
    const extractedText = await fetch(process.env.LAMBDA_ENDPOINT_DOCXTRACT!, {
      method: "POST",
      body: JSON.stringify({ file: requestBody }),
    });
    const data = await extractedText.json();
    if (data.trim().length === 0) {
      return undefined;
    } else {
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};

// extract keywords from the text
export const getStructuredKeywords = async (
  text: string
): Promise<string[] | undefined> => {
  try {
    const zodSchema = z
      .object({
        skills: z.array(z.string()).describe("An array of skills"),
        qualifications: z.array(z.string()).describe("An array of skills"),
      })
      .describe("The object with the skills and qualifications");

    type Response = z.infer<typeof zodSchema>;

    const prompt = new ChatPromptTemplate({
      promptMessages: [
        SystemMessagePromptTemplate.fromTemplate(
          "List all skills and qualifications mentioned in the following text."
        ),
        HumanMessagePromptTemplate.fromTemplate("{inputText}"),
      ],
      inputVariables: ["inputText"],
    });

    const llm = new ChatOpenAI({
      modelName: "gpt-3.5-turbo-0613",
      temperature: 0,
    });

    // Binding "function_call" below makes the model always call the specified function.
    // If you want to allow the model to call functions selectively, omit it.
    const functionCallingModel = llm.bind({
      functions: [
        {
          name: "output_formatter",
          description: "Should always be used to properly format output",
          parameters: zodToJsonSchema(zodSchema),
        },
      ],
      function_call: { name: "output_formatter" },
    });

    const outputParser = new JsonOutputFunctionsParser();

    const chain = prompt.pipe(functionCallingModel).pipe(outputParser);

    const response = (await chain.invoke({
      inputText: text,
    })) as Response;

    console.log(JSON.stringify(response, null, 2));

    return [...response.skills, ...response.qualifications];
  } catch (err) {
    console.log(err);
  }
};
