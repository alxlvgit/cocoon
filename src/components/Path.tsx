import { useState } from "react";

const Path = ({
  skillsMismatch: skillsMatched,
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
    <div className="mx-auto p-4 w-4/5 justify-center items-center align-middle rounded-2xl shadow-xl bg-gradient-to-t from-indigo-300 cursor-pointer hover:bg-indigo-400 z-30 border-0 text-black">
      <div className="bg-indigo-100 h-full w-full rounded-lg mx-auto p-4 text-center shadow-2xl flex flex-col align-middle items-center justify-center">
        <h1 className="text-base md:text-lg lg:text-3lg font-extrabold text-center hover:font-semibold w-full mb-4">
          {positionTitle}
        </h1>
        <h1 className="text-base md:text-lg text-left justify-center items-center">
          Your resume skills have {skillsMatched}% match with {positionTitle}{" "}
          job
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
        <div className="grid grid-cols-1 md:grid-cols-3 pt-5 lg:gap-4 gap-1">
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
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 mr-2 border border-gray-400 rounded-lg shadow text-sm">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default Path;
