import { setCurrentPath } from "@/redux/features/pathSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";


const PathContainer = ({
  pathData: pathName,
  onMouseEnter,
  onMouseLeave,
  hoveredPath,
  pathType,
}: {
  pathData: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  hoveredPath: string | null;
  pathType: string;
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const setMyCurrentPath = () => {
    dispatch(setCurrentPath(pathName));
    router.push("/profile");
  };

  return (
    <div
      className="flex flex-col w-full hover:bg-indigo-200 rounded-lg p-6"
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={() => onMouseLeave()}
    >
      <h1 className="text-xs md:text-base lg:text-lg text-left font-bold mt-3 w-full">
        {pathType} Path:
      </h1>
      <p className="text-xs md:text-base lg:text-lg text-left w-full">
        {pathName}
      </p>

      {hoveredPath === pathName && (
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
