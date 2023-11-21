import { RecommendedPathResult } from "@/app/path/college-path";
import { UdemyCourse } from "@/app/path/online-path";
import { setCurrentPath } from "@/redux/features/pathSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";

const PathContainer = ({
  recommendedPathData,
  onlineOnlyPathData,
  onMouseEnter,
  onMouseLeave,
  hoveredPath,
  pathType,
}: {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  hoveredPath: string | null;
  pathType: string;
  recommendedPathData?: RecommendedPathResult;
  onlineOnlyPathData?: UdemyCourse;
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const setMyCurrentPath = () => {
    dispatch(setCurrentPath(pathType));
    router.push("/profile");
  };

  return (
    <div
      className="flex flex-col w-full hover:bg-indigo-200 rounded-lg p-6"
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={() => onMouseLeave()}
    >
      <h1 className="text-xs md:text-base lg:text-xl text-left font-bold mt-3 w-full">
        {pathType} Path:
      </h1>
      <div className="text-xs md:text-sm lg:text-lg text-left w-full">
        {recommendedPathData &&
          (recommendedPathData.bcitProgram ? (
            recommendedPathData.bcitProgram.programName + " - BCIT Program"
          ) : recommendedPathData.bcitCourses ? (
            <>
              <p className="font-bold mt-3">BCIT Courses:</p>
              {Object.keys(recommendedPathData.bcitCourses).map((course) => (
                <p key={course}>- {course}</p>
              ))}
            </>
          ) : recommendedPathData.udemyCourses ? (
            <>
              <p className="font-bold mt-3">Udemy Courses:</p>
              {recommendedPathData!.udemyCourses.title}
            </>
          ) : null)}
        {onlineOnlyPathData && (
          <>
            <p className="font-bold mt-3">Udemy Courses:</p>
            <p>{onlineOnlyPathData.title}</p>
          </>
        )}
      </div>
      {hoveredPath === pathType && (
        <button
          onClick={setMyCurrentPath}
          className="bg-white w-fit mt-2 hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 mr-2 border border-gray-400 rounded-lg shadow text-sm"
        >
          Make it my path
        </button>
      )}
    </div>
  );
};

export default PathContainer;
