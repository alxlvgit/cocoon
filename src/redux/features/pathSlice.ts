import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { Course, Program } from "@/types/types";
import { UdemyCourse } from "@/app/(main-content)/analysis/fetch-udemy";

export type PathSkill = {
  skill: string;
  acquired: boolean;
};

export type ProgramWithSkills = {
  skills: PathSkill[];
  program: Program;
};

export type CourseWithSkills = {
  skills: PathSkill[];
  course: Course;
};

export type UdemyCourseWithSkills = {
  skills: PathSkill[];
  course: UdemyCourse;
};

export type RecommendedPath = {
  bcitProgram?: { [key: string]: ProgramWithSkills };
  bcitCourses?: { [key: string]: CourseWithSkills };
  udemyCourses?: { [key: string]: UdemyCourseWithSkills };
};

export type UdemyPath = {
  [key: string]: UdemyCourseWithSkills;
};

type PathState = {
  currentPath: string;
  program: Program | undefined;
  courses: Course[] | undefined;
  udemyCourses: UdemyCourse[] | undefined;
  recommendedPath: RecommendedPath | undefined;
  udemyPath: UdemyPath | undefined;
  completedCoursesPrograms: { [title: string]: boolean };
};

const initialState: PathState = {
  currentPath: "",
  program: undefined,
  recommendedPath: undefined,
  udemyPath: undefined,
  courses: undefined,
  udemyCourses: undefined,
  completedCoursesPrograms: {},
};

export const pathSlice = createSlice({
  name: "path",
  initialState,
  reducers: {
    setCurrentPath: (state, action: PayloadAction<string>) => {
      state.currentPath = action.payload;
    },
    setProgram: (state, action: PayloadAction<Program>) => {
      state.program = action.payload;
    },
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
    setUdemyCourses: (state, action: PayloadAction<UdemyCourse[]>) => {
      state.udemyCourses = action.payload;
    },
    setRecommendedPath: (state, action: PayloadAction<RecommendedPath>) => {
      state.recommendedPath = action.payload;
    },
    setUdemyPath: (state, action: PayloadAction<UdemyPath>) => {
      state.udemyPath = action.payload;
    },
    updateRecommendedPath: (
      state,
      action: PayloadAction<{
        skill: string;
        acquired: boolean;
        title: string;
      }>
    ) => {
      const { skill, acquired, title } = action.payload;

      const typeOfRecommendedPath = state.recommendedPath
        ? state.recommendedPath.bcitProgram
          ? "bcitProgram"
          : state.recommendedPath.bcitCourses
          ? "bcitCourses"
          : "udemyCourses"
        : "";

      if (typeOfRecommendedPath) {
        const pathToUpdate = state.recommendedPath![typeOfRecommendedPath];
        const itemToUpdate = pathToUpdate?.[title];

        if (itemToUpdate) {
          const updatedSkills = itemToUpdate.skills.map((s) => {
            if (s.skill === skill) {
              return {
                ...s,
                acquired: !acquired,
              };
            }
            return s;
          });

          const updatedRecommendedPath = {
            ...state.recommendedPath,
            [typeOfRecommendedPath]: {
              ...pathToUpdate,
              [title]: {
                ...itemToUpdate,
                skills: updatedSkills,
              },
            },
          };

          return {
            ...state,
            recommendedPath: updatedRecommendedPath,
          };
        }
      }

      return state;
    },
    updateUdemyPath: (
      state,
      action: PayloadAction<{
        skill: string;
        acquired: boolean;
        title: string;
      }>
    ) => {
      const { skill, acquired, title } = action.payload;

      const pathToUpdate = state.udemyPath![title];
      const itemToUpdate = pathToUpdate;

      if (itemToUpdate) {
        const updatedSkills = itemToUpdate.skills.map((s) => {
          if (s.skill === skill) {
            return {
              ...s,
              acquired: !acquired,
            };
          }
          return s;
        });

        const updatedUdemyPath = {
          ...state.udemyPath,
          [title]: {
            ...itemToUpdate,
            skills: updatedSkills,
          },
        };

        return {
          ...state,
          udemyPath: updatedUdemyPath,
        };
      }

      return state;
    },
    checkIfAllSkillsAcquired: (
      state,
      action: PayloadAction<{
        skills: PathSkill[];
        title: string;
      }>
    ) => {
      const { skills, title } = action.payload;

      const allSkillsAcquired = skills.every((skill) => skill.acquired);

      const updatedCompletedCoursesPrograms = {
        ...state.completedCoursesPrograms,
        [title]: allSkillsAcquired,
      };

      return {
        ...state,
        completedCoursesPrograms: updatedCompletedCoursesPrograms,
      };
    },
    resetCompletedCoursesPrograms: (state) => {
      return {
        ...state,
        completedCoursesPrograms: {},
      };
    },
    resetPathsState: () => initialState,
  },
});

export const {
  setCurrentPath,
  updateRecommendedPath,
  updateUdemyPath,
  setProgram,
  setCourses,
  setUdemyCourses,
  setRecommendedPath,
  setUdemyPath,
  resetPathsState,
  checkIfAllSkillsAcquired,
  resetCompletedCoursesPrograms,
} = pathSlice.actions;

export default pathSlice.reducer;
