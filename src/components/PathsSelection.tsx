"use client";
import { useState } from "react";
import PathContainer from "./PathContainer";
import { RecommendedPathResult } from "@/app/(main-content)/analysis/path-search";
import { UdemyCourse } from "@/app/(main-content)/analysis/fetch-udemy";

const PathsSelection = ({
  recommendedPath,
  udemyPath,
}: {
  recommendedPath: RecommendedPathResult;
  udemyPath: UdemyCourse[];
}) => {
  return (
    <>
      <div className="bg-main-bg h-full w-full rounded-2xl mx-auto p-8 flex flex-col items-center justify-between">
        <div className="w-full mb-16">
          <p className="text-lg font-bold mb-2">Recommended Path:</p>
          <PathContainer
            pathType="Recommended"
            recommendedPathData={recommendedPath}
          />
        </div>
        <div className="w-full">
          <p className="text-lg font-bold mb-2">Online-Only Path (Udemy):</p>
          <PathContainer pathType="Online-Only" udemyPathData={udemyPath} />
        </div>
      </div>
    </>
  );
};

export default PathsSelection;
