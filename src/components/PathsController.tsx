"use client";

import {
  RecommendedPathResult,
  findBestMatchProgram,
  matchCoursesWithKeyPhrases,
} from "@/app/(main-content)/analysis/path-search";
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
} from "@/app/(main-content)/analysis/path-search";
import { UdemyCourse } from "@/app/(main-content)/analysis/fetch-udemy";
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
        if (
          !missingCareerSkills ||
          !pickedCareer ||
          !requiredCareerSkills ||
          !matchingCareerSkills
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
          console.log(
            "Udemy courses data is missing. Please check redux store."
          );
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
          <div className="mx-auto mt-8 animate-spin rounded-full h-16 w-16 border-b-2 border-main-color dark:border-white"></div>
        </>
      ) : pickedCareer &&
        skillsMatch &&
        recommendedPathData &&
        udemyPathData &&
        missingCareerSkills &&
        matchingCareerSkills ? (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 w-full justify-center items-start">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <SkillsMatchInfo
                skillsMatched={skillsMatch}
                positionTitle={pickedCareer}
              />
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
            recommendedPath={recommendedPathData}
            udemyPath={udemyPathData}
          />
        </div>
      ) : (
        <AnalysisResultStatus errorMessage={errorMessage} />
      )}
    </>
  );
};

export default PathsController;
