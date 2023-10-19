"use client";

import React from "react";
import { useState, FormEvent } from "react";
import { extractTextFromDocx, extractTextFromPdf } from "../lib/resume-parsers";
import UploadStatus from "../components/UploadStatus";
import {
  extractCareerKeyPhrases,
  extractResumeKeyPhrases,
  findMissingSkills,
} from "./document-processing";

function Home() {
  const [transferableSkills, setTransferableSkillsFromResume] = useState<
    string[]
  >([]);
  const [missingSkills, setMissingSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<React.JSX.Element[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [googleDocId, setGoogleDocId] = useState("");

  // Status components to display during document processing
  const statusComponents = [
    <UploadStatus key={"uploaded"} done={true} text="File Uploaded" />,
    <UploadStatus
      key={"extracted"}
      done={true}
      text="Extracted Text. Analysing document..."
    />,
    <UploadStatus
      key={"fail"}
      done={false}
      text="Failed to retrieve key phrases."
    />,
  ];

  // Reset state to initial state
  const resetState = () => {
    setTransferableSkillsFromResume([]);
    setMissingSkills([]);
    setLoading(false);
    setStatus([]);
  };

  // Handle pdf or docx file upload
  const handleFileUpload = async () => {
    resetState();
    const reader = new FileReader();
    if (file) {
      reader.readAsBinaryString(file!);
      reader.onload = async () => {
        const fileContent = reader.result as string;
        const base64Bytes = Buffer.from(fileContent, "binary").toString(
          "base64"
        );
        setLoading(true);
        setStatus([statusComponents[0]]);
        const extractedText = file.name.endsWith(".docx")
          ? await extractTextFromDocx(base64Bytes)
          : await extractTextFromPdf(base64Bytes); // Step 1: extract text from pdf or docx
        if (extractedText) {
          setStatus([statusComponents[1]]);
          const resumeKeyPhrases = await extractResumeKeyPhrases(extractedText); // Step 2: if text is extracted, extract key phrases by using ChatOpenAI API
          const careerSkillsKeyPhrases = await extractCareerKeyPhrases(); // Step 3: extract key phrases from career skills
          if (careerSkillsKeyPhrases && resumeKeyPhrases) {
            const matchingMissingSkills = await findMissingSkills(
              careerSkillsKeyPhrases,
              resumeKeyPhrases
            ); // Step 4: if key phrases are extracted from both resume and career skills, find missing skills by using semantic search
            const { matchedResumeSkills, missingCareerSkills } =
              matchingMissingSkills;
            setTransferableSkillsFromResume(matchedResumeSkills);
            setMissingSkills(missingCareerSkills);
            setStatus([]);
            setLoading(false);
          }
        }
      };
    } else {
      setStatus([statusComponents[2]]);
      setLoading(false);
    }
  };

  // handle google doc link submit
  const handleGoogleDocLinkSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = {
      googleDocId: googleDocId,
    };
    setLoading(true);
    const res = await fetch("/api/googledoc", {
      method: "POST",
      body: JSON.stringify(form),
    });
    const data = await res.json();
    console.log(data);
    setLoading(false);
  };

  return (
    <div className="flex flex-col m-4  items-center">
      <p className="mb-4 text-lg font-semibold">Upload Your Resume</p>
      <input
        className="block w-1/4 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        type="file"
        accept="application/pdf,.docx"
        onChange={(e) => setFile(e.target.files![0])}
      />
      <p
        className="mt-2 w-1/4 text-xs text-left text-white dark:text-gray-300"
        id="file_input_help"
      >
        PDF, DOCX only
      </p>

      <button
        onClick={handleFileUpload}
        className=" mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Upload
      </button>
      {...status}
      {loading && (
        <>
          <div className="mt-8 animate-spin rounded-full h-32 w-32 border-b-2 border-black dark:border-white"></div>
        </>
      )}
      <div className="w-3/4 mt-6">
        {transferableSkills.length > 0 && (
          <>
            <p className="text-lg font-semibold m-5">
              Transitioning to: Web and Digital Interface Designers
            </p>
            <p className="text-lg font-semibold m-5">
              Transferable Skills From Resume:
            </p>
          </>
        )}
        {transferableSkills.map((phrase, index) => (
          <div key={index} className="flex flex-col mb-4">
            <p className="text-sm font-semibold">- {phrase}</p>
          </div>
        ))}
        {missingSkills.length > 0 && (
          <p className="text-lg font-semibold m-5">
            Missing Career Required Skills:
          </p>
        )}
        {missingSkills.map((phrase, index) => (
          <div key={index} className="flex flex-col mb-4">
            <p className="text-sm font-semibold">- {phrase}</p>
          </div>
        ))}
      </div>
      {/* Google Docs Link */}
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleGoogleDocLinkSubmit}
      >
        <p className="mb-4 text-lg font-semibold">
          Enter your Google Doc link of the resume
        </p>
        <input
          className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          type="text"
          name={googleDocId}
          placeholder="Enter Google Doc ID"
          onChange={(e) => setGoogleDocId(e.target.value)}
        />

        <button
          type="submit"
          className=" mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Home;
