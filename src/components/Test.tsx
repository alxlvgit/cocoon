"use client";

import { useAppSelector } from "@/redux/hooks";

function Test() {
  const { udemyCoursesWithSkills, coursesSkills, programSkills, currentPath } =
    useAppSelector((state) => state.pathSlice);
  console.log(programSkills);
  console.log(currentPath);
  console.log(udemyCoursesWithSkills)
  console.log(coursesSkills)
  return <div>TEST</div>;
}

export default Test;
