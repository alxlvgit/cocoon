"use client";

import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import Link from "next/link";



const SkillsProgress = () => {
  const completedSkills = useAppSelector(
    (state) => state.pathSlice.completedSkills
  );
  const [completedPercentage, setCompletedPercentage] = useState(0);
  const { missingCareerSkills, courses, pickedCareer } = useAppSelector(
    (state) => state.resumeProcessingSlice
  );
  const currentPath = useAppSelector((state) => state.pathSlice.currentPath);

  useEffect(() => {
    const completedPercentage = Math.trunc(
      (completedSkills.length / missingCareerSkills.length) * 100
    );
    setCompletedPercentage(completedPercentage);
  }, [completedSkills, missingCareerSkills, courses, pickedCareer]);

  return (
    <>
      {missingCareerSkills.length > 0 ? (
                <div className=" bg-blue-100 p-5 rounded-3xl md:col-span-2 shadow-md grid items-center justify-center">
                    <div className="p-5 grid items-center">
                        <p className="font-extrabold text-xl text-center pb-10">
                            Career Path: <span>{pickedCareer}</span>
                        </p>

                        <p className="font-extrabold pb-3">
                            Current Lesson: <span> {currentPath} </span>
                        </p>
                        <div className="bg-white flex flex-col items-center justify-center h-32 rounded-xl">
                            <p className="text-gray-500">Your progress</p>
                            <p className="text-xl font-extrabold text-blue-500 pb-3">
                                {completedPercentage}% completed
                            </p>
                            <ProgressBar
                                completed={completedPercentage}
                                maxCompleted={100}
                                bgColor="#2E85B2"
                                animateOnRender={true}
                                className="w-4/5"
                            />
                        </div>
                        {courses.map((course) => (
                            <div className="bg-gray-300 my-4 p-2 rounded-md" key={course.courseCode}>
                                <p>{course.courseName}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className=" bg-blue-100 p-5 rounded-3xl md:col-span-2 shadow-md grid grid-rows-3 items-center justify-center">
                    <p className="text-sm md:text-base font-bold">
                        No path has been selected, upload your resume to start !
                    </p>
                    <div className="pb-8 justify-center items-center pt-6 flex row-span-2">
                        <Link
                            href="/careers"
                            className="relative inline-flex items-center justify-center p-4 px-3 md:px-6 py-2 md:py-3 overflow-hidden font-medium transition duration-300 ease-out border-2 rounded-full shadow-md group border-gray-500"
                        >
                            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-black duration-300 -translate-x-full bg-356CBE group-hover:translate-x-0 ease">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    ></path>
                                </svg>
                            </span>
                            <span className="text-xs md:text-base absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease ">
                                Start Now
                            </span>
                            <span className="text-sm  md:text-base relative invisible">
                                Start Now
                            </span>
                        </Link>
                    </div>
                </div>
          )
    }
  </>
)}

export default SkillsProgress;
