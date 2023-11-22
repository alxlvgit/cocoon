import Link from "next/link";

export default function About() {
  return (
    <div className="flex flex-col m-4 items-center">
      <div className="pb-8 ">
        <p className="text-3xl font-bold justify-center flex animate-fade-down animate-once">
          For All person who wants to find other way to move
        </p>
      </div>

      <div className="pb-8 w-screen bg-356CBE flex flex-col items-center p-10 transition-transform transform hover:shadow-lg">
        
        <div className="pt-5 max-w-lg p-6 pb-5 flex flex-col justify-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <p className="mb-3 font-normal pb-3 text-gray-700 dark:text-gray-400">
            For all the people who believe they deserve second chances or seek
            their unlimited potential, Futurequest is a career development app
            that guides users to take opportunities to set foot in various
            career paths with their current experience and skills, unlike
            traditional job/career hunting services. Our services and brand
            promises to present users with a vision of potential versions of
            themselves through detailed timelines and information of career
            paths and industries.
          </p>
          <Link
            href="/careers"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Start Now
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
