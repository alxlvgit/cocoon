import Link from "next/link";

function Home() {
  return (
    <div className="flex flex-col m-4 items-center">
      <div className="pb-8 ">
        <p className="text-3xl font-bold justify-center flex animate-fade-down animate-once">
          A new future within your grasp
        </p>
      </div>
      <div className="pb-8 justify-center flex">
        <Link
          href="/careers"
          className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium  transition duration-300 ease-out border-2  rounded-full shadow-md group"
        >
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-300 group-hover:translate-x-0 ease">
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
          <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease">
            Start Now
          </span>
          <span className="relative invisible">Start Now</span>
        </Link>
      </div>
      <div className="pb-8 w-screen bg-356CBE flex flex-col items-center p-10 transition-transform transform hover:shadow-lg">
        <div className="pt-5 max-w-lg p-6 pb-5 flex flex-col justify-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className=" justify-center flex pb-3 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            How Ai can help you find a new future
          </h5>

          <p className="mb-3 font-normal pb-3 text-gray-700 dark:text-gray-400">
            Cocoon, a pioneering AI-driven company, is revolutionizing the job
            search and recruitment landscape by harnessing the power of
            artificial intelligence. By meticulously scanning resumes and
            extracting essential skills, Cocoon is empowering individuals to
            find their dream jobs while assisting companies in discovering the
            ideal candidates. This innovative platform efficiently matches job
            seekers with career opportunities that align with their expertise,
            experience, and aspirations. By using AI to bridge the gap between
            job seekers and employers, Cocoon not only streamlines the job hunt
            process but also enhances the chances of a perfect fit for both
            parties. In an era where job markets are rapidly evolving, Cocoon's
            AI-driven approach ensures that individuals can seamlessly
            transition into new roles and contribute their skills to companies
            seeking top talent.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
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

export default Home;
