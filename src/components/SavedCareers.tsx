"use client";

import { useAppSelector } from "@/redux/hooks";

const SavedCareers = () => {
  const { pickedCareer } = useAppSelector(
    (state) => state.resumeProcessingSlice
  );

  return (
    <>
      <div className="h-full bg-main-bg shadow-xl rounded-2xl flex-col flex items-center justify-start w-full  p-4 sm:p-8">
        <div>
          <p className="font-bold text-lg mb-2 text-center">Saved Careers</p>
        </div>
        <div className="h-96 mb-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 w-full border shadow-lg border-gray-300 rounded-xl bg-bright-main">
          {pickedCareer ? (
            <div className="bg-blue-200 overflow-auto m-4 p-3 rounded-md">
              {/* should be an array of saved careers */}
              {pickedCareer}
            </div>
          ) : (
            <div className="row-span-6 bg-bright-main h-[400px] m-1.5 rounded-2xl flex items-center justify-center">
              Nothing to Display
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SavedCareers;
