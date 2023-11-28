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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:col-span-2">
        <SkillsProgress
          setCurrentPathCoursesAndPrograms={setCurrentPathCoursesAndPrograms}
        />
        <CommitedCoursesPrograms
          currentPathCoursesAndPrograms={currentPathCoursesAndPrograms}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 h-fit items-start justify-start">
        <TopCareerSuggestions />
        <SavedCareers />
      </div>
    </>
  );
}
