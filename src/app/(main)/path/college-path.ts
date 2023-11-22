import { Course, Program } from "@/programs-data/programs-courses-finder";
import { semanticSearchLambda } from ".././uploads/document-processing";
import { findTheCheapestUdemyCourses, findUdemyCourses } from "./online-path";
import { UdemyCourse } from "./online-path";

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

// Find the best match course
const findBestMatchCourse = async (
  searchKeyword: string,
  courses: Course[]
) => {
  const coursesNames = courses.map((course: { courseName: string }) => {
    return course.courseName;
  });
  const searchTerm = `The most relevant course name for ${searchKeyword} is:`;
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
  if (bestMatchCourse) {
    return bestMatchCourse;
  } else {
    return null;
  }
};

// Find the best match program
const findBestMatchProgram = async (
  searchKeyword: string,
  programs: Program[]
) => {
  const programsNames = programs.map(
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
  const bestMatchProgram = programs.find(
    (program: { programName: string }) =>
      program.programName.toLowerCase() ===
      bestMatch[searchTerm][0].pageContent.toLowerCase()
  );
  if (bestMatchProgram) {
    return bestMatchProgram;
  } else {
    return null;
  }
};

// Find the cheapest program
const findTheCheapestProgram = async (programs: Program[]) => {
  const cheapestProgram = programs.reduce(
    (cheapest: Program | null, current: Program) => {
      if (!cheapest) return current;
      const cheapestCost = parseFloat(
        (cheapest.tuitionDomestic || "0").replace("$", "")
      );
      const currentCost = parseFloat(
        (current.tuitionDomestic || "0").replace("$", "")
      );
      return cheapestCost < currentCost ? cheapest : current;
    },
    null
  );
  if (cheapestProgram) {
    return cheapestProgram;
  }
  return null;
};

// Find the cheapest course
const findTheCheapestCourse = async (courses: Course[]) => {
  const cheapestCourse = courses.reduce(
    (cheapest: Course | null, current: Course) => {
      if (!cheapest) return current;
      const cheapestCost = parseFloat((cheapest.cost || "0").replace("$", ""));
      const currentCost = parseFloat((current.cost || "0").replace("$", ""));
      return cheapestCost < currentCost ? cheapest : current;
    },
    null
  );
  if (cheapestCourse) {
    return cheapestCourse;
  }
  return null;
};

// Find the recommended path (program or course) based on the matching skills percentage, recommended programs and recommended courses
export const findRecommendedPath = async (
  matchingSkillsPercentage: number,
  pickedCareer: string,
  programs: Program[],
  courses: Course[]
): Promise<{
  bcitProgram?: Program;
  bcitCourse?: Course;
  udemyCourse?: UdemyCourse;
} | null> => {
  const bcitProgram = await findBestMatchProgram(pickedCareer, programs);
  if (
    matchingSkillsPercentage >= 0 &&
    matchingSkillsPercentage <= 40 &&
    bcitProgram
  ) {
    return { bcitProgram };
  }
  const bcitCourse = await findBestMatchCourse(pickedCareer, courses);
  if (
    matchingSkillsPercentage > 40 &&
    matchingSkillsPercentage < 70 &&
    bcitCourse
  ) {
    return { bcitCourse };
  }
  const udemyCourses = await findUdemyCourses(pickedCareer, 10);
  if (
    matchingSkillsPercentage >= 70 &&
    matchingSkillsPercentage < 100 &&
    udemyCourses
  ) {
    return { udemyCourse: udemyCourses[0] };
  }
  return null;
};

// Find the cheapest path (program or courses) based on the matching skills percentage, recommended programs and recommended courses
export const findTheCheapestPath = async (
  matchingSkillsPercentage: number,
  programs: Program[],
  courses: Course[],
  pickedCarrer: string
): Promise<{
  bcitProgram?: Program;
  bcitCourse?: Course;
  udemyCourse?: UdemyCourse;
} | null> => {
  const bcitProgram = await findTheCheapestProgram(programs);
  if (
    matchingSkillsPercentage >= 0 &&
    matchingSkillsPercentage <= 40 &&
    bcitProgram
  ) {
    return { bcitProgram };
  }
  const bcitCourse = await findTheCheapestCourse(courses);
  if (
    matchingSkillsPercentage > 40 &&
    matchingSkillsPercentage < 70 &&
    bcitCourse
  ) {
    return { bcitCourse };
  }
  const udemyCourses = await findTheCheapestUdemyCourses(pickedCarrer, 10);
  if (
    matchingSkillsPercentage >= 70 &&
    matchingSkillsPercentage < 100 &&
    udemyCourses
  ) {
    return { udemyCourse: udemyCourses[0] };
  }
  return null;
};
