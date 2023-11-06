import { Course, Program } from "@/programs-data/program-finder";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ResumeProcessingState = {
  processing: boolean;
  processingStep: number | null;
  googleDocUrl: string | null;
  transferableResumeSkills: string[];
  missingCareerSkills: string[];
  requiredCareerSkills: string[];
  matchingCareerSkills: string[];
  pickedCareer: string | null;
  programs: Program[];
  courses: Course[];
};

const initialState: ResumeProcessingState = {
  processing: false,
  processingStep: null,
  googleDocUrl: null,
  transferableResumeSkills: [],
  missingCareerSkills: [],
  requiredCareerSkills: [],
  matchingCareerSkills: [],
  pickedCareer: null,
  programs: [],
  courses: [],
};

export const resumeProcessingSlice = createSlice({
  name: "resumeProcessing",
  initialState,
  reducers: {
    setProcessing: (state, action: PayloadAction<boolean>) => {
      state.processing = action.payload;
    },
    setProcessingStep: (state, action: PayloadAction<number | null>) => {
      state.processingStep = action.payload;
    },
    setGoogleDocUrl: (state, action: PayloadAction<string | null>) => {
      state.googleDocUrl = action.payload;
    },
    setTransferableSkills: (state, action: PayloadAction<string[]>) => {
      state.transferableResumeSkills = action.payload;
    },
    setMissingSkills: (state, action: PayloadAction<string[]>) => {
      state.missingCareerSkills = action.payload;
    },
    setRequiredSkills: (state, action: PayloadAction<string[]>) => {
      state.requiredCareerSkills = action.payload;
    },
    setMatchingSkills: (state, action: PayloadAction<string[]>) => {
      state.matchingCareerSkills = action.payload;
    },

    setPickedCareer: (state, action: PayloadAction<string | null>) => {
      state.pickedCareer = action.payload;
    },
    setPrograms: (state, action: PayloadAction<Program[]>) => {
      state.programs = action.payload;
    },
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
    resetResumeProcessingState: (state) => {
      state.processing = false;
      state.processingStep = null;
      state.googleDocUrl = null;
      state.transferableResumeSkills = [];
      state.missingCareerSkills = [];
      state.requiredCareerSkills = [];
      state.matchingCareerSkills = [];
      state.pickedCareer = null;
      state.programs = [];
      state.courses = [];
    },
  },
});

export const {
  setProcessing,
  setProcessingStep,
  setGoogleDocUrl,
  setTransferableSkills,
  setMissingSkills,
  resetResumeProcessingState,
  setRequiredSkills,
  setMatchingSkills,
  setPickedCareer,
  setPrograms,
  setCourses,
} = resumeProcessingSlice.actions;

export default resumeProcessingSlice.reducer;
