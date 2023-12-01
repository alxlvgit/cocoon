import {
  CourseWithSkills,
  ProgramWithSkills,
  RecommendedPath,
  UdemyCourseWithSkills,
  UdemyPath,
} from "@/redux/features/pathSlice";
import { semanticSearchLambda } from "../uploads/document-processing";
import { UdemyCourse, searchUdemyCourses } from "./fetch-udemy";
import programsData from "@/programsData.json";
import { Course, Program, SemanticSearchResult } from "@/types/types";

type MatchedBcitCoursesResult =
  | {
      coursesWithSkills: { [key: string]: CourseWithSkills };
      courses: Course[];
      error?: undefined;
    }
  | {
      coursesWithSkills?: undefined;
      courses?: undefined;
      error: string;
    };

type MatchedBcitProgramsResult =
  | {
      success: Program[];
      error?: undefined;
    }
  | {
      success?: undefined;
      error: string;
    };

type BestMatchedBcitProgramResult =
  | {
      programWithSkills: ProgramWithSkills;
      program: Program;
      error?: undefined;
    }
  | {
      programWithSkills?: undefined;
      program?: undefined;
      error: string;
    };

type UdemyPathResult =
  | {
      udemyCourses: UdemyCourse[];
      udemyCoursesWithSkills: UdemyPath;
      error?: undefined;
    }
  | {
      udemyCourses?: undefined;
      udemyCoursesWithSkills?: undefined;
      error: string;
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

// Find the best matched single program based on the missing skills and the search keyword (picked career)
export const findBestMatchProgram = async (
  searchKeyword: string,
  missingSkills: string[]
): Promise<BestMatchedBcitProgramResult> => {
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
          programWithSkills: {
            skills: missingSkills.map((skill) => ({
              skill: skill,
              acquired: false,
            })),
            program: bestMatchProgramObject,
          },
          program: bestMatchProgramObject,
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

// Find matching BCIT programs based on the missing skills
export const matchProgramsWithKeyPhrases = async (
  keyPhrases: string[]
): Promise<MatchedBcitProgramsResult> => {
  try {
    const data = JSON.stringify(programsData);
    const { programs } = JSON.parse(data);
    const programsNames = programs.map(
      (program: { programName: string }) => program.programName
    );

    const programSearch = await semanticSearchLambda(
      keyPhrases,
      programsNames,
      0.7,
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

// Find matching BCIT courses based on the missing skills
export const matchCoursesWithKeyPhrases = async (
  keyPhrases: string[]
): Promise<MatchedBcitCoursesResult> => {
  try {
    const data = JSON.stringify(programsData);
    const { courses } = JSON.parse(data);
    const coursesNames = courses.map(
      (course: { courseName: string }) => course.courseName
    );

    const courseSearch: {
      [key: string]: SemanticSearchResult[];
    } = await semanticSearchLambda(keyPhrases, coursesNames, 0.7, 1, 1);

    const matchedCoursesWithSkills: {
      [key: string]: CourseWithSkills;
    } = {};

    const matchedCourses = new Set<Course>();

    Object.entries(courseSearch).map(([key, value]) => {
      const course: Course = courses.find(
        (course: { courseName: string }) =>
          course.courseName.toLowerCase() === value[0].pageContent.toLowerCase()
      );
      if (course) {
        matchedCourses.add(course);
        if (!matchedCoursesWithSkills[course.courseName]) {
          matchedCoursesWithSkills[course.courseName] = {
            skills: [],
            course: course,
          };
        }
        matchedCoursesWithSkills[course.courseName].skills.push({
          skill: key,
          acquired: false,
        });
      }
    });
    return {
      coursesWithSkills: matchedCoursesWithSkills,
      courses: Array.from(matchedCourses),
    };
  } catch (err) {
    console.error(err);
    return { error: "Could not match the courses with keyphrases" };
  }
};

// Find the recommended path (program or course) based on the matching skills percentage
export const findRecommendedPath = async (
  matchingSkillsPercentage: number,
  pickedCareer: string,
  missingSkills: string[],
  programWithSkills?: ProgramWithSkills,
  coursesWithSkills?: { [key: string]: CourseWithSkills }
): Promise<RecommendedPath | null> => {
  if (
    matchingSkillsPercentage >= 0 &&
    matchingSkillsPercentage <= 50 &&
    programWithSkills
  ) {
    return {
      bcitProgram: {
        [programWithSkills.program.programName]: programWithSkills,
      },
    };
  }

  if (
    matchingSkillsPercentage > 50 &&
    matchingSkillsPercentage < 70 &&
    coursesWithSkills
  ) {
    return { bcitCourses: coursesWithSkills };
  }
  const udemyCourses = await searchUdemyCourses(pickedCareer, 1);
  const formatedMissingSkills = missingSkills.map((skill) => ({
    skill: skill,
    acquired: false,
  }));
  if (
    matchingSkillsPercentage >= 70 &&
    matchingSkillsPercentage < 100 &&
    udemyCourses
  ) {
    return {
      udemyCourses: {
        [udemyCourses[0].title]: {
          skills: formatedMissingSkills,
          course: udemyCourses[0],
        },
      },
    };
  }
  return null;
};

// Find the Udemy path based on the matching skills percentage
export const findUdemyPath = async (
  searchTerm: string,
  missingSkills: string[]
): Promise<UdemyPathResult> => {
  try {
    const udemyFetchResult = await searchUdemyCourses(searchTerm, 300);
    const textToEmbed = udemyFetchResult!.map((course) => {
      return `
    Course Title: ${course.title}
    \n\nIs Paid: ${course.is_paid ? "Yes" : "No"}
    \n\nPublished Title: ${course.published_title}
    \n\nHeadline: ${course.headline}
    \n\n`;
    });

    const metadata = udemyFetchResult!.map((course) => ({
      id: course.id,
    }));

    const result: {
      [key: string]: SemanticSearchResult[];
    } = await semanticSearchLambda(
      missingSkills,
      textToEmbed,
      0.73,
      1,
      1,
      metadata
    );

    const matchingCourses = new Set<UdemyCourse>();
    const matchingCoursesWithSkills: {
      [key: string]: UdemyCourseWithSkills;
    } = {};

    Object.entries(result).map(([key, value]) => {
      const course = udemyFetchResult!.find(
        (course) => course.id === value[0].metadata.id
      );
      if (course) {
        matchingCourses.add(course);
        if (!matchingCoursesWithSkills[course.title]) {
          matchingCoursesWithSkills[course.title] = {
            skills: [],
            course: course,
          };
        }
        matchingCoursesWithSkills[course.title].skills.push({
          skill: key,
          acquired: false,
        });
      }
    });

    const udemyMatches = Array.from(matchingCourses);
    if (udemyMatches.length > 0) {
      return {
        udemyCourses: udemyMatches,
        udemyCoursesWithSkills: matchingCoursesWithSkills,
      };
    }
    return { error: "Could not find the Udemy path" };
  } catch (err) {
    console.error(err);
    return { error: "Could not find the Udemy path" };
  }
};
