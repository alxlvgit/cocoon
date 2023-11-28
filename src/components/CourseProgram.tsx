import Link from "next/link";

export default function CourseProgram({
  title,
  link,
  type,
}: {
  title: string;
  link: string;
  type: string;
}) {
  return (
    <div className="group flex flex-col sm:gap-0 sm:flex-row w-full justify-between items-center align-middle mb-2 bg-bright-main rounded-lg p-4 sm:p-9">
      <h1 className="text-sm w-5/6 sm:w-2/3 font-medium">{title}</h1>
      <div className="w-3/4 sm:w-1/4 flex sm:justify-end mt-2 sm:mt-0 justify-center items-center">
        <Link
          className="px-3 py-1 border border-gray-400 rounded-lg shadow hover:bg-white bg-button-bg  w-fit text-xs text-center"
          href={type === "Udemy" ? "https://www.udemy.com" + link : link}
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 22 22"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-3 h-3 inline mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>{" "}
          View Details
        </Link>
      </div>
    </div>
  );
}
