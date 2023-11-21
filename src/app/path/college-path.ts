import { semanticSearchLambda } from "../uploads/document-processing";
import { findUdemyCourses } from "./online-path";
import programsData from "@/programsData.json";
import { Course, Program, SemanticSearchResult } from "@/types/types";
import { UdemyCourse } from "./online-path";

// change this to have not success but a program object, and program with skills object
// same for courses
type MatchedCoursesResult =
  | {
      success: { [key: string]: string[] };
      error?: undefined;
    }
  | {
      success?: undefined;
      error: string;
    };

type MatchedProgramsResult =
  | {
      success: Program[];
      error?: undefined;
    }
  | {
      success?: undefined;
      error: string;
    };

export type RecommendedPathResult = {
  bcitProgram?: Program;
  bcitCourses?: { [key: string]: string[] };
  udemyCourses?: UdemyCourse;
};

// Calculate the matching skills percentage
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

// Find matching BCIT programs
export const matchProgramsWithKeyPhrases = async (
  keyPhrases: string[]
): Promise<MatchedProgramsResult> => {
  try {
    const data = JSON.stringify(programsData);
    const { programs } = JSON.parse(data);
    const programsNames = programs.map(
      (program: { programName: string }) => program.programName
    );

    const programSearch = await semanticSearchLambda(
      keyPhrases,
      programsNames,
      0.6,
      1,
      1
    );

    let matchedPrograms = new Set<Program>();
    for (const key in programSearch) {
      matchedPrograms.add(
        programs.find(
          (program: { programName: string }) =>
            program.programName.toLowerCase() ===
            programSearch[key][0].pageContent.toLowerCase()
        )
      );
    }

    return { success: Array.from(matchedPrograms) };
  } catch (err) {
    console.error(err);
    return { error: "Could not match the programs with keyphrases" };
  }
};

// Find matching BCIT courses
export const matchCoursesWithKeyPhrases = async (
  keyPhrases: string[]
): Promise<MatchedCoursesResult> => {
  try {
    const data = JSON.stringify(programsData);
    const { courses } = JSON.parse(data);
    const coursesNames = courses.map(
      (course: { courseName: string }) => course.courseName
    );

    const courseSearch: {
      [key: string]: SemanticSearchResult[];
    } = await semanticSearchLambda(keyPhrases, coursesNames, 0.6, 1, 1);

    const matchedCoursesWithSkills: {
      [key: string]: string[];
    } = {};

    const matchedCourses = new Set<Course>();

    Object.entries(courseSearch).map(([key, value]) => {
      const course = courses.find(
        (course: { courseName: string }) =>
          course.courseName.toLowerCase() === value[0].pageContent.toLowerCase()
      );
      if (course) {
        matchedCourses.add(course);
        if (!matchedCoursesWithSkills[course.courseName]) {
          matchedCoursesWithSkills[course.courseName] = [];
        }
        matchedCoursesWithSkills[course.courseName].push(key);
      }
    });
    console.log(matchedCoursesWithSkills);
    console.log(matchedCourses);

    return {
      success: matchedCoursesWithSkills,
    };
  } catch (err) {
    console.error(err);
    return { error: "Could not match the courses with keyphrases" };
  }
};

// Find the best match single program
export const findBestMatchProgram = async (
  searchKeyword: string,
  missingSkills: string[]
) => {
  try {
    const programs = await matchProgramsWithKeyPhrases(missingSkills);
    if (programs.success) {
      const programsNames = programs.success.map(
        (program: { programName: string }) => program.programName
      );
      const searchTerm = `The most relevant program name for ${searchKeyword} is:`;
      const bestMatch = await semanticSearchLambda(
        [searchTerm],
        programsNames,
        0.7,
        1,
        1
      );
      const bestMatchProgramObject = programs.success.find(
        (program: { programName: string }) =>
          program.programName.toLowerCase() ===
          bestMatch[searchTerm][0].pageContent.toLowerCase()
      );
      if (bestMatchProgramObject) {
        return {
          success: {
            [bestMatchProgramObject.programName]: missingSkills,
            bestMatchProgramObject,
          },
        };
      } else {
        return { error: "Could not find the best match program" };
      }
    } else {
      return { error: "Could not find the best match program" };
    }
  } catch (err) {
    console.error(err);
    return { error: "Could not find the best match program" };
  }
};

// Find the recommended path (program or course) based on the matching skills percentage, recommended programs and recommended courses
export const findRecommendedPath = async (
  matchingSkillsPercentage: number,
  pickedCareer: string,
  program: Program,
  courses?: { [key: string]: string[] }
): Promise<RecommendedPathResult | null> => {
  if (
    matchingSkillsPercentage >= 0 &&
    matchingSkillsPercentage <= 50 &&
    program
  ) {
    return { bcitProgram: program };
  }

  if (
    matchingSkillsPercentage > 50 &&
    matchingSkillsPercentage < 70 &&
    courses
  ) {
    return { bcitCourses: courses };
  }
  const udemyCourses = await findUdemyCourses(pickedCareer, 10);
  if (
    matchingSkillsPercentage >= 70 &&
    matchingSkillsPercentage < 100 &&
    udemyCourses
  ) {
    return { udemyCourses: udemyCourses[0] };
  }
  return null;
};
