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
  completedSkills: string[];
  program: Program | undefined;
  courses: Course[] | undefined;
  udemyCourses: UdemyCourse[] | undefined;
  recommendedPath: RecommendedPath | undefined;
  udemyPath: UdemyPath | undefined;
};

type SkillStatus = {
  skill: string;
  status: string;
};

const initialState: PathState = {
  currentPath: "",
  completedSkills: [],
  program: undefined,
  recommendedPath: undefined,
  udemyPath: undefined,
  courses: undefined,
  udemyCourses: undefined,
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

        console.log(current(pathToUpdate));

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
    resetState: (state) => {
      state.currentPath = "";
      state.completedSkills = [];
      state.program = undefined;
      state.courses = undefined;
      state.udemyCourses = undefined;
      state.recommendedPath = undefined;
      state.udemyPath = undefined;
    },
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
  resetState,
} = pathSlice.actions;

export default pathSlice.reducer;
