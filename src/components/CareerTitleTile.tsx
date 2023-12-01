import Link from "next/link";

const CareerTile = ({ career }: { career: CareerData }) => {
  return (
    <div className="group mx-auto p-4 w-full lg:w-full max-w-xs justify-center items-center align-middle rounded-2xl bg-custom-gradient relative shadow-custom-shadow cursor-pointer z-30 border-0 text-black hover:bg-custom-gradient-dark">
      <Link
        className="absolute top-0 left-0 w-full h-full lg:hidden"
        href={`/career/${career.code}`}
      ></Link>
      <div className="bg-custom-bg flex flex-col h-full w-full rounded-lg mx-auto p-2 text-center shadow-custom-shadow align-middle items-center justify-center ">
        <div>
          <h1 className="text-md md:text-base  lg:text-lg text-center w-full">
            {career.title}
          </h1>
        </div>

        <div className="hidden lg:flex justify-evenly items-center w-full mt-4">
          <div className="invisible group-hover:visible grid grid-cols-1 justify-center items-center align-middle">
            <Link
              href={`/career/${career.code}`}
              className={` w-fit text-black bg-button-bg text-center hover:bg-button-bg-hover focus:ring-gray-300 font-medium rounded-lg border border-gray-400 text-sm px-5 py-1  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`}
            >
              Show Details
            </Link>
          </div>
          {/* <div className="invisible justify-center items-center align-middle group-hover:visible grid grid-cols-1">
            <Link
              href={`/uploads/${career.code}`}
              className={`group-hover:block hidden w-fit text-black bg-button-bg hover:bg-button-bg-hover focus:ring-gray-300 font-medium rounded-lg border border-gray-400 text-sm px-5 py-1 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`}
            >
              Start
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export type CareerData = {
  code: string;
  title: string;
};

export default CareerTile;
