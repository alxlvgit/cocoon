"use client";

import { useAppSelector } from "@/redux/hooks";

const SavedCareers = () => {
  const { pickedCareer } = useAppSelector(
    (state) => state.resumeProcessingSlice
  );

  return (
    <>
      <div className="bg-main-bg p-4 shadow-xl rounded-2xl flex-col flex items-center justify-center w-full h-full">
        <div>
          <p className="font-bold text-lg mb-2 text-center">Saved Careers</p>
        </div>
        <div className="overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 w-full h-full border shadow-lg border-gray-300 rounded-xl px-3 pt-1 pb-3 bg-bright-main">
          {pickedCareer ? (
            <div className="bg-blue-200 my-4 p-2 rounded-md">
              {pickedCareer}
            </div>
          ) : (
            <div className="row-span-6 bg-bright-main h-96 m-1.5 rounded-2xl flex items-center justify-center">
              Nothing to Display
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SavedCareers;
