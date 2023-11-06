import { semanticSearchLambda } from "../uploads/document-processing";

export const calculateSkillsMatchPercentage = (
  matchingSkills: string[],
  requiredSkills: string[]
) => {
  const matchingSkillsCount = matchingSkills.length;
  const requiredSkillsCount = requiredSkills.length;
  const percentage = Math.round(
    (matchingSkillsCount / requiredSkillsCount) * 100
  );
  return percentage;
};

export const findRecommendedPath = async (
  matchingSkillsPercentage: number,
  pickedCareer: string,
  programs,
  courses
) => {
  // TODO: fix types for courses and programs
  // if no mathch found in programs, search in courses, if no match found in courses, return null (no recommended path)
  // find the best match based on skills match percentage. Set the threshold to 30% for programs and 70% for courses
  const programsNames = programs.map(
    (program: { ProgramName: string }) => program.ProgramName
  );
  const searchTerm = `The most relevant program name for ${pickedCareer} is:`;
  const bestMatch = await semanticSearchLambda(
    [searchTerm],
    programsNames,
    0.6,
    1,
    1
  );
  const bestMatchProgram = programs.find(
    (program: { ProgramName: string }) =>
      program.ProgramName.toLowerCase() ===
      bestMatch[searchTerm][0].pageContent.toLowerCase()
  );
  console.log(bestMatchProgram, "bestMatchProgram");
  return bestMatchProgram;
};
