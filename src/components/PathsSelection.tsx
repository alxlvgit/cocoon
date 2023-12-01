"use client";

import { RecommendedPath, UdemyPath } from "@/redux/features/pathSlice";
import PathContainer from "./PathContainer";

const PathsSelection = ({
  recommendedPath,
  udemyPath,
}: {
  recommendedPath: RecommendedPath;
  udemyPath: UdemyPath;
}) => {
  return (
    <>
      <div className="bg-main-bg h-full w-full rounded-2xl mx-auto pt-8 pb-4 pl-8 pr-8 flex flex-col items-center justify-between">
        <div className="w-full mb-4">
          <p className="text-lg font-bold mb-2">Recommended Path:</p>
          <PathContainer pathType="recommended" pathData={recommendedPath} />
        </div>
        <div className="w-full">
          <p className="text-lg font-bold mb-2">Online-Only Path (Udemy):</p>
          <PathContainer pathType="online-only" pathData={udemyPath} />
        </div>
      </div>
    </>
  );
};

export default PathsSelection;
