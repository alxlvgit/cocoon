import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ScoreThresholdRetriever } from "langchain/retrievers/score_threshold";
import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
// import { JSONLoader } from "langchain/document_loaders/fs/json";

export type SimilaritySearchResult = {
  pageContent: string;
  metadata: { id: number };
};

export type SimilaritySearchMatches = {
  [key: string]: SimilaritySearchResult[];
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
    let metadata = [];
    // Load the text array into the memory vector store
    if (requestBody?.metadata) {
      metadata = requestBody.metadata;
    } else {
      metadata = dataToStoreInVectorStore.map(
        (text: string, index: number) => ({
          id: index,
        })
      );
    }
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

    // const uniqueInputMatches: Set<string> = new Set();
    // const uniqueVectorStoreMatches: Set<string> = new Set();
    const matches: SimilaritySearchMatches = {};

    for (const searchedPhrase of inputData) {
      const result = await retriever.getRelevantDocuments(searchedPhrase);
      if (result.length > 0) {
        const resultContent: SimilaritySearchResult = {
          pageContent: result[0].pageContent,
          metadata: result[0].metadata as { id: number },
        };
        if (matches[searchedPhrase]) {
          matches[searchedPhrase].push(resultContent);
        } else {
          matches[searchedPhrase] = [resultContent];
        }
        console.log(searchedPhrase + " Matches " + resultContent);
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify(matches),
    };
  } catch (error) {
    console.log(error, "error");
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
