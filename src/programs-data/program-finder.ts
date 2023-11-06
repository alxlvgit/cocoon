import { semanticSearchLambda } from "@/app/uploads/document-processing";
import programsData from "./programsData.json";

// Find matching programs
export const matchProgramsWithKeyPhrases = async (keyPhrases: string[]) => {
  // if (!keyPhrases || keyPhrases.length === 0) {
  //   console.log("No key phrases provided for program finder.");
  //   return null;
  // }
  const data = JSON.stringify(programsData);
  const { programs } = JSON.parse(data);
  const programsNames = programs.map(
    (program: { ProgramName: string }) => program.ProgramName
  );

  const programSearch = await semanticSearchLambda(
    keyPhrases,
    programsNames,
    0.6,
    1,
    1
  );

  let matchedPrograms = new Set();
  for (const key in programSearch) {
    matchedPrograms.add(
      programs.find(
        (program: { ProgramName: string }) =>
          program.ProgramName.toLowerCase() ===
          programSearch[key][0].pageContent.toLowerCase()
      )
    );
  }

  return { matchedPrograms };
};

// Find matching courses
export const matchCoursesWithKeyPhrases = async (keyPhrases: string[]) => {
  // if (!keyPhrases || keyPhrases.length === 0) {
  //   console.log("No key phrases provided for program finder.");
  //   return null;
  // }
  const data = JSON.stringify(programsData);
  const { courses } = JSON.parse(data);
  const coursesNames = courses.map(
    (course: { CourseName?: string; title?: string }) => {
      if (course.CourseName) {
        return course.CourseName;
      } else if (course.title) {
        return course.title;
      }
    }
  );

  const courseSearch = await semanticSearchLambda(
    keyPhrases,
    coursesNames,
    0.6,
    1,
    1
  );

  let matchedCourses = new Set();

  for (const key in courseSearch) {
    matchedCourses.add(
      courses.find((course: { CourseName?: string; title?: string }) => {
        if (course.CourseName) {
          return (
            course.CourseName.toLowerCase() ===
            courseSearch[key][0].pageContent.toLowerCase()
          );
        } else if (course.title) {
          return (
            course.title.toLowerCase() ===
            courseSearch[key][0].pageContent.toLowerCase()
          );
        }
      })
    );
  }

  return { matchedCourses };
};
