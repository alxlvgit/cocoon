import { RecommendedPathResult } from "@/app/(main-content)/analysis/path-search";
import { UdemyCourse } from "@/app/(main-content)/analysis/fetch-udemy";
import { setCurrentPath } from "@/redux/features/pathSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import CourseProgram from "./CourseProgram";

const PathContainer = ({
  recommendedPathData,
  udemyPathData,
  pathType,
}: {
  pathType: string;
  recommendedPathData?: RecommendedPathResult;
  udemyPathData?: UdemyCourse[];
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const setMyCurrentPath = () => {
    dispatch(setCurrentPath(pathType));
    router.push("/home");
  };

  return (
    <div className="flex flex-col w-full rounded-lg ">
      <div className="text-xs md:text-sm lg:text-lg text-left w-full">
        {recommendedPathData &&
          (recommendedPathData.bcitProgram ? (
            <CourseProgram
              type="BCIT"
              title={
                recommendedPathData.bcitProgram.programName + " - BCIT Program"
              }
              link={""}
            />
          ) : recommendedPathData.bcitCourses ? (
            <>
              {recommendedPathData.bcitCourses.map((course) => (
                <CourseProgram
                  type="BCIT"
                  key={course.courseCode}
                  title={course.courseName + " - BCIT Course"}
                  link={""}
                />
              ))}
            </>
          ) : recommendedPathData.udemyCourses ? (
            <>
              <CourseProgram
                type="Udemy"
                key={recommendedPathData.udemyCourses.id}
                title={
                  recommendedPathData.udemyCourses.title + " - Udemy Course"
                }
                link={recommendedPathData.udemyCourses.url}
              />
            </>
          ) : null)}
        {udemyPathData && (
          <>
            {udemyPathData.map((course) => (
              <CourseProgram
                type="Udemy"
                key={course.id}
                title={course.title}
                link={course.url}
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
