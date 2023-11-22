"use client";

import { useAppSelector } from "@/redux/hooks";
import ProcessingStatus from "./ProcessingStatus";

const ProcessingStatuses = () => {
  // Status components to display during document processing
  const statusComponents = [
    // 0
    <ProcessingStatus key={"uploaded"} done={true} text="File Uploaded" />,
    // 1
    <ProcessingStatus
      key={"extracted-text"}
      done={true}
      text="Extracting text. Analyzing your resume..."
    />,
    // 2
    <ProcessingStatus
      key={"failed-to-retrieve"}
      done={false}
      text="Failed to retrieve key phrases."
    />,
    // 3
    <ProcessingStatus
      key={"only-single-page-pdf"}
      done={false}
      text="Only single page PDFs are supported at this time."
    />,
    // 4
    <ProcessingStatus
      key={"processing-failed"}
      done={false}
      text="Processing failed. Please try again."
    />,
    // 5
    <ProcessingStatus
      key={"finding-missing-skills"}
      done={true}
      text="Finding your missing skills for this career..."
    />,
    // 6
    <ProcessingStatus
      key={"extracting-key-phrases-from-career"}
      done={true}
      text="Matching your skills to the career..."
    />,
  ];

  const state = useAppSelector((state) => state.resumeProcessingSlice);
  const { processingStep } = state;

  return <>{processingStep && statusComponents[processingStep - 1]}</>;
};

export default ProcessingStatuses;
