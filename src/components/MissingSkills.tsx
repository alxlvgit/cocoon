"use client";

import { useAppSelector } from "@/redux/hooks";
import SkillsDropdown from "./SkillsDropdown";
import { index } from "drizzle-orm/pg-core";

function capitalizeSentences(sentences: string[]): string[] {
  return sentences.map((sentence) => {
    // Trim the sentence to remove leading and trailing spaces
    const trimmedSentence = sentence.trim();

    // Check if the sentence is not empty
    if (trimmedSentence.length > 0) {
      // Capitalize the first letter of the sentence and concatenate the rest
      return trimmedSentence.charAt(0).toUpperCase() + trimmedSentence.slice(1);
    }

    // If the sentence is empty, return it as is
    return trimmedSentence;
  });
}

const MissingSkills = () => {
  const { missingCareerSkills } = useAppSelector(
    (state) => state.resumeProcessingSlice
  );

  const { udemyCoursesWithSkills, coursesSkills, programSkills } =
    useAppSelector((state) => state.pathSlice);
  console.log(udemyCoursesWithSkills, "udemyCoursesWithSkills");
  console.log(coursesSkills, "coursesWithSkills");
  console.log(programSkills, "programWithSkills");

  return (
    <>
      <div className=" bg-blue-100 p-5 rounded-3xl md:row-span-2 	shadow-md grid grid-rows-3 items-center justify-center">
        <div>
          <p className="font-bold text-lg text-center">Missing Skills</p>
        </div>
        {capitalizeSentences(missingCareerSkills).map((skill) => (
          <div className="bg-blue-200 my-4 p-2 rounded-md" key={skill}>
            <p key={skill}>
              {skill} - <SkillsDropdown skill={skill} key={skill} />
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default MissingSkills;
