import {
  RecommendedPath,
  UdemyPath,
  setCurrentPath,
} from "@/redux/features/pathSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import CourseProgram from "./CourseProgram";
import {
  resetToInitialMatchingSkills,
  resetToInitialMissingSkills,
  setSkillsMatchedPercentage,
} from "@/redux/features/resumeProcessingSlice";

const PathContainer = ({
  pathData,
  pathType,
}: {
  pathType: string;
  pathData: RecommendedPath | UdemyPath;
}) => {
  const dispatch = useAppDispatch();
  const { courses, program, udemyCourses, currentPath } = useAppSelector(
    (state) => state.pathSlice
  );
  const router = useRouter();
  const setMyCurrentPath = () => {
    dispatch(setCurrentPath(pathType));
    dispatch(resetToInitialMatchingSkills());
    dispatch(resetToInitialMissingSkills());
    dispatch(setSkillsMatchedPercentage());
    router.push("/home");
  };

  return (
    <>
    <div className="flex flex-col w-full rounded-lg h-[360px] overflow-auto">
      <div className="text-xs md:text-sm lg:text-lg text-left w-full ">
        {pathData &&
          pathType === "recommended" &&
          (pathData.bcitProgram && program ? (
            <CourseProgram
              type="BCIT"
              title={program.programName + " - BCIT Program"}
              link={program.url}
            />
          ) : pathData.bcitCourses && courses ? (
            <>
              {courses.map((courseData) => (
                <CourseProgram
                  type="BCIT"
                  key={courseData.courseCode}
                  title={courseData.courseName + " - BCIT Course"}
                  link={courseData.url}
                />
              ))}
            </>
          ) : pathData.udemyCourses && udemyCourses ? (
            <>
              <CourseProgram
                type="Udemy"
                key={udemyCourses[0].id}
                title={udemyCourses[0].title + " - Udemy Course"}
                link={udemyCourses[0].url}
              />
            </>
          ) : null)}
        {pathData && pathType === "online-only" && udemyCourses && (
          <>
            {udemyCourses.map((val) => (
              <CourseProgram
                type="Udemy"
                key={val.id}
                title={val.title + " - Udemy Course"}
                link={val.url}
              />
            ))}
          </>
        )}
      </div>
      {/* <div className="flex justify-start items-center">
        {currentPath === pathType ? (
          <div className="text-xs md:text-sm lg:text-base font-bold text-center w-full px-8 py-2 border text-white border-white rounded-lg">
            This is your current path
          </div>
        ) : (
          <button
            onClick={setMyCurrentPath}
            className="bg-button-bg w-fit hover:bg-gray-100 text-gray-800 font-medium py-1 px-4 mr-2 mt-2  border border-gray-400 rounded-lg shadow text-sm"
          >
            Commit Path
          </button>
        )}
      </div> */}
    </div>
    <div className="flex justify-start items-center">
        {currentPath === pathType ? (
          <div className="text-xs md:text-sm lg:text-base font-bold text-center w-full px-8 py-2 border text-white border-white rounded-lg">
            This is your current path
          </div>
        ) : (
          <button
            onClick={setMyCurrentPath}
            className="bg-button-bg w-fit hover:bg-gray-100 text-gray-800 font-medium py-1 px-4 mr-2 mt-2  border border-gray-400 rounded-lg shadow text-sm"
          >
            Commit Path
          </button>
        )}
      </div>
    </>
  );
};

export default PathContainer;
