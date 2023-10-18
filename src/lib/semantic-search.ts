"use server";

import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
// import { JSONLoader } from "langchain/document_loaders/fs/json";
import { ScoreThresholdRetriever } from "langchain/retrievers/score_threshold";

export const runSimilaritySearch = async (
  careerData: string[],
  resumeData: string[]
) => {
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
  const metadata = careerData.map((text, index) => ({ id: index }));
  const vectorStore = await MemoryVectorStore.fromTexts(
    careerData,
    metadata,
    new OpenAIEmbeddings()
  );

  const retriever = ScoreThresholdRetriever.fromVectorStore(vectorStore, {
    minSimilarityScore: 0.8, // Finds results with at least this similarity score
    maxK: 1, // The maximum K value to use. Use it based to your chunk size to make sure you don't run out of tokens
    kIncrement: 1, // How much to increase K by each time. It'll fetch N results, then N + kIncrement, then N + kIncrement * 2, etc.
  });

  const uniquePersonSkillsMatches = new Set();
  const uniqueCareerSkillsMatches = new Set();

  for (const skill of resumeData) {
    const result = await retriever.getRelevantDocuments(skill);
    console.log(result, "matching result");
    if (result.length > 0) {
      const uniqueResult = result[0].pageContent;
      if (!uniqueCareerSkillsMatches.has(uniqueResult)) {
        uniqueCareerSkillsMatches.add(uniqueResult);
      }
      uniquePersonSkillsMatches.add(skill);
    }
  }
  const missingSkills = careerData.filter(
    (skill) => !uniqueCareerSkillsMatches.has(skill)
  );
  console.log(missingSkills, "missing skills");
  console.log(uniquePersonSkillsMatches, "matching skills");

  return {
    matchingSkills: Array.from(uniquePersonSkillsMatches),
    missingSkills,
  };
};
