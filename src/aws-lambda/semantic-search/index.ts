import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ScoreThresholdRetriever } from "langchain/retrievers/score_threshold";
import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
// import { JSONLoader } from "langchain/document_loaders/fs/json";

export type SimilaritySearchResult = {
  inputDataMatched: string[];
  vectorStoreMatched: string[];
};

export const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    const requestBody = JSON.parse(event.body!);
    const {
      dataToStoreInVectorStore,
      inputData,
      minSimilarityScore,
      kIncrement,
      maxK,
    } = requestBody;
    // Use this if you want to load the json docs into the vector store from the file
    // Create docs with a loader, and specify the paths to the text fields in the json like so: ["/ProgramName", "/CourseName"]
    //   const loader = new JSONLoader("src/app/api/test/bcit-programs.json", [
    //     "/ProgramName",
    //     "/CourseName",
    //   ]);
    //   const docs = await loader.load();

    // const vectorStore = await MemoryVectorStore.fromDocuments(
    //   docs,
    //   new OpenAIEmbeddings()
    // );

    // Load the text array into the memory vector store
    const metadata = dataToStoreInVectorStore.map(
      (text: string, index: number) => ({
        id: index,
      })
    );
    const vectorStore = await MemoryVectorStore.fromTexts(
      dataToStoreInVectorStore,
      metadata,
      new OpenAIEmbeddings({
        modelName: "text-embedding-ada-002",
      })
    );

    const retriever = ScoreThresholdRetriever.fromVectorStore(vectorStore, {
      minSimilarityScore, // Finds results with at least this similarity score
      maxK, // The maximum K value to use. Use it based to your chunk size to make sure you don't run out of tokens
      kIncrement, // How much to increase K by each time. It'll fetch N results, then N + kIncrement, then N + kIncrement * 2, etc.
    });

    const uniqueInputMatches: Set<string> = new Set();
    const uniqueVectorStoreMatches: Set<string> = new Set();

    for (const searchedPhrase of inputData) {
      const result = await retriever.getRelevantDocuments(searchedPhrase);
      // console.log(result, "matching result");
      if (result.length > 0) {
        const resultContent = result[0].pageContent;
        if (!uniqueVectorStoreMatches.has(resultContent)) {
          uniqueVectorStoreMatches.add(resultContent.toLowerCase());
        }
        uniqueInputMatches.add(searchedPhrase.toLowerCase());
        console.log(searchedPhrase + " Matches " + resultContent);
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify({
        inputDataMatched: [...uniqueInputMatches],
        vectorStoreMatched: [...uniqueVectorStoreMatches],
      }),
    };
  } catch (error) {
    console.log(error, "error");
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
