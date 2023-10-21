"use server";

import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
// import { JSONLoader } from "langchain/document_loaders/fs/json";
import { ScoreThresholdRetriever } from "langchain/retrievers/score_threshold";

export type SimilaritySearchResult = {
  dataToCompareMatched: string[];
  vectorStoreMatched: string[];
};

export const runSimilaritySearch = async (
  dataToStoreInVectorStore: string[],
  dataToCompare: string[]
): Promise<SimilaritySearchResult> => {
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
  const metadata = dataToStoreInVectorStore.map((text, index) => ({
    id: index,
  }));
  const vectorStore = await MemoryVectorStore.fromTexts(
    dataToStoreInVectorStore,
    metadata,
    new OpenAIEmbeddings({
      modelName: "text-embedding-ada-002",
    })
  );

  const retriever = ScoreThresholdRetriever.fromVectorStore(vectorStore, {
    minSimilarityScore: 0.6, // Finds results with at least this similarity score
    maxK: 1, // The maximum K value to use. Use it based to your chunk size to make sure you don't run out of tokens
    kIncrement: 1, // How much to increase K by each time. It'll fetch N results, then N + kIncrement, then N + kIncrement * 2, etc.
  });

  const uniqueDataToCompareMatches: Set<string> = new Set();
  const uniqueVectorStoreMatches: Set<string> = new Set();

  for (const comparedPhrase of dataToCompare) {
    const result = await retriever.getRelevantDocuments(comparedPhrase);
    // console.log(result, "matching result");
    if (result.length > 0) {
      const resultContent = result[0].pageContent;
      if (!uniqueVectorStoreMatches.has(resultContent)) {
        uniqueVectorStoreMatches.add(resultContent.toLowerCase());
      }
      uniqueDataToCompareMatches.add(comparedPhrase.toLowerCase());
      console.log(comparedPhrase + " Matches " + resultContent);
    }
  }
  console.log(uniqueDataToCompareMatches, "uniqueDataToCompareMatches");
  console.log(uniqueVectorStoreMatches, "uniqueVectorStoreMatches");

  return {
    dataToCompareMatched: [...uniqueDataToCompareMatches],
    vectorStoreMatched: [...uniqueVectorStoreMatches],
  };
};
