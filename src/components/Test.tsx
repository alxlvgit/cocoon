"use client";

import { useAppSelector } from "@/redux/hooks";
import { calculateSkillsMatchPercentage } from "@/app/(main-content)/analysis/path-search";

function Test() {
  const { udemyCoursesWithSkills, coursesSkills, programSkills, currentPath } =
    useAppSelector((state) => state.pathSlice);
  const {
    missingCareerSkills,
    pickedCareer,
    requiredCareerSkills,
    matchingCareerSkills,
  } = useAppSelector((state) => state.resumeProcessingSlice);

  if (matchingCareerSkills && requiredCareerSkills) {
    const skillsMatchedPercentage = calculateSkillsMatchPercentage(
      matchingCareerSkills,
      requiredCareerSkills
    );
    // console.log("this is what i neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeed");
    // console.log(skillsMatchedPercentage);
    // console.log("this is what i neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeed");
  }

  //   console.log(programSkills);
  //   console.log(missingCareerSkills);
  //   console.log(pickedCareer);
  //   console.log(requiredCareerSkills);
  //   console.log(matchingCareerSkills);
  //   console.log(currentPath);
  //   console.log(udemyCoursesWithSkills);
  //   console.log(coursesSkills);
  return <div>TEST</div>;
}

export default Test;
