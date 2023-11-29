import {
  RecommendedPath,
  UdemyPath,
  setCurrentPath,
} from "@/redux/features/pathSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import CourseProgram from "./CourseProgram";

const PathContainer = ({
  recommendedPathData,
  udemyPathData,
  pathType,
}: {
  pathType: string;
  recommendedPathData?: RecommendedPath;
  udemyPathData?: UdemyPath;
}) => {
  const dispatch = useAppDispatch();
  const { courses, program, udemyCourses } = useAppSelector(
    (state) => state.pathSlice
  );
  const router = useRouter();
  const setMyCurrentPath = () => {
    dispatch(setCurrentPath(pathType));
    router.push("/home");
  };

  return (
    <div className="flex flex-col w-full rounded-lg ">
      <div className="text-xs md:text-sm lg:text-lg text-left w-full">
        {recommendedPathData &&
          (recommendedPathData.bcitProgram && program ? (
            <CourseProgram
              type="BCIT"
              title={program.programName + " - BCIT Program"}
              link={
                recommendedPathData.bcitProgram[
                  Object.keys(recommendedPathData.bcitProgram)[0]
                ].program.url
              }
            />
          ) : recommendedPathData.bcitCourses && courses ? (
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
          ) : recommendedPathData.udemyCourses && udemyCourses ? (
            <>
              <CourseProgram
                type="Udemy"
                key={udemyCourses[0].id}
                title={udemyCourses[0].title + " - Udemy Course"}
                link={udemyCourses[0].url}
              />
            </>
          ) : null)}
        {udemyPathData && udemyCourses && (
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
      <div className="flex justify-start items-center">
        <button
          onClick={setMyCurrentPath}
          className="bg-button-bg w-fit hover:bg-gray-100 text-gray-800 font-medium py-1 px-4 mr-2 border border-gray-400 rounded-lg shadow text-sm"
        >
          Commit Path
        </button>
      </div>
    </div>
  );
};

export default PathContainer;
