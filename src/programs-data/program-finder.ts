"use server";

import { runSimilaritySearch } from "@/utils/semantic-search";
import programsData from "./programsData.json";

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
  const programsMatches = await runSimilaritySearch(programsNames, keyPhrases);
  const coursesMatches = await runSimilaritySearch(coursesNames, keyPhrases);
  const retrievedPrograms = programsMatches.vectorStoreMatched.map(
    (programName: string) => {
      return programs.find(
        (program: { ProgramName: string }) =>
          program.ProgramName.toLowerCase() === programName
      );
    }
  );

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
