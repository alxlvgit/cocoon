import { getStructuredKeywords, KeyPhrases } from "@/lib/resume-parsers";
import * as odotnet from "./api/odotnet/fetch-api";
import * as enums from "./api/odotnet/enums";
import {
  runSimilaritySearch,
  SimilaritySearchResult,
} from "@/lib/semantic-search";

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

export const extractCareerKeyPhrases = async () => {
  const careerData = await odotnet.odotnetCareerOverview(
    enums.SOCcode.WebandDigitalInterfaceDesigners
  );

  const skills = careerData?.career?.what_they_do ?? null;
  if (skills) {
    const prompt = "List all skills or duties mentioned in the following text.";
    const careerKeywords = await getStructuredKeywords(skills, prompt, true);
    if (careerKeywords) {
      const { skills } = careerKeywords;
      if (skills.length > 0) {
        return skills.map((skill) => skill.toLowerCase());
      }
    }
  }
  return null;
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

  console.log(missingCareerSkills, "missingCareerSkills");
  console.log(matchedResumeSkills, "matchedResumeSkills");

  return {
    missingCareerSkills,
    matchedResumeSkills,
  };
};
