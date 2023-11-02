import { useState } from "react";

const Path = ({
  skillsMismatch,
  positionTitle,
  recommendedPath,
  cheapestPath,
  onlineOnlyPath,
}: {
  skillsMismatch: number;
  positionTitle: string;
  recommendedPath: string;
  cheapestPath: string;
  onlineOnlyPath: string;
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="flex flex-col mx-auto p-8 w-5/6 lg:w-4/5  justify-center items-center align-middle rounded-2xl shadow-md bg-gradient-to-t from-indigo-300 border border-gray-100 text-black mb-10">
      <div className="bg-indigo-100 h-full w-full rounded-lg mx-auto p-4 text-center shadow-2xl flex flex-col align-middle items-center justify-center">
        <h1 className="text-xs md:text-base lg:text-lg font-extrabold text-center hover:font-semibold w-full mb-4">
          {positionTitle}
        </h1>
        <h1 className="text-xs md:text-base lg:text-lg text-left w-full">
          Skills Mismatch: {skillsMismatch}%
        </h1>
        {showDetails && (
          <div className="flex w-full flex-col justify-center items-left align-middle">
            <h1 className="text-xs md:text-base lg:text-lg text-left font-bold mt-3 w-full">
              Recommended Path:
            </h1>
            <p className="text-xs md:text-base lg:text-lg text-left w-full">
              {recommendedPath}
            </p>
            <h1 className="text-xs md:text-base lg:text-lg text-left font-bold mt-3 w-full">
              Cheapest Path:
            </h1>
            <p className="text-xs md:text-base lg:text-lg text-left w-full">
              {cheapestPath}
            </p>
            <h1 className="text-xs md:text-base lg:text-lg text-left font-bold mt-3 w-full">
              Online Only Path:
            </h1>
            <p className="text-xs md:text-base lg:text-lg text-left w-full">
              {onlineOnlyPath}
            </p>
          </div>
        )}
        <div className="flex flex-row justify-left w-full items-center align-middle mt-4">
          <button
            onClick={() => {
              handleClick();
            }}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 mr-2 border border-gray-400 rounded-lg shadow text-sm"
          >
            {showDetails ? "Hide Details" : "Show Details"}
          </button>
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 mr-2 border border-gray-400 rounded-lg shadow text-sm">
            Mark As My Current Path
          </button>
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded-lg shadow text-sm">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default Path;
