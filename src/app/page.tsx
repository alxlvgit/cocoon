"use client";

import React from "react";
import { useState } from "react";
import {
  extractTextFromDocx,
  extractTextFromPdf,
  getKeyPhrases,
} from "../lib/text-extractor";
import UploadStatus from "../components/UploadStatus";
import main from "./api/odotnet";

function Home() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<React.JSX.Element[]>([]);
  const [file, setFile] = useState<File | null>(null);

  main();

  const statusComponents = [
    <UploadStatus key={"uploaded"} done={true} text="File Uploaded" />,
    <UploadStatus key={"extracted"} done={true} text="Extracted Text" />,
    <UploadStatus key={"phrases"} done={true} text="Key Phrases Extracted" />,
    <UploadStatus
      key={"failed"}
      done={false}
      text="Could not extract text from the document."
    />,
    <UploadStatus
      key={"fail"}
      done={false}
      text="Failed to retrieve key phrases."
    />,
  ];

  const handleFileUpload = async () => {
    setSummary("");
    setStatus([]);
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
      // extract text from pdf or docx
      const extractedText = file.name.endsWith(".docx")
        ? await extractTextFromDocx(base64Bytes)
        : await extractTextFromPdf(base64Bytes);
      if (!extractedText) {
        setLoading(false);
        setStatus([statusComponents[3]]);
        return;
      } else {
        setStatus([statusComponents[1]]);
        // if text is extracted, extract key phrases by using ChatOpenAI API
        const keyPhrases = await getKeyPhrases(extractedText);
        if (!keyPhrases) {
          setLoading(false);
          setStatus([statusComponents[4]]);
          return;
        } else {
          setStatus([statusComponents[2]]);
          setLoading(false);
          setSummary(keyPhrases);
        }
      }
    };
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
      <div className="w-3/4 mt-6">{summary}</div>
    </div>
  );
}

export default Home;
