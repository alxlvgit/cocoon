import { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { calculateSkillsMatchPercentage } from "@/app/(main-content)/analysis/path-search";

interface Proptype {
  setCurrentPathCoursesAndPrograms: (
    obj:
      | {
          [key: string]: string[];
        }
      | undefined
  ) => void;
}

const SkillsProgress = ({ setCurrentPathCoursesAndPrograms }: Proptype) => {
  const { udemyCoursesWithSkills, coursesSkills, programSkills, currentPath } =
    useAppSelector((state) => state.pathSlice);

  const {
    missingCareerSkills,
    pickedCareer,
    requiredCareerSkills,
    matchingCareerSkills,
  } = useAppSelector((state) => state.resumeProcessingSlice);

  const completedSkills = useAppSelector(
    (state) => state.pathSlice.completedSkills
  );
  const [progressPercentage, setProgressPercentage] = useState(0);

  const {
    missingCareerSkills: resumeMissingCareerSkills,
    pickedCareer: resumePickedCareer,
  } = useAppSelector((state) => state.resumeProcessingSlice);

  const courses = useAppSelector((state) => state.pathSlice.courses);

  useEffect(() => {
    if (!missingCareerSkills || !pickedCareer) {
      return;
    }

    if (matchingCareerSkills && requiredCareerSkills) {
      const skillsMatchedPercentage = calculateSkillsMatchPercentage(
        matchingCareerSkills,
        requiredCareerSkills
      );

      setProgressPercentage(skillsMatchedPercentage);
    }

    if (currentPath == "Recommended") {
      setCurrentPathCoursesAndPrograms({ ...programSkills, ...coursesSkills });
    } else if (currentPath == "Online-Only") {
      setCurrentPathCoursesAndPrograms(udemyCoursesWithSkills);
    }

    // if (!matchingCareerSkills || !requiredCareerSkills) {
    //   const completedPercentage = Math.trunc(
    //     (completedSkills.length / missingCareerSkills.length) * 100
    //   );
    //   setProgressPercentage(completedPercentage);
    // } else {
    //   const skillsMatchedPercentage = calculateSkillsMatchPercentage(
    //     matchingCareerSkills,
    //     requiredCareerSkills
    //   );
    //   setProgressPercentage(skillsMatchedPercentage);
    // }
  }, [
    completedSkills,
    missingCareerSkills,
    pickedCareer,
    matchingCareerSkills,
    requiredCareerSkills,
  ]);

  return (
    <div className="sm:col-span-2">
      <div className="grid items-center">
        <div className="bg-main-bg h-full w-full rounded-2xl mx-auto p-4 text-center align-middle items-center justify-center grid grid-cols-1  shadow-xl">
          {missingCareerSkills && missingCareerSkills.length ? (
            <>
              <h1 className="m-5 text-center font-bold md:col-span-2 text-lg mb-8">
                Career Path: <span>{pickedCareer}</span>
              </h1>
              <div className="bg-white flex flex-col items-center justify-center h-32 rounded-xl w-full">
                <p className="text-gray-500">Your progress</p>
                <p className="text-xl font-extrabold text-blue-500 pb-3">
                  {progressPercentage}% completed
                </p>
                <ProgressBar
                  completed={progressPercentage}
                  maxCompleted={100}
                  bgColor="#2E85B2"
                  animateOnRender={true}
                  className="w-4/5"
                />
              </div>
              {/* {courses.map((course) => (
                <div
                  className="bg-gray-300 my-4 p-2 rounded-md"
                  key={course.courseCode}
                >
                  <p>{course.courseName}</p>
                </div>
              ))} */}
            </>
          ) : (
            <>
              <h1 className=" pt-3 text-center font-bold md:col-span-2 text-lg mb-6">
                No path has been selected, upload your resume to start !
              </h1>
              <div className="pb-8 justify-center items-center md:col-span-2 text-lg">
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
      </div>
    </div>
  );
};

export default SkillsProgress;
