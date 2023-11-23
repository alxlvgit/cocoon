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
    <div className="group flex flex-col sm:flex-row w-full hover:cursor-pointer justify-between items-center align-middle mb-2 bg-bright-main rounded-lg p-9">
      <h1 className="text-sm sm:group-hover:w-2/3 w-full font-medium">
        {title}
      </h1>
      <div className="sm:w-1/4 w-full flex sm:justify-end mt-2 sm:mt-0 justify-center items-center">
        <Link
          className="group-hover:block px-3 py-2 border border-gray-400 rounded-lg shadow hover:bg-white bg-button-bg font-medium hidden w-fit text-xs text-center"
          href={type === "Udemy" ? "https://www.udemy.com" + link : link}
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 inline mr-1"
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
