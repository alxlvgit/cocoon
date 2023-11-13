import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PathState = {
  currentPath: string;
  completedSkills: string[];
};

type SkillStatus = {
  skill: string;
  status: string;
};

const initialState: PathState = {
  currentPath: "",
  completedSkills: [],
};

export const pathSlice = createSlice({
  name: "path",
  initialState,
  reducers: {
    setCurrentPath: (state, action: PayloadAction<string>) => {
      state.currentPath = action.payload;
    },
    setCompletedSkills: (state, action: PayloadAction<SkillStatus>) => {
      const { skill, status } = action.payload;
      switch (status) {
        case "Completed": {
          if (!state.completedSkills.includes(skill)) {
            state.completedSkills = [...state.completedSkills, skill];
          }
          break;
        }
        case "Start Soon": {
          if (state.completedSkills.includes(skill)) {
            state.completedSkills.splice(
              state.completedSkills.indexOf(skill),
              1
            );
          }
          break;
        }
        case "In Progress": {
          if (state.completedSkills.includes(skill)) {
            state.completedSkills.splice(
              state.completedSkills.indexOf(skill),
              1
            );
          }
          break;
        }
        default: {
          break;
        }
      }
    },
  },
});

export const { setCurrentPath, setCompletedSkills } = pathSlice.actions;

export default pathSlice.reducer;
