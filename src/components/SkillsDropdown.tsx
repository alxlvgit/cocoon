import { setCompletedSkills } from "@/redux/features/pathSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useState } from "react";

interface SkillDropdownProps {
  skill: string;
}

const SkillsDropdown: React.FC<SkillDropdownProps> = ({
  skill,
}: {
  skill: string;
}) => {
  const [status, setStatus] = useState("Start Soon");
  const dispatch = useAppDispatch();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    dispatch(setCompletedSkills({ skill, status: e.target.value }));
  };

  return (
    <select value={status} onChange={handleStatusChange} className="ml-2">
      <option value="Start Soon">Start Soon</option>
      <option value="In Progress">In Progress</option>
      <option value="Completed">Completed</option>
    </select>
  );
};

export default SkillsDropdown;
