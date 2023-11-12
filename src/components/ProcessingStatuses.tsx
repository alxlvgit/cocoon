"use client";

import { useAppSelector } from "@/redux/hooks";
import ProcessingStatus from "./ProcessingStatus";

const ProcessingStatuses = () => {
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
    <ProcessingStatus
      key={"fail"}
      done={false}
      text="Processing failed. Please try again."
    />,
  ];

  const state = useAppSelector((state) => state.resumeProcessingSlice);
  const { processingStep } = state;

  return <>{processingStep && statusComponents[processingStep - 1]}</>;
};

export default ProcessingStatuses;
