//@ts-nocheck

"use client";
import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useState, useEffect } from "react";
import {
  setCourses,
  setPrograms,
} from "@/redux/features/resumeProcessingSlice";
import { stat } from "fs";
import { set, string } from "zod";
import Image from "next/image";
import Link from "next/link";

/*

NOTES FROM SELINA TO XIAO 👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽

Data we need for this page: Missing skills, Matched skills, Number Completed Courses, Learning Hours, Top career suggestions, Saved Careers.

If don't have these data, I think alex and you (BE devs) should talk to the designers or 
at minimum, let's discuss what we have, and what we are going to show on this page....! 


*/

const completedSkillsForTest: string[] = [];

interface SkillDropdownProps {
  skill: string;
  onChange: (skill: string, status: string) => void;
}

const SkillDropdown: React.FC<SkillDropdownProps> = ({ skill, onChange }) => {
  const [status, setStatus] = useState("Start Soon");

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    onChange(skill, e.target.value);
  };

  return (
    <select value={status} onChange={handleStatusChange} className="ml-2">
      <option value="Start Soon">Start Soon</option>
      <option value="In Progress">In Progress</option>
      <option value="Completed">Completed</option>
    </select>
  );
};

export default function Profile() {
  //Once set up the database for the user, query the user data and saved path from the database.
  //For now, I used the fake(hard-coded) data for this page (selina)
  //userData passing in as props here can be the user id(?)
  const userData = {
    user: {
      username: "Jonathan",
      avatar:
        "https://velog.velcdn.com/images/jangseoyoung98/post/c4e9bc8f-207e-4d68-aaeb-8711a10a2de9/image.png",
      savedPath: "1",
    },
    savedPathDetail: {
      id: 1,
      field: "Web & Digital Interface Designers",
      fieldId: "15-1255.00",
      specificPath: "Cheapest Path",
      title: "Photoshop for Web Publishing - BCIT Course",
    },
  };

  // const completedSkillsForTest: string[] = [];

  // Use this to get the current path
  const currentPath = useAppSelector((state) => state.pathSlice.currentPath);

  const [loading, setLoading] = useState(true);
  const [completedPercentage, setCompletedPercentage] = useState(0);
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

  const [skillStatus, setSkillStatus] = useState<Record<string, string>>(
    missingCareerSkills.reduce((acc, skill) => {
      acc[skill] = "Start Soon";
      return acc;
    }, {} as Record<string, string>)
  );

  const handleStatusChange = (skill: string, status: string) => {
    setSkillStatus((prevStatus) => ({
      ...prevStatus,
      [skill]: status,
    }));
    if (!completedSkillsForTest.includes(skill)) {
      console.log("push");
      status === "Completed" ? completedSkillsForTest.push(skill) : null;
    } else {
      console.log("splice");
      status === "Start Soon"
        ? completedSkillsForTest.splice(
            completedSkillsForTest.indexOf(skill),
            1
          )
        : null;
      status === "In Progress"
        ? completedSkillsForTest.splice(
            completedSkillsForTest.indexOf(skill),
            1
          )
        : null;
    }
    let completedPercentage = Math.trunc(
      (completedSkillsForTest.length / missingCareerSkills.length) * 100
    );
    setCompletedPercentage(completedPercentage);
    console.log("completedSkillsForTest: ", completedSkillsForTest);
  };

  console.log("missingCareerSkills: ", missingCareerSkills);

  const premissingskills = [
    "design digital user interfaces or websites",
    "ensure compatibility and usability across browsers or devices",
    "use web framework applications",
    "analyze web use metrics",
    "optimize websites for marketability and search engine ranking",
    "design and test interfaces for human-computer interaction",
    "maximize the usability of digital devices, websites, and software",
    "create graphics used in websites",
    "collaborate with management or users to develop e-…and to integrate these strategies with web sites.",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 justify-center w-3/4 m-auto my-5 ">
      <div className="md:col-span-2">
        <h1 className="font-bold text-xl">Welcome,</h1>
        <p className="text-lg text-gray-500">{userData.user.username}</p>
      </div>
      {premissingskills.length > 0 ? (
        <div className=" bg-blue-100 p-5 rounded-3xl md:col-span-2 shadow-md grid items-center justify-center">
          <div className="p-5 grid items-center">
            <p className="font-extrabold text-xl text-center pb-10">
              Career Path: <span>UX/UI Design</span>
            </p>

            <p className="font-extrabold pb-3">
              Current Lesson: <span> React - Native </span>
            </p>
            <div className="bg-white flex flex-col items-center justify-center h-32 rounded-xl">
              <p className="text-gray-500">Your progress</p>
              <p className="text-xl font-extrabold text-blue-500 pb-3">
                {completedPercentage}% to complete
              </p>
              <ProgressBar
                completed={completedPercentage}
                maxCompleted={100}
                bgColor="#2E85B2"
                animateOnRender={true}
                className="w-4/5"
              />
            </div>

            <div className="w-full">
              <ul className="my-6">
                {premissingskills.map((skill) => (
                  <li key={skill}>
                    {skill} -{" "}
                    <SkillDropdown
                      skill={skill}
                      onChange={handleStatusChange}
                    />
                  </li>
                ))}
              </ul>
            </div>
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
      )}

      <div className=" bg-blue-100 p-5 rounded-3xl	shadow-md grid grid-rows-3 items-center justify-center">
        <div>
          <p className="font-bold text-lg text-center">Skills</p>
        </div>
        <div className="row-span-2">
          <p className="text-base">Nothing to display</p>
        </div>
      </div>

      <div className=" bg-blue-100 p-5 rounded-3xl	shadow-md grid grid-rows-3 items-center justify-center">
        <div>
          <p className="font-bold text-lg text-center">Missing Skills</p>
        </div>
        <div className="row-span-2">
          <p className="text-base">Nothing to display</p>
        </div>
      </div>

      <div className=" bg-blue-100 p-5 rounded-3xl	shadow-md grid grid-rows-3 items-center justify-center">
        <div>
          <p className="font-bold text-lg text-center">Statistics</p>
        </div>
        <div className="row-span-2">
          <p className="text-base">Nothing to display</p>
        </div>
      </div>

      <div className=" bg-blue-100 p-5 rounded-3xl md:row-span-2 	shadow-md grid grid-rows-3 items-center justify-center">
        <div>
          <p className="font-bold text-lg text-center">
            Top career suggestions
          </p>
        </div>
        <div className="row-span-2">
          <p className="text-base text-center">Nothing to display</p>
        </div>
      </div>
      <div className=" bg-blue-100 p-5 rounded-3xl	shadow-md grid grid-rows-3 items-center justify-center">
        <div>
          <p className="font-bold text-lg text-center">Saved Careers</p>
        </div>
        <div className="row-span-2">
          <p className="text-base">Nothing to display</p>
        </div>
      </div>
    </div>

    // <div className="pt-2 pb-10 grid grid-cols-3 gap-4 place-items-start ">
    //   <p className="pt-2 text-md justify-center items-center font-bold text-black">
    //     Make your next step with us!
    //   </p>
    //   <p className="text-xl items-center justify-center font-bold text-black">
    //     {userData.user.username}
    //   </p>
    // </div>
    // <div className="w-4/5 mx-auto space-y-4">
    //   <div className=" p-4 justify-center items-center align-middle rounded-2xl shadow-xl  from-indigo-300 cursor-pointer bg-indigo-400/50 border-0 text-black">
    //     <div className="bg-indigo-100 h-full w-full rounded-lg mx-auto p-4 text-center shadow-2xl flex flex-col align-middle items-center space-y-3 justify-center ">
    //       <p className="text-xl items-center justify-center font-bold text-black">
    //         Your Current Path in{" "}
    //         <span className="underline text-2xl">
    //           {userData.savedPathDetail.field}
    //         </span>
    //       </p>
    //       <p>
    //         {userData.savedPathDetail.specificPath}:{" "}
    //         {userData.savedPathDetail.title}
    //       </p>
    //       <Link
    //         href={`/career/${userData.savedPathDetail.fieldId}`}
    //         className={` text-white bg-gray-500 hover:bg-gray-900 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`}
    //       >
    //         Check the Market
    //       </Link>
    //     </div>
    //   </div>
    //   <div className=" p-4 justify-center items-center align-middle rounded-2xl shadow-xl  from-indigo-300 cursor-pointer bg-indigo-400/50 border-0 text-black">
    //     <div className="bg-indigo-100 h-full w-full rounded-lg mx-auto p-4 text-center shadow-2xl flex flex-col align-middle items-center space-y-3 justify-center">
    //       <p className="text-2xl items-center justify-center font-bold text-black pb-3">
    //         Your current progress
    //       </p>
    //       {missingCareerSkills.length > 0 ? (
    //         <>
    //           <ProgressBar
    //             completed={completedPercentage}
    //             maxCompleted={100}
    //             bgColor="#2E85B2"
    //             animateOnRender={true}
    //             className="w-60 md:w-96"
    //           />
    //           <div className="w-full">
    //             <ul className="my-6">
    //               {missingCareerSkills.map((skill) => (
    //                 <li key={skill}>
    //                   {skill} -{" "}
    //                   <SkillDropdown
    //                     skill={skill}
    //                     onChange={handleStatusChange}
    //                   />
    //                 </li>
    //               ))}
    //             </ul>
    //           </div>
    //         </>
    //       ) : (
    //         <p className="text-base items-center justify-center text-black pb-3">
    //           You don&apos;t have current progress yet.
    //         </p>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
}
