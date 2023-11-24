"use client";
import TopCareerSuggestions from "@/components/TopCareerSuggestions";
import SkillsProgress from "@/components/SkillsProgress";
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
