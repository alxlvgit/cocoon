"use client";

import {
  matchCoursesWithKeyPhrases,
  matchProgramsWithKeyPhrases,
} from "@/programs-data/programs-courses-finder";
import {
  setCourses,
  setPrograms,
} from "@/redux/features/resumeProcessingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";
import {
  calculateSkillsMatchPercentage,
  findRecommendedPath,
  findTheCheapestPath,
} from "@/app/path/college-path";
import { findUdemyCourses } from "@/app/path/online-path";
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
  const [pathData, setRecommendedPath] = useState("");
  const [cheapestPath, setCheapestPath] = useState("");
  const [onlineOnlyPath, setOnlineOnlyPath] = useState("");

  useEffect(() => {
    const findMatchedProgramsCourses = async () => {
      const [programsSearch, coursesSearch] = await Promise.all([
        matchProgramsWithKeyPhrases(missingCareerSkills),
        matchCoursesWithKeyPhrases(missingCareerSkills),
      ]);
      const { matchedCourses } = coursesSearch;
      const { matchedPrograms } = programsSearch;
      dispatch(setPrograms(matchedPrograms));
      dispatch(setCourses(matchedCourses));
      return { matchedCourses, matchedPrograms };
    };

    const formatPathResult = (pathData: any) => {
      const result = pathData.bcitProgram
        ? `${pathData.bcitProgram.programName} - BCIT Program`
        : pathData.bcitCourse
        ? `${pathData.bcitCourse.courseName} - BCIT Course`
        : `${pathData.udemyCourse.title} - Udemy Course`;
      return result;
    };

    const generatePaths = async () => {
      if (!missingCareerSkills || !pickedCareer || !requiredCareerSkills) {
        setLoading(false);
        return;
      }
      const skillsMatchedPercentage = calculateSkillsMatchPercentage(
        matchingCareerSkills,
        requiredCareerSkills
      );
      setSkillsMatch(skillsMatchedPercentage);

      const { matchedCourses, matchedPrograms } =
        await findMatchedProgramsCourses();

      const recommendedPath = await findRecommendedPath(
        skillsMatchedPercentage,
        pickedCareer,
        matchedPrograms,
        matchedCourses
      );
      const cheapestPath = await findTheCheapestPath(
        skillsMatchedPercentage,
        matchedPrograms,
        matchedCourses,
        pickedCareer
      );
      const udemyCoursesResult = await findUdemyCourses(pickedCareer!, 10);
      cheapestPath && setCheapestPath(formatPathResult(cheapestPath));
      recommendedPath && setRecommendedPath(formatPathResult(recommendedPath));
      udemyCoursesResult && setOnlineOnlyPath(udemyCoursesResult[0].title);
      setLoading(false);
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
        pathData &&
        cheapestPath &&
        onlineOnlyPath &&
        skillsMatch ? (
        <>
          <PathsSelection
            skillsMismatch={skillsMatch}
            positionTitle={pickedCareer || "N/A"}
            recommendedPath={pathData || "N/A"}
            cheapestPath={cheapestPath || "N/A"}
            onlineOnlyPath={onlineOnlyPath || "N/A"}
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
