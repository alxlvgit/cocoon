"use client";
import Course from "@/components/Course";
import Program from "@/components/Program";
import { matchProgramsWithKeyPhrases } from "@/programs-data/program-finder";
import {
  setCourses,
  setPrograms,
} from "@/redux/features/resumeProcessingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";

export default function Career() {
  const [selectedButton, setSelectedButton] = useState("Programs");
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { missingSkills, programs, courses, pickedCareer } = useAppSelector(
    (state) => state.resumeProcessingSlice
  );

  const handleClick = (buttonText: string) => {
    setSelectedButton(buttonText);
  };

  useEffect(() => {
    const findProgramsCourses = async () => {
      const programsCourses = await matchProgramsWithKeyPhrases(missingSkills);
      const { retrievedPrograms, retrievedCourses } = programsCourses;
      console.log(retrievedPrograms, retrievedCourses);
      dispatch(setPrograms(retrievedPrograms));
      dispatch(setCourses(retrievedCourses));
      setLoading(false);
    };
    if (programs.length > 0 && courses.length > 0) {
      setLoading(false);
      return;
    }
    findProgramsCourses();
  }, [missingSkills, dispatch, programs.length, courses.length]);

  return (
    <div className="flex flex-col justify-center my-5 mx-10">
      <h1 className="m-5 text-center font-bold text-xl">
        Courses and Programs to help you fill your skill gaps
      </h1>
      <div>
        {pickedCareer ? (
          <p className="font-bold mb-6 text-sm  text-center">
            {" "}
            {pickedCareer} Path
          </p>
        ) : (
          <p className="font-bold mb-6 text-xs text-red-500  text-center">
            Please choose your preferred career on Careers page and run analysis
            first
          </p>
        )}
      </div>

      {loading ? (
        <>
          <h1 className="place-self-center my-5">Loading your paths...</h1>
          <div className="mx-auto mt-8 animate-spin rounded-full h-32 w-32 border-b-2 border-blue-700 dark:border-white"></div>
        </>
      ) : (
        <>
          <div className="flex flex-cols-2 m-5 justify-center">
            <button
              className={`mx-5 ${
                selectedButton === "Programs" ? "font-bold" : ""
              }`}
              onClick={() => handleClick("Programs")}
            >
              Programs
            </button>
            <button
              className={`mx-5 ${
                selectedButton === "Courses" ? "font-bold" : ""
              }`}
              onClick={() => handleClick("Courses")}
            >
              Courses
            </button>
          </div>

          <div className="flex flex-row justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              />
            </svg>
          </div>

          <div className="grid  sm:grid-cols-1 lg:grid-cols-2 ">
            {/* program cards */}
            {selectedButton === "Programs" &&
              programs.map((program, index) => (
                <Program key={index} programProps={program} />
              ))}
            {/* course cards */}
            {selectedButton === "Courses" &&
              courses.map((course, index) => (
                <Course key={index} courseProps={course} />
              ))}
          </div>
        </>
      )}
    </div>
  );
}
