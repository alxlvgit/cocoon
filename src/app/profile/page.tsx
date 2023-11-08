"use client"
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

// const missingCareerSkillsForTest = ['design digital user interfaces or websites', 'ensure compatibility and usability across browsers or devices', 'use web framework applications', 'analyze web use metrics', 'optimize websites for marketability and search engine ranking', 'create graphics used in websites']
const completedSkillsForTest: string[] = [];

interface SkillDropdownProps {
  skill: string;
  onChange: (skill: string, status: string) => void;
}

const SkillDropdown: React.FC<SkillDropdownProps> = ({ skill, onChange }) => {
  const [status, setStatus] = useState('Start Soon');

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
      acc[skill] = 'Start Soon';
      return acc;
    }, {} as Record<string, string>)
  );

  const handleStatusChange = (skill: string, status: string) => {
    setSkillStatus((prevStatus) => ({
      ...prevStatus,
      [skill]: status,
    }));
    if(!(completedSkillsForTest.includes(skill))) {
      console.log("push")
      status === 'Completed' ? completedSkillsForTest.push(skill) : null;
    } else {
      console.log("splice")
      status === 'Start Soon' ? completedSkillsForTest.splice(completedSkillsForTest.indexOf(skill), 1) : null;
      status === 'In Progress' ? completedSkillsForTest.splice(completedSkillsForTest.indexOf(skill), 1) : null;
    }
    let completedPercentage = Math.trunc((completedSkillsForTest.length / missingCareerSkills.length) * 100);
    setCompletedPercentage(completedPercentage);
    console.log("completedSkillsForTest: ", completedSkillsForTest)
  };

  
  // console.log("missingCareerSkills: ", missingCareerSkills)


  
  return (
    <>
      <div className="flex flex-col m-4  items-center">
        <h1 className="text-4xl font-bold text-gray-400">
          Welcome to Profile Page
        </h1>
      </div>
      

      <div className="flex m-4 justify-center h-screen border border-gray-700 bg-indigo-100 flex-col w-full rounded-lg mx-auto p-3 text-center shadow-2xl align-middle items-center ">
        <div className="flex my-8 justify-center ">
          <div className="w-96 h-4 my-8">
            <h2 className="font-bold text-2xl my-4">Your current progress</h2>
            <ProgressBar completed={completedPercentage} maxCompleted={100} bgColor="#2E85B2" animateOnRender={true} />
          </div>
        </div>

        <ul className="my-6">
          {missingCareerSkills.map((skill) => (
            <li key={skill}>
              {skill} - <SkillDropdown skill={skill} onChange={handleStatusChange} />
            </li>
          ))}
        </ul>

      </div>
   
    </>
  );
}
