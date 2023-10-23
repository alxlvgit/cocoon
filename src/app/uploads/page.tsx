"use client";

import React, { useState } from "react";
import { FormEvent } from "react";
import { extractTextFromDocx, extractTextFromPdf } from "@/utils/resume-parsers";
import UploadStatus from "@/components/UploadStatus";
import {
  extractCareerKeyPhrases,
  extractResumeKeyPhrases,
  findMissingSkills,
} from "@/app/uploads/document-processing";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  resetResumeProcessingState,
  setGoogleDocUrl,
  setMissingSkills,
  setProcessing,
  setProcessingStep,
  setTransferableSkills,
} from "@/redux/features/resumeProcessingSlice";

function Uploads() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.resumeProcessingSlice);
  const { processing, processingStep, googleDocUrl } = state;
  const router = useRouter();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

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

  // Handle pdf or docx file upload
  const handleFileUpload = async () => {
    dispatch(resetResumeProcessingState());
    const reader = new FileReader();
    if (uploadedFile) {
      reader.readAsBinaryString(uploadedFile!);
      reader.onload = async () => {
        const fileContent = reader.result as string;
        const base64Bytes = Buffer.from(fileContent, "binary").toString(
          "base64"
        );
        dispatch(setProcessing(true));
        dispatch(setProcessingStep(1));
        const extractedText = uploadedFile.name.endsWith(".docx")
          ? await extractTextFromDocx(base64Bytes)
          : await extractTextFromPdf(base64Bytes); // Step 1: extract text from pdf or docx
        if (extractedText) {
          dispatch(setProcessingStep(2));
          const resumeKeyPhrases = await extractResumeKeyPhrases(extractedText); // Step 2: if text is extracted, extract key phrases by using ChatOpenAI API
          const careerSkillsKeyPhrases = await extractCareerKeyPhrases(); // Step 3: extract key phrases from career skills
          if (careerSkillsKeyPhrases && resumeKeyPhrases) {
            const matchingMissingSkills = await findMissingSkills(
              careerSkillsKeyPhrases,
              resumeKeyPhrases
            ); // Step 4: if key phrases are extracted from both resume and career skills, find missing skills by using semantic search
            const { matchedResumeSkills, missingCareerSkills } =
              matchingMissingSkills;
            dispatch(setTransferableSkills(matchedResumeSkills));
            dispatch(setMissingSkills(missingCareerSkills));
            dispatch(setProcessing(false));
            dispatch(setProcessingStep(null));
            router.push("/suggestions");
          }
        }
      };
    } else {
      dispatch(setProcessingStep(3));
      dispatch(setProcessing(false));
    }
  };

  // handle google doc link submit
  const handleGoogleDocLinkSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (processing) {
      return;
    }
    const form = {
      googleDocId: googleDocUrl,
    };
    dispatch(setProcessing(true));
    const res = await fetch("/api/googledoc", {
      method: "POST",
      body: JSON.stringify(form),
    });
    const data = await res.json();
    console.log(data);
    dispatch(setProcessing(false));
  };

  return (
    <div className="flex flex-col m-16 items-center bg-indigo-200 rounded-xl border-2 shadow-2xl h-screen">
      <div className="relative flex items-center bg-neutral-600 w-8/12 h-72 mt-6 rounded-xl border-2 shadow-lg max-w-full">
        <p className="absolute mb-12 ml-80 text-white text-5xl">Cocoon</p>
      </div>

      <div className=" absolute flex flex-row items-center bg-white rounded-xl mt-60 h-48 w-4/12">
        <div className=" flex flex-row ml-14 mb-32 text-base ">
          <p className="text-base font-semibold">Upload Resume</p>
        </div>

        <input
          className=" absolute w-full h-10 text-sm cursor-pointer focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-4
          ml-8
          "
          type="file"
          accept="application/pdf,.docx"
          onChange={(e) => setUploadedFile(e.target.files![0])}
        />

        <button
          onClick={handleFileUpload}
          className=" absolute mt-24 ml-20 bg-blue-500 hover:bg-blue-700 text-white text-sm w-14 px-2 rounded"
        >
          Upload
        </button>
        {processingStep && statusComponents[processingStep - 1]}
        {processing && (
          <>
            <div className="mt-80 animate-spin rounded-full h-32 w-32 border-b-2 border-black dark:border-white"></div>
          </>
        )}
        {/* Google Docs Link */}
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={handleGoogleDocLinkSubmit}
        >
          <p className="mb-32 font-semibold ml-28 mt-1 ">Google Doc Link</p>
          <input
            className=" absolute mb-8 ml-32 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            type="text"
            placeholder="Enter Google Doc ID"
            onChange={(e) => dispatch(setGoogleDocUrl(e.target.value))}
            required
          />

          <button
            type="submit"
            className=" absolute mt-28 mb-6 ml-24 bg-blue-500 hover:bg-blue-700 text-white text-sm w-14 px-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Uploads;
