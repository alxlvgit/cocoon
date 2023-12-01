"use client";
import TopCareerSuggestions from "@/components/TopCareerSuggestions";
import SkillsProgress from "@/components/SkillsProgress";
import SavedCareers from "@/components/SavedCareers";
import CommitedCoursesPrograms from "./CommitedCoursesPrograms";

export default function ProfileClient({ user }: { user: any }) {
  return (
    <>
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:col-span-2">
          <SkillsProgress />
          <CommitedCoursesPrograms />
        </div>
        <div className="grid grid-cols-1 gap-4 h-fit items-start justify-start">
          <TopCareerSuggestions />
          <SavedCareers />
        </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:col-span-2 h-full">
        <div className="col-span-1">
          <SkillsProgress />
        </div>
        <div className="col-span-1">
          <TopCareerSuggestions />
        </div>
        <div className="col-span-1">
          <CommitedCoursesPrograms />
        </div>
        <div className="col-span-1">
          <SavedCareers />
        </div>
      </div>

      

    </>
  );
}
