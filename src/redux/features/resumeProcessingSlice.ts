import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ResumeProcessingState = {
  processing: boolean;
  processingStep: number | null;
  googleDocUrl: string | null;
  transferableSkills: string[];
  missingSkills: string[];
  programs: any[];
  courses: any[];
};

const initialState: ResumeProcessingState = {
  processing: false,
  processingStep: null,
  googleDocUrl: null,
  transferableSkills: [],
  missingSkills: [],
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
    setPrograms: (state, action: PayloadAction<any[]>) => {
      state.programs = action.payload;
    },
    setCourses: (state, action: PayloadAction<any[]>) => {
      state.courses = action.payload;
    },
    resetResumeProcessingState: (state) => {
      state = initialState;
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
  setPrograms,
  setCourses,
} = resumeProcessingSlice.actions;

export default resumeProcessingSlice.reducer;
