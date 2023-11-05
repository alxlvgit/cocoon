export const calculateSkillsMismatchPercentage = (
  missingSkills: string[],
  requiredSkills: string[]
) => {
  const missingSkillsCount = missingSkills.length;
  const requiredSkillsCount = requiredSkills.length;
  const percentage = Math.round(
    (missingSkillsCount / requiredSkillsCount) * 100
  );
  return percentage;
};
