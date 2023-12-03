import ProgressBar from "@ramonak/react-progress-bar";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";

const SkillsProgress = () => {
  const { pickedCareer, skillsMatchedPercentage } = useAppSelector(
    (state) => state.resumeProcessingSlice
  );

  return (
    <div className="bg-main-bg h-full col-span-2 w-full rounded-2xl p-4 sm:p-10 text-center flex flex-col  align-middle items-center justify-between shadow-xl">
      {pickedCareer && skillsMatchedPercentage ? (
        <>
          <h1 className="text-center font-bold md:col-span-2 text-md mb-8">
            Career Path: <span>{pickedCareer}</span>
          </h1>
          <div className="flex h-full w-full sm:p-8">
            <div className="bg-bright-main flex flex-col items-center justify-center p-8 rounded-xl w-full">
              <div className="flex flex-col sm:items-start justify-center sm:justify-start w-full">
                <p className="text-gray-500">Your progress</p>
                <p className="text-lg font-extrabold text-gray-600 pb-3">
                  {skillsMatchedPercentage}% completed
                </p>
              </div>
              <ProgressBar
                completed={skillsMatchedPercentage}
                maxCompleted={100}
                bgColor="#6DB8C5"
                animateOnRender={true}
                className="w-full sm:p-0 "
                baseBgColor="#ffffff"
                height="30px"
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-center mb-8 font-bold  text-md">
            No path has been selected, upload your resume to start !
          </h1>
          <div className="justify-center items-center text-md">
            <Link
              href="/careers"
              className="relative inline-flex items-center justify-center p-4 px-3 md:px-6 py-2 md:py-3 overflow-hidden font-medium transition duration-300 ease-out border-2 rounded-full shadow-md group border-gray-500"
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-black duration-300 -translate-x-full bg-356CBE group-hover:translate-x-0 ease">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="text-xs md:text-base absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease ">
                Pick Your Path
              </span>
              <span className="text-sm  md:text-base relative invisible">
                Pick Your Path
              </span>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default SkillsProgress;
