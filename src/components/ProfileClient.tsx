"use client";
import TopCareerSuggestions from "@/components/TopCareerSuggestions";
import SkillsProgress from "@/components/SkillsProgress";
import SavedCareers from "@/components/SavedCareers";
import CommitedCoursesPrograms from "./CommitedCoursesPrograms";
import { useState } from "react";

export default function ProfileClient({ user }: { user: any }) {
  const [currentPathCoursesAndPrograms, setCurrentPathCoursesAndPrograms] =
    useState<{ [x: string]: string[] } | undefined>({});
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 col-span-2">
        <SkillsProgress
          setCurrentPathCoursesAndPrograms={setCurrentPathCoursesAndPrograms}
        />
        <CommitedCoursesPrograms
          currentPathCoursesAndPrograms={currentPathCoursesAndPrograms}
        />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <TopCareerSuggestions />
        <SavedCareers />
      </div>
    </>
  );
}
