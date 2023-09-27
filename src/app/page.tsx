"use client";

import { TextItem } from "pdfjs-dist/types/src/display/api";
import { useState } from "react";
import { summarizeTheText } from "./lib/api";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export default function Home() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  interface ExtractedContent extends TextItem {
    str: string;
  }

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const contents = e.target!.result;
      if (!contents) return;
      try {
        const pdf = await pdfjs.getDocument(contents).promise;
        let pdfText = "";

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const pageText = await page.getTextContent();
          pdfText += pageText.items
            .map((item) => (item as ExtractedContent).str)
            .join("\n");
        }
        setLoading(true);
        const summary = await summarizeTheText(pdfText);
        setLoading(false);
        setSummary(summary);
      } catch (e) {
        console.log(e);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex flex-col m-4  items-center">
      <p className="mb-4 text-lg font-semibold">Upload Your Resume</p>
      <input
        className=""
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
      />
      {loading && (
        <div className="mt-4 animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      )}
      <div className="w-1/2 mt-6">{summary}</div>
    </div>
  );
}
