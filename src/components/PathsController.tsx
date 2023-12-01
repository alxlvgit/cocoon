"use client";

import {
  findBestMatchProgram,
  matchCoursesWithKeyPhrases,
} from "@/app/(main-content)/analysis/path-search";
import {
  setCourses,
  setRecommendedPath,
  setUdemyPath,
  setProgram,
  setUdemyCourses,
} from "@/redux/features/pathSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";
import {
  findRecommendedPath,
  findUdemyPath,
} from "@/app/(main-content)/analysis/path-search";
import PathsSelection from "./PathsSelection";
import SkillsContainer from "./SkillsContainer";
import SkillsMatchInfo from "./SkillsMatchInfo";
import AnalysisResultStatus from "./AnalysisResultStatus";

const PathsController = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const {
    missingCareerSkills,
    pickedCareer,
    requiredCareerSkills,
    matchingCareerSkills,
    initialMatchingCareerSkills,
    initialMissingCareerSkills,
    skillsMatchedPercentage,
  } = useAppSelector((state) => state.resumeProcessingSlice);

  const { recommendedPath, udemyPath, currentPath } = useAppSelector(
    (state) => state.pathSlice
  );

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const generatePaths = async () => {
      try {
        if (
          !missingCareerSkills ||
          !pickedCareer ||
          !requiredCareerSkills ||
          !initialMatchingCareerSkills ||
          !initialMissingCareerSkills ||
          !matchingCareerSkills ||
          skillsMatchedPercentage === null
        ) {
          setLoading(false);
          setErrorMessage(
            "Please select a career and upload your resume to generate paths."
          );
          console.log(
            "Data is missing. Please check missingSkills, pickedCareer, requiredCareerSkills, matchingCareerSkills in Redux Store."
          );
          return;
        }
        if (recommendedPath && udemyPath) {
          setLoading(false);
          setErrorMessage(null);
          return;
        }
        const matchedCoursesResult = await matchCoursesWithKeyPhrases(
          initialMissingCareerSkills
        );
        const matchedProgramResult = await findBestMatchProgram(
          pickedCareer,
          initialMissingCareerSkills
        );
        const { courses, coursesWithSkills } = matchedCoursesResult;
        const { program, programWithSkills } = matchedProgramResult;
        if (courses && program && coursesWithSkills && programWithSkills) {
          dispatch(setCourses(matchedCoursesResult.courses));
          dispatch(setProgram(matchedProgramResult.program));
        }
        const recommendedPathData = await findRecommendedPath(
          skillsMatchedPercentage!,
          pickedCareer,
          initialMissingCareerSkills,
          programWithSkills,
          coursesWithSkills
        );
        if (recommendedPathData) {
          dispatch(setRecommendedPath(recommendedPathData));
        }
        const udemyCoursesResult = await findUdemyPath(
          pickedCareer,
          initialMissingCareerSkills
        );
        const { udemyCourses, udemyCoursesWithSkills } = udemyCoursesResult;
        if (!udemyCourses || !udemyCoursesWithSkills || !recommendedPathData) {
          setLoading(false);
          setErrorMessage(
            `Could not find suitable paths for this career. Your skills match with this career is ${skillsMatchedPercentage}%.`
          );
          console.log(
            "Udemy courses data is missing. Please check redux store."
          );
          return;
        }
        dispatch(setUdemyPath(udemyCoursesResult.udemyCoursesWithSkills));
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
    initialMissingCareerSkills,
    initialMatchingCareerSkills,
    matchingCareerSkills,
    skillsMatchedPercentage,
    recommendedPath,
    udemyPath,
    currentPath,
    dispatch,
  ]);

  return (
    <>
      {loading ? (
        <>
          <h1 className="place-self-center my-5">Loading your paths...</h1>
          <div className="mx-auto mt-8 animate-spin rounded-full h-16 w-16 border-b-2 border-main-color dark:border-white"></div>
        </>
      ) : pickedCareer &&
        skillsMatchedPercentage !== null &&
        recommendedPath &&
        udemyPath &&
        missingCareerSkills &&
        !errorMessage &&
        matchingCareerSkills ? (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 w-full justify-center items-start">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <SkillsMatchInfo positionTitle={pickedCareer} />
            </div>
            <SkillsContainer
              skills={matchingCareerSkills}
              skillsType="Skills Already Acquired"
            />
            <SkillsContainer
              skills={missingCareerSkills}
              skillsType="Skills Required"
            />
          </div>
          <PathsSelection
            recommendedPath={recommendedPath}
            udemyPath={udemyPath}
          />
        </div>
      ) : (
        <AnalysisResultStatus errorMessage={errorMessage} />
      )}
    </>
  );
};

export default PathsController;
