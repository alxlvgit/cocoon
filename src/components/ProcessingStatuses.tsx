"use client";

import { useAppSelector } from "@/redux/hooks";
import ProcessingStatus from "./ProcessingStatus";

const ProcessingStatuses = () => {
  // Status components to display during document processing
  const statusComponents = [
    // 1
    <ProcessingStatus key={"uploaded"} error={false} text="File Uploaded" />,
    // 2
    <ProcessingStatus
      key={"extracted-text"}
      error={false}
      text="Extracting text from document..."
    />,
    // 3
    <ProcessingStatus
      key={"extracting-key-phrases-from-resume"}
      error={false}
      text="Extracting key phrases from your resume..."
    />,
    // 4
    <ProcessingStatus
      key={"extracting-career-key-phrases"}
      error={false}
      text="Extracting key phrases from career requirements..."
    />,
    // 5
    <ProcessingStatus
      key={"matching-skills"}
      error={false}
      text=" 
    Matching your skills to career requirements...
    "
    />,
    // 6
    <ProcessingStatus
      key={"only-single-page-pdf"}
      error={true}
      text="Only single page PDFs are supported at this time."
    />,

    // 7
    <ProcessingStatus
      key={"failed-analyze-resume"}
      error={true}
      text="Could not analyze your resume. Please upload a file and try again."
    />,
  ];

  const state = useAppSelector((state) => state.resumeProcessingSlice);
  const { processingStep } = state;

  return <>{processingStep && statusComponents[processingStep - 1]}</>;
};

export default ProcessingStatuses;
