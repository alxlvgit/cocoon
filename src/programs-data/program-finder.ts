"use server";

import programsData from "./programsData.json";

// TODO: refactor to have two separate functions for programs and courses
export const matchProgramsWithKeyPhrases = async (keyPhrases: string[]) => {
  if (!keyPhrases || keyPhrases.length === 0) {
    console.log("No key phrases provided for program finder.");
    return { retrievedPrograms: [], retrievedCourses: [] };
  }
  const data = JSON.stringify(programsData);
  const { programs, courses } = JSON.parse(data);
  const programsNames = programs.map(
    (program: { ProgramName: string }) => program.ProgramName
  );
  const coursesNames = courses.map(
    (course: { CourseName?: string; title?: string }) => {
      if (course.CourseName) {
        return course.CourseName;
      } else if (course.title) {
        return course.title;
      }
    }
  );

  const programSearch = await fetch(
    process.env.LAMBDA_ENDPOINT_SIMILARITY_SEARCH!,
    {
      method: "POST",
      body: JSON.stringify({
        inputData: keyPhrases,
        dataToStoreInVectorStore: programsNames,
        minSimilarityScore: 0.6,
        kIncrement: 1,
        maxK: 1,
      }),
    }
  );
  const programsMatches = await programSearch.json();

  const retrievedPrograms = programsMatches.vectorStoreMatched.map(
    (programName: string) => {
      return programs.find(
        (program: { ProgramName: string }) =>
          program.ProgramName.toLowerCase() === programName
      );
    }
  );

  const courseSearch = await fetch(
    process.env.LAMBDA_ENDPOINT_SIMILARITY_SEARCH!,
    {
      method: "POST",
      body: JSON.stringify({
        inputData: keyPhrases,
        dataToStoreInVectorStore: coursesNames,
        minSimilarityScore: 0.6,
        kIncrement: 1,
        maxK: 1,
      }),
    }
  );
  const coursesMatches = await courseSearch.json();

  const retrievedCourses = coursesMatches.vectorStoreMatched.map(
    (courseName: string) => {
      return courses.find((course: { CourseName?: string; title?: string }) => {
        if (course.CourseName) {
          return course.CourseName.toLowerCase() === courseName;
        } else if (course.title) {
          return course.title.toLowerCase() === courseName;
        }
      });
    }
  );

  return { retrievedPrograms, retrievedCourses };
};
