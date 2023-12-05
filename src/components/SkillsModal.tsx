import {
  PathSkill,
  checkIfAllSkillsAcquired,
} from "@/redux/features/pathSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  updateRecommendedPath,
  updateUdemyPath,
} from "@/redux/features/pathSlice";
import {
  setSkillsMatchedPercentage,
  updateMissingSkills,
} from "@/redux/features/resumeProcessingSlice";
import { useState } from "react";
import { set } from "zod";

export default function SkillsModal({
  title,
  skills,
  open,
  setModalOpen,
  setCurrentCoursePercentage,
}: {
  title: string;
  skills: PathSkill[];
  open: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentCoursePercentage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { recommendedPath, udemyPath, currentPath } = useAppSelector(
    (state) => state.pathSlice
  );
  const [skillsAcquired, setSkillsAcquired] = useState<PathSkill[]>(skills);
  const dispatch = useAppDispatch();

  const handleSkillAcquiredChange = (skillData: PathSkill, title: string) => {
    if (recommendedPath && currentPath === "recommended") {
      dispatch(
        updateRecommendedPath({
          skill: skillData.skill,
          acquired: skillData.acquired,
          title,
        })
      );
    } else if (udemyPath && currentPath === "online-only") {
      dispatch(
        updateUdemyPath({
          skill: skillData.skill,
          acquired: skillData.acquired,
          title,
        })
      );
    }

    const updatedSkillsAcquired = skillsAcquired.map((data) =>
      data.skill === skillData.skill
        ? { ...data, acquired: !data.acquired }
        : data
    );
    setSkillsAcquired(updatedSkillsAcquired);
    setCurrentCoursePercentage(Math.trunc((updatedSkillsAcquired.filter(skill => skill.acquired === true).length / updatedSkillsAcquired.length * 100)))

    dispatch(updateMissingSkills({ skills: updatedSkillsAcquired }));
    dispatch(setSkillsMatchedPercentage());
    dispatch(
      checkIfAllSkillsAcquired({ skills: updatedSkillsAcquired, title })
    );
    
  };


  return (
    <>
      {open && (
        <div
          className="z-50 inset-0 fixed "
          id="my_modal_3"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-box m-auto  h-1/3 md:h-2/3 p-5">
            <form method="dialog">
              <button
                onClick={() => {
                  setModalOpen(false);
                }}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>
            <div className="p-8 flex flex-col items-center justify-center">
              <p className="font-bold text-base md:text-xl mb-8">{title}</p>
              <div className="w-full">
                {skillsAcquired.map((skillData) => (
                  <div key={skillData.skill}>
                    <div className="flex items-center justify-between">
                      <div className="form-control">
                        <label className="cursor-pointer label">
                          <input
                            type="checkbox"
                            checked={skillData.acquired}
                            className="checkbox checkbox-accent"
                            onChange={() => {
                              handleSkillAcquiredChange(skillData, title);
                              // setCurrentCoursePercentage((skills.filter(skill => skill.acquired === true)).length / skills.length * 100)
                            }}
                          />
                        </label>
                      </div>
                      <div className="w-full ml-3">{skillData.skill}</div>
                    </div>
                    <div className="divider divider-accent"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
