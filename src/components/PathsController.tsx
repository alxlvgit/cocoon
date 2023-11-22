"use client";

import {
  RecommendedPathResult,
  findBestMatchProgram,
  matchCoursesWithKeyPhrases,
} from "@/app/path/path-search";
import {
  setCourses,
  setCoursesSkills,
  setProgram,
  setProgramSkills,
  setUdemyCourses,
  setUdemyCoursesWithSkills,
} from "@/redux/features/pathSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";
import {
  calculateSkillsMatchPercentage,
  findRecommendedPath,
  findUdemyPath,
} from "@/app/path/path-search";
import { UdemyCourse, searchUdemyCourses } from "@/app/path/fetch-udemy";
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
  const [udemyPathData, setOnlineOnlyPath] = useState<UdemyCourse[] | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const generatePaths = async () => {
      try {
        if (!missingCareerSkills || !pickedCareer || !requiredCareerSkills) {
          setLoading(false);
          setErrorMessage(
            "Please select a career and upload your resume to generate paths."
          );
          console.log("Data is missing. Please check redux store.");
          return;
        }
        const skillsMatchedPercentage = calculateSkillsMatchPercentage(
          matchingCareerSkills,
          requiredCareerSkills
        );
        setSkillsMatch(skillsMatchedPercentage);
        const matchedCoursesResult = await matchCoursesWithKeyPhrases(
          missingCareerSkills
        );
        const matchedProgramResult = await findBestMatchProgram(
          pickedCareer,
          missingCareerSkills
        );
        const { courses, coursesWithSkills } = matchedCoursesResult;
        const { program, programWithSkills } = matchedProgramResult;
        if (!courses || !coursesWithSkills || !program || !programWithSkills) {
          setLoading(false);
          setErrorMessage("Error generating paths. Please try again.");
          console.log(
            "Courses or program is missing. Please check redux store."
          );
          return;
        }
        dispatch(setCourses(matchedCoursesResult.courses));
        dispatch(setProgram(matchedProgramResult.program));
        dispatch(setCoursesSkills(matchedCoursesResult.coursesWithSkills));
        dispatch(setProgramSkills(matchedProgramResult.programWithSkills));
        const recommendedPath = await findRecommendedPath(
          skillsMatchedPercentage,
          pickedCareer,
          program,
          courses
        );
        recommendedPath && setRecommendedPath(recommendedPath);
        const udemyCoursesResult = await findUdemyPath(
          pickedCareer,
          missingCareerSkills
        );
        const { udemyCourses, udemyCoursesWithSkills } = udemyCoursesResult;
        if (!udemyCourses || !udemyCoursesWithSkills) {
          setLoading(false);
          setErrorMessage("Error generating paths. Please try again.");
          console.log("Udemy courses is missing. Please check redux store.");
          return;
        }
        setOnlineOnlyPath(udemyCoursesResult.udemyCourses);
        dispatch(setUdemyCoursesWithSkills(udemyCoursesWithSkills));
        dispatch(setUdemyCourses(udemyCourses));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setErrorMessage("Error generating paths. Please try again.");
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
        udemyPathData &&
        skillsMatch ? (
        <>
          <PathsSelection
            skillsMatched={skillsMatch}
            positionTitle={pickedCareer || "N/A"}
            recommendedPath={recommendedPathData}
            udemyPath={udemyPathData}
          />
        </>
      ) : (
        <>
          <h1 className="place-self-center my-5">
            Sorry, we don&apos;t have any paths for you.{" "}
          </h1>
          {errorMessage && (
            <h1 className="place-self-center my-5">{errorMessage}</h1>
          )}
        </>
      )}
    </>
  );
};

export default PathsController;
