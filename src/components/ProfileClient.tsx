"use client";
import TopCareerSuggestions from "@/components/TopCareerSuggestions";
import SkillsProgress from "@/components/SkillsProgress";
import MatchedSkills from "@/components/MatchedSkills";
import SkillsContainer from "@/components/SkillsContainer";
import SavedCareers from "@/components/SavedCareers";

export default function ProfileClient({ user }: { user: any }) {
  return (
    <>
      <SkillsProgress />
      <TopCareerSuggestions />
      <SavedCareers />
    </>
  );
}
