"use client";
import TopCareerSuggestions from "@/components/TopCareerSuggestions";
import SkillsProgress from "@/components/SkillsProgress";
import SavedCareers from "@/components/SavedCareers";
import CommitedCoursesPrograms from "./CommitedCoursesPrograms";

export default function ProfileClient({ user }: { user: any }) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 col-span-2">
        <SkillsProgress />
        <CommitedCoursesPrograms />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <TopCareerSuggestions />
        <SavedCareers />
      </div>
    </>
  );
}
