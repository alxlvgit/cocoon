"use client";

import Path from "@/components/Path";
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

  useEffect(() => {
    // TODO: refactor this function
    const calculatePathData = async () => {
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
            : `${recommendedPath.bestMatchCourse.courseName} - BCIT Course`
        );
      } else {
        setRecommendedPath("N/A");
      }
      const cheapestPath = await findTheCheapestPath(
        skillsMatchedPercentage,
        matchedPrograms,
        matchedCourses
      );
      if (cheapestPath) {
        setCheapestPath(
          cheapestPath.cheapestProgram
            ? `${cheapestPath.cheapestProgram.programName} - BCIT Program`
            : `${cheapestPath.cheapestCourse.courseName} - BCIT Course`
        );
      } else {
        setCheapestPath("N/A");
      }
      setLoading(false);
    };
    calculatePathData();
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
        cheapestPath &&
        recommendedPath &&
        skillsMatch && (
          <>
            <Path
              skillsMismatch={skillsMatch}
              positionTitle={pickedCareer || "N/A"}
              recommendedPath={recommendedPath || "N/A"}
              cheapestPath={cheapestPath || "N/A"}
              onlineOnlyPath="Graphic Design Process / Udemy Course"
            />

            {/* The items below are temporary components. The data is hardcoded. Use for presentation only" /> */}
            {/* <Path
            skillsMismatch={30}
            positionTitle="Web Developers"
            recommendedPath="User Interface (UI) and User Experience (UX) Design/ BCIT Program"
            cheapestPath="Graphic Design Process / BCIT Course"
            onlineOnlyPath="Graphic Design Process / Udemy Course"
          />
          <Path
            skillsMismatch={50}
            positionTitle="Graphic Designers"
            recommendedPath="User Interface (UI) and User Experience (UX) Design/ BCIT Program"
            cheapestPath="Graphic Design Process / BCIT Course"
            onlineOnlyPath="Graphic Design Process / Udemy Course"
          /> */}
          </>
        )
      )}
    </div>
  );
}
