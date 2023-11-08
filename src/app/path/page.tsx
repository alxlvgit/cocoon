"use client";

import Pathes from "@/components/Pathes";
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
} from "./college-path";
import { findUdemyCourses } from "./online-path";

export default function Career() {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const {
    missingCareerSkills,
    pickedCareer,
    requiredCareerSkills,
    matchingCareerSkills,
  } = useAppSelector((state) => state.resumeProcessingSlice);

  const [skillsMatch, setSkillsMatch] = useState<number | null>(null);
  const [recommendedPath, setRecommendedPath] = useState("");
  const [cheapestPath, setCheapestPath] = useState("");
  const [onlineOnlyPath, setOnlineOnlyPath] = useState("");

  useEffect(() => {
    // TODO: refactor this function and search the udemy courses based on the missing skills (semantic search with missing skills in one string matching the udemy courses)
    const generatePaths = async () => {
      if (!missingCareerSkills || !pickedCareer || !requiredCareerSkills) {
        setLoading(false);
        return;
      }
      const programsSearch = await matchProgramsWithKeyPhrases(
        missingCareerSkills
      );
      const coursesSearch = await matchCoursesWithKeyPhrases(
        missingCareerSkills
      );
      const { matchedCourses } = coursesSearch;
      const { matchedPrograms } = programsSearch;
      dispatch(setPrograms(matchedPrograms));
      dispatch(setCourses(matchedCourses));
      const skillsMatchedPercentage = calculateSkillsMatchPercentage(
        matchingCareerSkills,
        requiredCareerSkills
      );
      setSkillsMatch(skillsMatchedPercentage);
      const recommendedPath = await findRecommendedPath(
        skillsMatchedPercentage,
        pickedCareer!,
        matchedPrograms,
        matchedCourses
      );
      if (recommendedPath) {
        setRecommendedPath(
          recommendedPath.bestMatchProgram
            ? `${recommendedPath.bestMatchProgram.programName} - BCIT Program`
            : recommendedPath.bestMatchCourse
            ? `${recommendedPath.bestMatchCourse.courseName} - BCIT Course`
            : `${recommendedPath.mostRelevantUdemyCourse.title} - Udemy Course`
        );
      }
      const cheapestPath = await findTheCheapestPath(
        skillsMatchedPercentage,
        matchedPrograms,
        matchedCourses,
        pickedCareer!
      );
      if (cheapestPath) {
        setCheapestPath(
          cheapestPath.cheapestProgram
            ? `${cheapestPath.cheapestProgram.programName} - BCIT Program`
            : cheapestPath.cheapestCourse
            ? `${cheapestPath.cheapestCourse.courseName} - BCIT Course`
            : `${cheapestPath.cheapestUdemyCourse.title} - Udemy Course`
        );
      }
      const udemyCoursesResult = await findUdemyCourses(pickedCareer!, 10);
      if (udemyCoursesResult) {
        setOnlineOnlyPath(`${udemyCoursesResult[0].title} - Udemy Course`);
      }
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
    <div className="flex flex-col justify-center my-5 mx-10">
      <h1 className="m-5 text-center font-bold text-xl mb-16">
        Sugggested Paths According to Your Resume Skills and Qualifications
      </h1>
      {loading ? (
        <>
          <h1 className="place-self-center my-5">Loading your paths...</h1>
          <div className="mx-auto mt-8 animate-spin rounded-full h-32 w-32 border-b-2 border-blue-700 dark:border-white"></div>
        </>
      ) : (
        pickedCareer &&
        recommendedPath &&
        cheapestPath &&
        onlineOnlyPath &&
        skillsMatch && (
          <>
            <Pathes
              skillsMismatch={skillsMatch}
              positionTitle={pickedCareer || "N/A"}
              recommendedPath={recommendedPath || "N/A"}
              cheapestPath={cheapestPath || "N/A"}
              onlineOnlyPath={onlineOnlyPath || "N/A"}
            />
          </>
        )
      )}
    </div>
  );
}
