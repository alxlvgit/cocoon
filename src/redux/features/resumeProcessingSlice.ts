import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ResumeProcessingState = {
  processing: boolean;
  processingStep: number | null;
  googleDocUrl: string | null;
  transferableSkills: string[];
  missingSkills: string[];
  pickedCareer: string | null;
  programs: any[];
  courses: any[];
};

const initialState: ResumeProcessingState = {
  processing: false,
  processingStep: null,
  googleDocUrl: null,
  transferableSkills: [],
  missingSkills: [],
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
      state.transferableSkills = action.payload;
    },
    setMissingSkills: (state, action: PayloadAction<string[]>) => {
      state.missingSkills = action.payload;
    },
    setPickedCareer: (state, action: PayloadAction<string | null>) => {
      state.pickedCareer = action.payload;
    },
    setPrograms: (state, action: PayloadAction<any[]>) => {
      state.programs = action.payload;
    },
    setCourses: (state, action: PayloadAction<any[]>) => {
      state.courses = action.payload;
    },
    resetResumeProcessingState: (state) => {
      state.processing = false;
      state.processingStep = null;
      state.googleDocUrl = null;
      state.transferableSkills = [];
      state.missingSkills = [];
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
  setPickedCareer,
  setPrograms,
  setCourses,
} = resumeProcessingSlice.actions;

export default resumeProcessingSlice.reducer;
