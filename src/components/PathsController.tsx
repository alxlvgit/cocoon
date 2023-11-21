"use client";

import {
  RecommendedPathResult,
  findBestMatchProgram,
  matchCoursesWithKeyPhrases,
} from "@/app/path/college-path";
import { setCourses, setProgram } from "@/redux/features/resumeProcessingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";
import {
  calculateSkillsMatchPercentage,
  findRecommendedPath,
} from "@/app/path/college-path";
import { UdemyCourse, findUdemyCourses } from "@/app/path/online-path";
import PathsSelection from "./PathsSelection";

const PathsController = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const {
    missingCareerSkills,
    pickedCareer,
    requiredCareerSkills,
    matchingCareerSkills,
  } = useAppSelector((state) => state.resumeProcessingSlice);

  const [skillsMatch, setSkillsMatch] = useState<number | null>(null);
  const [recommendedPathData, setRecommendedPath] =
    useState<RecommendedPathResult>({});
  const [onlineOnlyPathData, setOnlineOnlyPath] = useState<UdemyCourse | null>(
    null
  );

  useEffect(() => {
    const generatePaths = async () => {
      try {
        if (!missingCareerSkills || !pickedCareer || !requiredCareerSkills) {
          setLoading(false);
          throw new Error("Error. Missing required data. Check Redux store");
        }
        const courses = await matchCoursesWithKeyPhrases(missingCareerSkills);
        const program = await findBestMatchProgram(
          pickedCareer,
          missingCareerSkills
        );
        if (!courses.success || !program.success) {
          setLoading(false);
          throw new Error("Error finding matching courses and programs");
        }
        // TODO: dispatch the courses with skills and courses objects separately
        // TODO: dispatch the program with skills and program objects separately
        dispatch(setCourses(courses.success));
        dispatch(setProgram(program.success));
        const skillsMatchedPercentage = calculateSkillsMatchPercentage(
          matchingCareerSkills,
          requiredCareerSkills
        );
        setSkillsMatch(skillsMatchedPercentage);
        const recommendedPath = await findRecommendedPath(
          skillsMatchedPercentage,
          pickedCareer,
          program.success.bestMatchProgramObject,
          courses.success
        );
        const udemyCoursesResult = await findUdemyCourses(pickedCareer!, 10);
        //TODO: dispatch both paths to the store
        recommendedPath && setRecommendedPath(recommendedPath);
        // TODO: include more courses in the online path
        udemyCoursesResult && setOnlineOnlyPath(udemyCoursesResult[0]);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    generatePaths();
  }, [
    missingCareerSkills,
    pickedCareer,
    requiredCareerSkills,
    matchingCareerSkills,
    dispatch,
  ]);

  return (
    <>
      {loading ? (
        <>
          <h1 className="place-self-center my-5">Loading your paths...</h1>
          <div className="mx-auto mt-8 animate-spin rounded-full h-32 w-32 border-b-2 border-blue-700 dark:border-white"></div>
        </>
      ) : pickedCareer &&
        recommendedPathData &&
        onlineOnlyPathData &&
        skillsMatch ? (
        <>
          <PathsSelection
            skillsMatched={skillsMatch!}
            positionTitle={pickedCareer || "N/A"}
            recommendedPathData={recommendedPathData}
            onlineOnlyPath={onlineOnlyPathData}
          />
        </>
      ) : (
        <>
          <h1 className="place-self-center my-5">
            Sorry, we don&apos;t have any paths for you.{" "}
          </h1>
          <h1 className="place-self-center my-5">
            Please proceed to the Careers page, pick a career, upload your
            resume and run the analysis.
          </h1>
        </>
      )}
    </>
  );
};

export default PathsController;
