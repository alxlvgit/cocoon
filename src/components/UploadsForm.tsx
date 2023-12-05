"use client";

import React, { useState } from "react";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

import {
  extractTextFromDocx,
  extractTextFromPdf,
} from "@/app/(main-content)/uploads/resume-parsers";
import {
  extractCareerKeyPhrases,
  extractResumeKeyPhrases,
  findMissingSkills,
} from "@/app/(main-content)/uploads/document-processing";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import {
  resetResumeProcessingState,
  setMissingSkills,
  setPickedCareer,
  setProcessing,
  setProcessingStep as setProcessingStatus,
  setTransferableSkills,
  setMatchingSkills,
  setRequiredSkills,
  setSkillsMatchedPercentage,
} from "@/redux/features/resumeProcessingSlice";
import GoogleDocForm from "./GoogleDocForm";
import { resetPathsState } from "@/redux/features/pathSlice";

const UploadsForm = ({ careerCode }: { careerCode: string }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const [errorMsg, setErrorMsg] = useState<string>("");

  const getNumberOfPDFPages = async (pdfData: string) => {
    const pdf = await pdfjs.getDocument({ data: atob(pdfData) }).promise;
    return pdf.numPages;
  };

  // // Run analysis on extracted text
  const runAnalysis = async (extractedText: string) => {
    dispatch(setProcessingStatus(3));
    const resumeKeyPhrases = await extractResumeKeyPhrases(extractedText); // Step 2: if text is extracted, extract key phrases by using ChatOpenAI API
    if (resumeKeyPhrases.success) {
      dispatch(setProcessingStatus(4));
    } else {
      dispatch(setProcessingStatus(7));
      dispatch(setProcessing(false));
      return;
    }
    const careerSkillsKeyPhrases = await extractCareerKeyPhrases(careerCode); // Step 3: extract key phrases from career skills
    const { title, requiredTasks } = careerSkillsKeyPhrases
      ? careerSkillsKeyPhrases
      : { title: null, requiredTasks: null };
    if (requiredTasks && resumeKeyPhrases && title) {
      dispatch(setProcessingStatus(5));
      const matchingMissingSkills = await findMissingSkills(
        requiredTasks,
        resumeKeyPhrases.success
      ); // Step 4: if key phrases are extracted from both resume and career skills, find missing skills by using semantic search
      if (
        !matchingMissingSkills.error &&
        matchingMissingSkills.matchedCareerSkills &&
        matchingMissingSkills.matchedResumeSkills &&
        matchingMissingSkills.missingCareerSkills
      ) {
        const {
          matchedResumeSkills,
          missingCareerSkills,
          matchedCareerSkills,
        } = matchingMissingSkills;
        dispatch(setPickedCareer(title));
        dispatch(setMissingSkills(missingCareerSkills));
        dispatch(setTransferableSkills(matchedResumeSkills));
        dispatch(setMatchingSkills(Array.from(matchedCareerSkills)));
        dispatch(setRequiredSkills(requiredTasks));
        dispatch(setSkillsMatchedPercentage());
        dispatch(setProcessing(false));
        dispatch(setProcessingStatus(null));
        router.push("/analysis");
      }
    } else {
      dispatch(setProcessing(false));
      dispatch(setProcessingStatus(7));
    }
  };

  // // Handle pdf or docx file upload
  const handleFileUpload = async () => {
    dispatch(resetResumeProcessingState());
    dispatch(resetPathsState());
    const reader = new FileReader();
    if (!uploadedFile) {
      setErrorMsg("Please upload your resume");
      return;
    }
    if (
      uploadedFile &&
      uploadedFile.name.endsWith(".docx") &&
      uploadedFile.size > 100000
    ) {
      setErrorMsg("File size is too large. Please upload a smaller file");
      return;
    }
    setErrorMsg("");
    reader.readAsBinaryString(uploadedFile!);
    reader.onload = async () => {
      const fileContent = reader.result as string;
      const base64Bytes = Buffer.from(fileContent, "binary").toString("base64");
      dispatch(setProcessing(true));
      dispatch(setProcessingStatus(1));
      const isPdf = uploadedFile.name.endsWith(".pdf");
      const isDocx = uploadedFile.name.endsWith(".docx");
      if (isPdf) {
        const numPages = await getNumberOfPDFPages(base64Bytes);
        if (numPages > 1) {
          dispatch(setProcessingStatus(6));
          dispatch(setProcessing(false));
          return;
        }
      }
      dispatch(setProcessingStatus(2));
      const extractedText = isDocx
        ? await extractTextFromDocx(base64Bytes)
        : await extractTextFromPdf(base64Bytes); // Step 1: extract text from pdf or docx
      if (extractedText) {
        await runAnalysis(extractedText);
      } else {
        dispatch(setProcessingStatus(7));
        dispatch(setProcessing(false));
      }
    };
  };

  return (
    <>
      <div className="flex flex-col my-6 items-center p-4 max-w-sm bg-white border border-gray-300 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 space-y-2">
        <p className="text-base font-semibold">Upload Resume</p>
        <label
          htmlFor="pdfUpload"
          className="mb-1 block text-xs font-medium text-gray-700"
        >
          PDF, DOCX only
        </label>
        <input
          id="pdfUpload"
          className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.60rem] text-xs font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.60rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-5 file:py-[0.60rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.86rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary pb-4 sm:pb-2"
          type="file"
          accept="application/pdf,.docx"
          onChange={(e) => setUploadedFile(e.target.files![0])}
        />
        <div>
          <button
            onClick={handleFileUpload}
            className="bg-white m-3 hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow text-sm"
          >
            Start With Your File
          </button>
        </div>

        {errorMsg.length > 0 ? (
          <p className="text-xs pb-3 text-red-700 underline decoration-wavy">
            {errorMsg}
          </p>
        ) : null}

        <hr className="w-48 h-2 mx-auto my-5 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />

        <GoogleDocForm runAnalysisFunction={runAnalysis} />
      </div>
    </>
  );
};

export default UploadsForm;
