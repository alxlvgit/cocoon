"use client";

import React from "react";
import { useState, FormEvent } from "react";
import {
  extractTextFromDocx,
  extractTextFromPdf,
  getStructuredKeywords,
} from "../lib/resume-parsers";
import UploadStatus from "../components/UploadStatus";
import { runSimilaritySearch } from "../lib/semantic-search";
import * as odotnet from "./api/odotnet/fetch-api";
import * as enums from "./api/odotnet/enums";

function Home() {
  const [transferableSkills, setTransferableSkills] = useState<string[]>([]);
  const [missingSkills, setMissingSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<React.JSX.Element[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [googleDocId, setGoogleDocId] = useState("");

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

  const resetState = () => {
    setTransferableSkills([]);
    setMissingSkills([]);
    setLoading(false);
    setStatus([]);
  };

  const handleFileUpload = async () => {
    resetState();
    const reader = new FileReader();
    if (!file) {
      return;
    }
    reader.readAsBinaryString(file!);
    reader.onload = async () => {
      const fileContent = reader.result as string;
      const base64Bytes = Buffer.from(fileContent, "binary").toString("base64");
      setLoading(true);
      setStatus([statusComponents[0]]);
      // Step 1: extract text from pdf or docx
      const extractedText = file.name.endsWith(".docx")
        ? await extractTextFromDocx(base64Bytes)
        : await extractTextFromPdf(base64Bytes);
      if (!extractedText) {
        setLoading(false);
        setStatus([statusComponents[2]]);
        return;
      } else {
        setStatus([statusComponents[1]]);
        // Step 2: if text is extracted, extract key phrases by using ChatOpenAI API
        const keyPhrases = await getStructuredKeywords(extractedText);
        // Step 3: if key phrases are extracted, run similarity search against career data
        const careerData = await odotnet.odotnetCareerOverview(
          enums.SOCcode.WebandDigitalInterfaceDesigners
        );
        if (keyPhrases && careerData) {
          const skills = careerData?.career?.what_they_do ?? null;
          if (skills) {
            const careerSkillsKeyPhrases = await getStructuredKeywords(skills);
            if (careerSkillsKeyPhrases) {
              const { matchingSkills, missingSkills } =
                (await runSimilaritySearch(
                  careerSkillsKeyPhrases,
                  keyPhrases
                )) as { matchingSkills: string[]; missingSkills: string[] };
              setTransferableSkills(matchingSkills);
              setMissingSkills(missingSkills);
              setStatus([]);
              setLoading(false);
            } else {
              setStatus([statusComponents[2]]);
              return;
            }
          } else {
            setStatus([statusComponents[2]]);
            return;
          }
        } else {
          setStatus([statusComponents[2]]);
          return;
        }
      }
    };
  };

  // handle google doc link submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = {
      googleDocId: googleDocId,
    };

    const res = await fetch("/api/googledoc", {
      method: "POST",
      body: JSON.stringify(form),
    });
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
            <p className="text-lg font-semibold m-5">Transferable Skills:</p>
          </>
        )}
        {transferableSkills.map((phrase, index) => (
          <div key={index} className="flex flex-col mb-4">
            <p className="text-sm font-semibold">- {phrase}</p>
          </div>
        ))}
        {missingSkills.length > 0 && (
          <p className="text-lg font-semibold m-5">Missing Skills:</p>
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
        onSubmit={handleSubmit}
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
