import { Course, Program } from "@/programs-data/program-finder";
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
  programs: Program[],
  courses: Course[]
) => {
  // TODO: fix types for courses and programs
  // if no mathch found in programs, search in courses, if no match found in courses, return null (no recommended path)
  // find the best match based on skills match percentage. Set the threshold to 30% for programs and 70% for courses
  console.log(matchingSkillsPercentage, "matchingSkillsPercentage");

  switch (true) {
    case matchingSkillsPercentage >= 30 && matchingSkillsPercentage < 65:
      const bestMatchProgram = await findBestMatchProgram(
        pickedCareer,
        programs
      );
      if (bestMatchProgram) {
        return { bestMatchProgram };
      } else {
        const bestMatchCourse = await findBestMatchCourse(
          pickedCareer,
          courses
        );
        if (bestMatchCourse) {
          return { bestMatchCourse };
        } else {
          return null;
        }
      }
    case matchingSkillsPercentage >= 65 && matchingSkillsPercentage < 100:
      const bestMatchCourse = await findBestMatchCourse(pickedCareer, courses);
      if (bestMatchCourse) {
        return { bestMatchCourse };
      } else {
        // find the most relevant udemy course
        // if no match found in udemy courses, return null (no recommended path)
        return null;
      }
    default:
      // find the most relevant udemy course
      return null;
  }
};

export const findBestMatchCourse = async (
  pickedCareer: string,
  courses: Course[]
) => {
  const coursesNames = courses.map((course: { courseName: string }) => {
    return course.courseName;
  });
  const searchTerm = `The most relevant course name for ${pickedCareer} is:`;
  const bestMatch = await semanticSearchLambda(
    [searchTerm],
    coursesNames,
    0.7,
    1,
    1
  );
  const bestMatchCourse = courses.find(
    (course: { courseName: string }) =>
      course.courseName.toLowerCase() ===
      bestMatch[searchTerm][0].pageContent.toLowerCase()
  );
  console.log(bestMatchCourse, "bestMatchCourse");
  if (bestMatchCourse) {
    return bestMatchCourse;
  } else {
    return null;
  }
};

export const findBestMatchProgram = async (
  pickedCareer: string,
  programs: Program[]
) => {
  const programsNames = programs.map(
    (program: { programName: string }) => program.programName
  );
  const searchTerm = `The most relevant program name for ${pickedCareer} is:`;
  const bestMatch = await semanticSearchLambda(
    [searchTerm],
    programsNames,
    0.7,
    1,
    1
  );
  const bestMatchProgram = programs.find(
    (program: { programName: string }) =>
      program.programName.toLowerCase() ===
      bestMatch[searchTerm][0].pageContent.toLowerCase()
  );
  console.log(bestMatchProgram, "bestMatchProgram");
  if (bestMatchProgram) {
    return bestMatchProgram;
  } else {
    return null;
  }
};
