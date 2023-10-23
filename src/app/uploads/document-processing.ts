"use server";

import * as odotnet from "../api/odotnet/fetch-api";
import { KeyPhrases } from "@/aws-lambda/text-to-structured";

export const extractResumeKeyPhrases = async (extractedText: string) => {
  const prompt =
    "List all skills, duties and qualifications mentioned in the following text.";
  const data = await fetch(process.env.LAMBDA_ENDPOINT_TEXT_TO_STRUCTURED!, {
    method: "POST",
    body: JSON.stringify({ text: extractedText, promptMessage: prompt }),
  });
  const resumeKeyPhrases: KeyPhrases = await data.json();
  if (resumeKeyPhrases) {
    const { skills, qualifications } = resumeKeyPhrases;
    const keyPhrases = [...skills, ...qualifications!];
    if (keyPhrases.length > 0) {
      return keyPhrases.map((phrase) => phrase.toLowerCase());
    }
  }
  return null;
};

export const extractCareerKeyPhrases = async (careerCode: string) => {
  const careerData = await odotnet.odotnetCareerOverview(careerCode);
  const skills = careerData?.career?.what_they_do ?? null;
  const title = careerData?.career?.title ?? null;
  if (skills) {
    const prompt = "List all skills or duties mentioned in the following text.";
    const data = await fetch(process.env.LAMBDA_ENDPOINT_TEXT_TO_STRUCTURED!, {
      method: "POST",
      body: JSON.stringify({
        text: skills,
        promptMessage: prompt,
        skillsOnly: true,
      }),
    });
    const careerKeywords: KeyPhrases = await data.json();
    if (careerKeywords) {
      const { skills } = careerKeywords;
      let formattedSkills: string[] = [];
      if (skills.length > 0) {
        formattedSkills = skills.map((skill) => skill.toLowerCase());
      }
      return { title, requiredSkills: formattedSkills };
    }
  }
  return { title, requiredSkills: null };
};

export const findMissingSkills = async (
  careerPhrases: string[],
  resumePhrases: string[]
) => {
  const data = await fetch(process.env.LAMBDA_ENDPOINT_SIMILARITY_SEARCH!, {
    method: "POST",
    body: JSON.stringify({
      inputData: resumePhrases,
      dataToStoreInVectorStore: careerPhrases,
      minSimilarityScore: 0.6,
      kIncrement: 1,
      maxK: 1,
    }),
  });
  const result = await data.json();
  const { vectorStoreMatched, inputDataMatched } = result;

  const missingCareerSkills = careerPhrases.filter(
    (skill) => !vectorStoreMatched.includes(skill)
  );

  const matchedResumeSkills = resumePhrases.filter((skill) =>
    inputDataMatched.includes(skill)
  );

  return {
    missingCareerSkills,
    matchedResumeSkills,
  };
};
