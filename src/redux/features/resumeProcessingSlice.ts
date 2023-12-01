import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PathSkill } from "./pathSlice";

type ResumeProcessingState = {
  processing: boolean;
  processingStep: number | null;
  googleDocUrl: string | null;
  transferableResumeSkills: string[] | null;
  missingCareerSkills: string[] | null;
  requiredCareerSkills: string[] | null;
  matchingCareerSkills: string[] | null;
  initialMissingCareerSkills: string[] | null;
  initialMatchingCareerSkills: string[] | null;
  pickedCareer: string | null;
  skillsMatchedPercentage: number | null;
};

const initialState: ResumeProcessingState = {
  processing: false,
  processingStep: null,
  googleDocUrl: null,
  transferableResumeSkills: null,
  missingCareerSkills: null,
  requiredCareerSkills: null,
  matchingCareerSkills: null,
  initialMissingCareerSkills: null,
  initialMatchingCareerSkills: null,
  pickedCareer: null,
  skillsMatchedPercentage: null,
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
      state.initialMissingCareerSkills = action.payload;
    },
    resetToInitialMissingSkills: (state) => {
      state.missingCareerSkills = state.initialMissingCareerSkills;
    },
    resetToInitialMatchingSkills: (state) => {
      state.matchingCareerSkills = state.initialMatchingCareerSkills;
    },
    setSkillsMatchedPercentage: (state) => {
      if (!state.matchingCareerSkills || !state.requiredCareerSkills) {
        return;
      }
      const matchingSkillsCount = state.matchingCareerSkills?.length;
      const requiredSkillsCount = state.requiredCareerSkills?.length;
      if (matchingSkillsCount && requiredSkillsCount) {
        state.skillsMatchedPercentage = Math.round(
          (matchingSkillsCount / requiredSkillsCount) * 100
        );
      }
    },
    updateMissingSkills: (
      state,
      action: PayloadAction<{
        skills: PathSkill[];
      }>
    ) => {
      const { skills } = action.payload;
      if (!state.missingCareerSkills || !state.matchingCareerSkills) {
        return;
      }
      const missingSkills = [...state.missingCareerSkills];
      const matchingCareerSkills = [...state.matchingCareerSkills];

      skills.forEach((skillData) => {
        if (!missingSkills.includes(skillData.skill) && !skillData.acquired) {
          missingSkills.push(skillData.skill);
        } else if (
          missingSkills.includes(skillData.skill) &&
          skillData.acquired
        ) {
          const index = missingSkills.indexOf(skillData.skill);
          missingSkills.splice(index, 1);
        }
        if (
          !matchingCareerSkills.includes(skillData.skill) &&
          skillData.acquired
        ) {
          matchingCareerSkills.push(skillData.skill);
        } else if (
          matchingCareerSkills.includes(skillData.skill) &&
          !skillData.acquired
        ) {
          const index = matchingCareerSkills.indexOf(skillData.skill);
          matchingCareerSkills.splice(index, 1);
        }
      });

      return {
        ...state,
        missingCareerSkills: missingSkills,
        matchingCareerSkills: matchingCareerSkills,
      };
    },
    setRequiredSkills: (state, action: PayloadAction<string[]>) => {
      state.requiredCareerSkills = action.payload;
    },
    setMatchingSkills: (state, action: PayloadAction<string[]>) => {
      state.matchingCareerSkills = action.payload;
      state.initialMatchingCareerSkills = action.payload;
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
      state.initialMissingCareerSkills = [];
      state.initialMatchingCareerSkills = [];
      state.skillsMatchedPercentage = null;
    },
  },
});

export const {
  setProcessing,
  setProcessingStep,
  setGoogleDocUrl,
  setTransferableSkills,
  setMissingSkills,
  updateMissingSkills,
  resetToInitialMissingSkills,
  resetToInitialMatchingSkills,
  resetResumeProcessingState,
  setRequiredSkills,
  setMatchingSkills,
  setPickedCareer,
  setSkillsMatchedPercentage,
} = resumeProcessingSlice.actions;

export default resumeProcessingSlice.reducer;
