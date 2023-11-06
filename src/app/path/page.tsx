"use client";

import Path from "@/components/Path";
import {
  matchCoursesWithKeyPhrases,
  matchProgramsWithKeyPhrases,
} from "@/programs-data/program-finder";
import {
  setCourses,
  setPrograms,
} from "@/redux/features/resumeProcessingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";
import {
  calculateSkillsMatchPercentage,
  findRecommendedPath,
} from "./path-calculations";

export default function Career() {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const {
    missingCareerSkills,
    programs,
    courses,
    pickedCareer,
    requiredCareerSkills,
    transferableResumeSkills,
    matchingCareerSkills,
  } = useAppSelector((state) => state.resumeProcessingSlice);

  const [skillsMismatch, setSkillsMismatch] = useState(0);
  const [bestMatch, setBestMatch] = useState("");

  useEffect(() => {
    const calculatePathData = async () => {
      // TODO:
      // calculate the cheapest path from the programs and courses
      // find the  best match from udemy courses
      // refactor the code below
      const programsSearch = await matchProgramsWithKeyPhrases(
        missingCareerSkills
      );
      const coursesSearch = await matchCoursesWithKeyPhrases(
        missingCareerSkills
      );
      const { matchedCourses } = coursesSearch;
      const { matchedPrograms } = programsSearch;

      const bestMatch = await findRecommendedPath(
        50,
        pickedCareer!,
        Array.from(matchedPrograms),
        Array.from(matchedCourses)
      );
      dispatch(setPrograms(Array.from(matchedPrograms)));
      dispatch(setCourses(Array.from(matchedCourses)));
      const skillsMismatchCalculated = calculateSkillsMatchPercentage(
        matchingCareerSkills,
        requiredCareerSkills
      );
      setSkillsMismatch(skillsMismatchCalculated);
      setBestMatch(bestMatch.ProgramName);
      setLoading(false);
    };
    calculatePathData();
  }, [
    dispatch,
    pickedCareer,
    missingCareerSkills,
    requiredCareerSkills,
    transferableResumeSkills,
    matchingCareerSkills,
    skillsMismatch,
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
        <>
          <Path
            skillsMismatch={skillsMismatch || 60}
            positionTitle={pickedCareer || "UX Designer"}
            recommendedPath={bestMatch || "N/A"}
            cheapestPath="Graphic Design Process / BCIT Course"
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
      )}
    </div>
  );
}
