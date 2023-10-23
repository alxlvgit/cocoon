"use client";

import React, { useState } from "react";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
import { FormEvent } from "react";
import {
  extractTextFromDocx,
  extractTextFromPdf,
} from "@/app/uploads/resume-parsers";
import ProcessingStatus from "@/components/ProcessingStatus";
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
  setPickedCareer,
  setProcessing,
  setProcessingStep as setProcessingStatus,
  setTransferableSkills,
} from "@/redux/features/resumeProcessingSlice";

function Uploads({ params }: { params: { careerCode: string } }) {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.resumeProcessingSlice);
  const { processing, processingStep, googleDocUrl } = state;
  const router = useRouter();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const careerCode = params.careerCode;

  // Status components to display during document processing
  const statusComponents = [
    <ProcessingStatus key={"uploaded"} done={true} text="File Uploaded" />,
    <ProcessingStatus
      key={"extracted"}
      done={true}
      text="Extracted Text. Analysing document..."
    />,
    <ProcessingStatus
      key={"fail"}
      done={false}
      text="Failed to retrieve key phrases."
    />,
    <ProcessingStatus
      key={"fail"}
      done={false}
      text="Only single page PDFs are supported at this time."
    />,
  ];

  const getNumberOfPDFPages = async (pdfData: string) => {
    const pdf = await pdfjs.getDocument({ data: atob(pdfData) }).promise;
    return pdf.numPages;
  };

  // // Run analysis on extracted text
  const runAnalysis = async (extractedText: string) => {
    dispatch(setProcessingStatus(2));
    const resumeKeyPhrases = await extractResumeKeyPhrases(extractedText); // Step 2: if text is extracted, extract key phrases by using ChatOpenAI API
    const careerSkillsKeyPhrases = await extractCareerKeyPhrases(careerCode); // Step 3: extract key phrases from career skills
    const { title, requiredSkills } = careerSkillsKeyPhrases;
    if (requiredSkills && resumeKeyPhrases) {
      const matchingMissingSkills = await findMissingSkills(
        requiredSkills,
        resumeKeyPhrases
      ); // Step 4: if key phrases are extracted from both resume and career skills, find missing skills by using semantic search
      const { matchedResumeSkills, missingCareerSkills } =
        matchingMissingSkills;
      dispatch(setPickedCareer(title));
      dispatch(setMissingSkills(missingCareerSkills));
      dispatch(setTransferableSkills(matchedResumeSkills));
      dispatch(setProcessing(false));
      dispatch(setProcessingStatus(null));
      router.push("/career-gap");
    }
  };

  // // Handle pdf or docx file upload
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
        dispatch(setProcessingStatus(1));
        const isPdf = uploadedFile.name.endsWith(".pdf");
        const isDocx = uploadedFile.name.endsWith(".docx");
        if (isPdf) {
          const numPages = await getNumberOfPDFPages(base64Bytes);
          if (numPages > 1) {
            dispatch(setProcessingStatus(4));
            dispatch(setProcessing(false));
            return;
          }
        }
        const extractedText = isDocx
          ? await extractTextFromDocx(base64Bytes)
          : await extractTextFromPdf(base64Bytes); // Step 1: extract text from pdf or docx
        if (extractedText) {
          await runAnalysis(extractedText);
        }
      };
    } else {
      dispatch(setProcessingStatus(3));
      dispatch(setProcessing(false));
    }
  };

  // // handle google doc link submit
  const handleGoogleDocLinkSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (processing) {
      return;
    }
    const form = {
      googleDocId: googleDocUrl,
    };
    dispatch(setProcessing(true));
    dispatch(setProcessingStatus(1));
    const res = await fetch("/api/googledoc", {
      method: "POST",
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data) {
      await runAnalysis(data);
    } else {
      dispatch(setProcessingStatus(3));
      dispatch(setProcessing(false));
    }
  };

  return (
    <div className="flex flex-col m-16 items-center bg-blue-100 rounded-xl border-2 shadow-2xl h-screen">
      <div className="relative flex flex-col items-center bg-gray-500 w-96 h-auto m-6 rounded-xl border-2 shadow-lg max-w-full text-center">
        <p className="text-white text-5xl mt-6 mb-2">Cocoon</p>
      </div>

      <div className="flex flex-col items-center bg-white rounded-xl">
        <p className="mb-4 text-base mt-2">Upload Resume</p>
        <input
          className="block w-1/4 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          type="file"
          accept="application/pdf,.docx"
          onChange={(e) => setUploadedFile(e.target.files![0])}
        />
        <p
          className="mt-2 w-1/4 text-xs text-left text-black dark:text-gray-300"
          id="file_input_help"
        >
          PDF, DOCX only
        </p>

        <button
          onClick={handleFileUpload}
          className="mt-6 mb-16 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Start
        </button>
        {processingStep && statusComponents[processingStep - 1]}
        {processing && (
          <>
            <div className="mt-8 animate-spin rounded-full h-32 w-32 border-b-2 border-black dark:border-white"></div>
          </>
        )}
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
            placeholder="Enter Google Doc ID"
            onChange={(e) => dispatch(setGoogleDocUrl(e.target.value))}
            required
          />

          <button
            type="submit"
            className="mt-6 mb-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Start With Google Doc
          </button>
        </form>
      </div>
    </div>
  );
}

export default Uploads;
