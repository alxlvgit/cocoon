import { getStructuredKeywords, KeyPhrases } from "@/utils/resume-parsers";
import * as odotnet from "../api/odotnet/fetch-api";
import {
  runSimilaritySearch,
  SimilaritySearchResult,
} from "@/utils/semantic-search";

export const extractResumeKeyPhrases = async (extractedText: string) => {
  const prompt =
    "List all skills, duties and qualifications mentioned in the following text.";
  const resumeKeyPhrases = (await getStructuredKeywords(
    extractedText,
    prompt,
    false
  )) as KeyPhrases;
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
    const careerKeywords = await getStructuredKeywords(skills, prompt, true);
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
  const result: SimilaritySearchResult = await runSimilaritySearch(
    careerPhrases,
    resumePhrases
  );
  const { vectorStoreMatched, dataToCompareMatched } = result;

  const missingCareerSkills = careerPhrases.filter(
    (skill) => !vectorStoreMatched.includes(skill)
  );

  const matchedResumeSkills = resumePhrases.filter((skill) =>
    dataToCompareMatched.includes(skill)
  );

  // console.log(missingCareerSkills, "missingCareerSkills");
  // console.log(matchedResumeSkills, "matchedResumeSkills");

  return {
    missingCareerSkills,
    matchedResumeSkills,
  };
};
