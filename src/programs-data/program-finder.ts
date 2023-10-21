"use server";

import { runSimilaritySearch } from "@/utils/semantic-search";
import { readFile } from "fs/promises";

export const matchProgramsWithKeyPhrases = async (keyPhrases: string[]) => {
  const data = await readFile("src/programs-data/programsData.json", "utf-8");
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

  //TODO: Retrieve the courses and programs that have a match with the missing required skills
  // return courses and programs to fetch them on client side;
};
