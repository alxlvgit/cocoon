// "use server"

import * as odotnet from "../../api/odotnet/fetch-api";
import { KeyPhrases } from "@/aws-lambda/text-to-structured";

// Invoke AWS Lambda function to extract key phrases from text
export const extractKeyPhrasesLambda = async (
  text: string,
  promptMessage: string,
  includeQualifications: boolean
) => {
  const data = await fetch(
    "https://aq26w2ucx5iiz4zyonmmhsey3a0vhdbl.lambda-url.us-west-2.on.aws/",
    {
      method: "POST",
      body: JSON.stringify({
        text: text,
        promptMessage: promptMessage,
        includeQualifications,
      }),
    }
  );
  const keyPhrases: KeyPhrases = await data.json();
  return keyPhrases;
};

// Invoke AWS Lambda function to perform semantic search
export const semanticSearchLambda = async (
  inputData: string[],
  dataToStoreInVectorStore: string[],
  minSimilarityScore: number,
  kIncrement: number,
  maxK: number,
  metadata?: { id: number }[]
) => {
  const data = await fetch(
    "https://4u4plgzyv6amk3jeqp5wmcksla0swhmm.lambda-url.us-west-2.on.aws/",
    {
      method: "POST",
      body: JSON.stringify({
        inputData: inputData,
        dataToStoreInVectorStore: dataToStoreInVectorStore,
        minSimilarityScore: minSimilarityScore,
        kIncrement: kIncrement,
        maxK: maxK,
        metadata: metadata ? metadata : null,
      }),
    }
  );
  const result = await data.json();
  return result;
};

// Extract key phrases from resume
export const extractResumeKeyPhrases = async (extractedText: string) => {
  const prompt =
    "List all skills, performed tasks, and qualifications mentioned in the following text.";
  const resumeKeyPhrases = await extractKeyPhrasesLambda(
    extractedText,
    prompt,
    true
  );
  if (resumeKeyPhrases) {
    const { skills, qualifications, tasks } = resumeKeyPhrases;
    const keyPhrases = [...skills, ...qualifications!, ...tasks];
    if (keyPhrases.length > 0) {
      return keyPhrases.map((phrase) => phrase.toLowerCase());
    }
  }
  return null;
};

// Extract key phrases from career. Get career title and required tasks that are performed on the job
export const extractCareerKeyPhrases = async (careerCode: string) => {
  const careerData = await odotnet.odotnetCareerOverview(careerCode);
  const title = careerData?.career?.title ?? null;
  let onTheJobTasks = careerData?.career?.on_the_job?.task ?? null;
  let whatTheyDo = careerData?.career?.what_they_do ?? null;
  let requiredTasks: string[] = [];
  if (whatTheyDo) {
    const prompt = "List all performed tasks mentioned in the following text.";
    const careerKeywords = await extractKeyPhrasesLambda(
      whatTheyDo,
      prompt,
      false
    );
    if (careerKeywords) {
      whatTheyDo = careerKeywords.tasks.map((task) => task.toLowerCase());
    }
  }

  if (onTheJobTasks) {
    onTheJobTasks = onTheJobTasks.map((task: string) => task.toLowerCase());
  }
  requiredTasks =
    whatTheyDo && onTheJobTasks
      ? [...whatTheyDo, ...onTheJobTasks]
      : whatTheyDo
      ? whatTheyDo
      : onTheJobTasks
      ? onTheJobTasks
      : null;

  if (requiredTasks && title) {
    return { requiredTasks, title };
  }
  return null;
};

// Find missing and matching skills by performing semantic search
export const findMissingSkills = async (
  careerPhrases: string[],
  resumePhrases: string[]
) => {
  const result = await semanticSearchLambda(
    resumePhrases,
    careerPhrases,
    0.75,
    1,
    1
  );

  const matchedCareerSkills = new Set<string>(); // unique matches from career required skills

  const matchedResumeSkills = Object.keys(result); // matched resume skills
  for (const resumeSkill in result) {
    if (result[resumeSkill].length > 0) {
      matchedCareerSkills.add(result[resumeSkill][0].pageContent.toLowerCase());
    }
  }
  const missingCareerSkills = careerPhrases.filter(
    (skill) => !matchedCareerSkills.has(skill.toLowerCase())
  ); // missing required career skills

  return {
    missingCareerSkills,
    matchedResumeSkills,
    matchedCareerSkills,
  };
};
