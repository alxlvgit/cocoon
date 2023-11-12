import { semanticSearchLambda } from "@/app/uploads/document-processing";
import programsData from "./programsData.json";

interface Contact {
  name: string;
  role: string;
  phone: string;
  email: string;
}

export interface Course {
  courseCode: string;
  courseName: string;
  format?: string;
  prerequisites?: string;
  credits?: number;
  cost?: string;
  duration?: string;
  crn?: string;
  classTimes?: string;
  instructor: string;
  importantInfo?: string;
  status?: string;
  terms?: string[];
  campus?: string[];
  offerings?: CourseOffering[];
  tuition?: string;
  schedule?: {
    date: string;
    day: string;
    time: string;
    location: string;
  }[];
}

interface CourseOffering {
  crn: string;
  duration: string;
  tuition: string;
  schedule: {
    date: string;
    day: string;
    time: string;
    location: string;
  }[];
  instructor: string;
  status: string;
}

export interface Program {
  programName: string;
  tuitionDomestic?: string;
  tuition?: {
    domestic?: {
      twoTerms: string;
      threeTerms: string;
    };
    international?: {
      twoTerms: string;
      threeTerms: string;
    };
  };
  intakes: string[];
  degree: string;
  requiredCourses?: {
    courseName: string;
    credits: number;
  }[];
  totalCredits?: number;
  delivery: string;
  contact: Contact;
}

// Find matching BCIT programs
export const matchProgramsWithKeyPhrases = async (keyPhrases: string[]) => {
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

    return { matchedPrograms: Array.from(matchedPrograms) };
  } catch (err) {
    console.error(err);
    return { matchedPrograms: [] };
  }
};

// Find matching BCIT courses
export const matchCoursesWithKeyPhrases = async (keyPhrases: string[]) => {
  try {
    const data = JSON.stringify(programsData);
    const { courses } = JSON.parse(data);
    const coursesNames = courses.map(
      (course: { courseName: string }) => course.courseName
    );

    const courseSearch = await semanticSearchLambda(
      keyPhrases,
      coursesNames,
      0.6,
      1,
      1
    );

    let matchedCourses = new Set<Course>();

    for (const key in courseSearch) {
      matchedCourses.add(
        courses.find(
          (course: { courseName: string }) =>
            course.courseName.toLowerCase() ===
            courseSearch[key][0].pageContent.toLowerCase()
        )
      );
    }

    return { matchedCourses: Array.from(matchedCourses) };
  } catch (err) {
    console.error(err);
    return { matchedCourses: [] };
  }
};
