"use client";

import React, { useState } from "react";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url.slice(0, -1)
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
  const [errorMsg, setErrorMsg] = useState<string>("");

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

    if (!uploadedFile) {
      setErrorMsg("Please upload your resume");
    }

    if (uploadedFile) {
      setErrorMsg("");
      reader.readAsBinaryString(uploadedFile!);
      reader.onload = async () => {
        const fileContent = reader.result as string;
        const base64Bytes = Buffer.from(fileContent, "binary").toString(
          "base64"
        );
        console.log(base64Bytes);
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
    <div className="flex flex-col md:mt-3 md:mb-8 md:mx-14 items-center bg-blue-100 md:rounded-xl shadow-2xl h-screen md:h-full">

      <div className="bg-neutral-600 flex flex-col flex-nowrap m-5 h-20 md:m-6 rounded-xl w-3/4 md:h-60 items-center overflow">
        <div className="grow">
          <p className="self-center w-full p-6 md:p-20 text-center text-white text-xl md:text-5xl grow">
            Cocoon
          </p>
          
        </div>
      </div>

      <div className="flex flex-col mt-1 items-center p-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 space-y-2 mb-5">
        <p className="text-base font-semibold">Upload Resume</p>
        <label
          htmlFor="pdfUpload"
          className="mb-1 block text-xs font-medium text-gray-700"
        >
          PDF, DOCX only
        </label>
        <input
          id="pdfUpload"
          className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.60rem] text-xs font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.60rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-5 file:py-[0.60rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.86rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary pb-2"
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

        <form
          className="flex flex-col justify-between h-full p-2 items-center align-middle "
          onSubmit={handleGoogleDocLinkSubmit}
        >
          <p className="text-base font-semibold">Google Doc Link</p>
          <input
            className="text-sm text-gray-900 border p-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            type="text"
            placeholder="Enter Google Doc ID"
            onChange={(e) => dispatch(setGoogleDocUrl(e.target.value))}
            required
          />

          <button
            type="submit"
            className="bg-white m-3 hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow text-sm"
          >
            Start With Google Doc
          </button>
        </form>
      </div>
      

      {/* {processingStep && statusComponents[processingStep - 1] && processing} */}
      {processingStep && statusComponents[processingStep - 1]}
      {/* <div className="flex flex-col items-center mt-12 z-50">
        {processingStep && statusComponents[processingStep - 1]}
        {processing && (
          <>
            <div className="mt-12 mb-6 animate-spin rounded-full h-24 w-24 border-b-2 border-black dark:border-white"></div>
          </>
        )}
      </div> */}

    </div>
  );
}

export default Uploads;
