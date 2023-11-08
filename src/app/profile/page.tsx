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

// const missingCareerSkillsForTest = ['design digital user interfaces or websites', 'ensure compatibility and usability across browsers or devices', 'use web framework applications', 'analyze web use metrics', 'optimize websites for marketability and search engine ranking', 'create graphics used in websites']
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

  // console.log("missingCareerSkills: ", missingCareerSkills)

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="pt-2 pb-10 flex-col flex items-center">
        <Image
          src={userData.user.avatar}
          alt="Description of your image"
          width={300}
          height={200}
          className="border rounded-full w-36 h-36"
        ></Image>
        <p className="pt-2 text-md justify-center items-center font-bold text-black">
          Make your next step with us!
        </p>
        <p className="text-xl items-center justify-center font-bold text-black">
          {userData.user.username}
        </p>
      </div>
      <div className="w-4/5 mx-auto space-y-4">
        <div className=" p-4 justify-center items-center align-middle rounded-2xl shadow-xl  from-indigo-300 cursor-pointer bg-indigo-400/50 border-0 text-black">
          <div className="bg-indigo-100 h-full w-full rounded-lg mx-auto p-4 text-center shadow-2xl flex flex-col align-middle items-center space-y-3 justify-center ">
            <p className="text-xl items-center justify-center font-bold text-black">
              Your Current Path in{" "}
              <span className="underline text-2xl">
                {userData.savedPathDetail.field}
              </span>
            </p>
            <p>
              {userData.savedPathDetail.specificPath}:{" "}
              {userData.savedPathDetail.title}
            </p>
            <Link
              href={`/career/${userData.savedPathDetail.fieldId}`}
              className={` text-white bg-gray-500 hover:bg-gray-900 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`}
            >
              Check the Market
            </Link>
          </div>
        </div>
        <div className=" p-4 justify-center items-center align-middle rounded-2xl shadow-xl  from-indigo-300 cursor-pointer bg-indigo-400/50 border-0 text-black">
          <div className="bg-indigo-100 h-full w-full rounded-lg mx-auto p-4 text-center shadow-2xl flex flex-col align-middle items-center space-y-3 justify-center">
            <p className="text-2xl items-center justify-center font-bold text-black pb-3">
              Your current progress
            </p>
            {missingCareerSkills.length > 0 ? (
              <>
                <ProgressBar
                  completed={completedPercentage}
                  maxCompleted={100}
                  bgColor="#2E85B2"
                  animateOnRender={true}
                  className="w-60 md:w-96"
                />
                <div className="w-full">
                  <ul className="my-6">
                    {missingCareerSkills.map((skill) => (
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
              </>
            ) : (
              <p className="text-base items-center justify-center text-black pb-3">
                You don't have current progress yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
