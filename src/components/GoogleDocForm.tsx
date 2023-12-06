import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { FormEvent } from "react";
import {
  setGoogleDocUrl,
  setProcessing,
  setProcessingStep as setProcessingStatus,
} from "@/redux/features/resumeProcessingSlice";

const GoogleDocForm = ({
  runAnalysisFunction,
  setActivedStepOne,
}: {
  runAnalysisFunction: (data: string) => Promise<void>;
  setActivedStepOne: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.resumeProcessingSlice);
  const { processing, googleDocUrl } = state;
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
    setActivedStepOne(true);
    const res = await fetch("/api/googledoc", {
      method: "POST",
      body: JSON.stringify(form),
    });
    const data = await res.json();
    dispatch(setProcessing(true));
    dispatch(setProcessingStatus(2));
    if (data) {
      await runAnalysisFunction(data);
    } else {
      dispatch(setProcessingStatus(3));
      dispatch(setProcessing(false));
    }
  };

  return (
    <form
      className="flex flex-col justify-between h-full p-2 items-center align-middle "
      onSubmit={handleGoogleDocLinkSubmit}
    >
      <p className="text-base font-semibold">Google Doc Link</p>
      <input
        className="text-sm text-gray-900 border p-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        type="text"
        placeholder="Enter Google Doc URL"
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
  );
};

export default GoogleDocForm;
