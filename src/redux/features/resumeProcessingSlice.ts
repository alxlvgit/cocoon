import { Course, Program } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ResumeProcessingState = {
  processing: boolean;
  processingStep: number | null;
  googleDocUrl: string | null;
  transferableResumeSkills: string[] | null;
  missingCareerSkills: string[] | null;
  requiredCareerSkills: string[] | null;
  matchingCareerSkills: string[] | null;
  pickedCareer: string | null;
};

const initialState: ResumeProcessingState = {
  processing: false,
  processingStep: null,
  googleDocUrl: null,
  transferableResumeSkills: null,
  missingCareerSkills: null,
  requiredCareerSkills: null,
  matchingCareerSkills: null,
  pickedCareer: null,
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

    resetResumeProcessingState: (state) => {
      state.processing = false;
      state.processingStep = null;
      state.googleDocUrl = null;
      state.transferableResumeSkills = [];
      state.missingCareerSkills = [];
      state.requiredCareerSkills = [];
      state.matchingCareerSkills = [];
      state.pickedCareer = null;
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
} = resumeProcessingSlice.actions;

export default resumeProcessingSlice.reducer;
