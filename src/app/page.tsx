import Image from "next/image";
import Link from "next/link";

function Home() {
  return (
    <div>
      <div className="grid grid-cols-1 px-16 lg:grid-cols-[3fr_1fr] py-12">
        <Image
          src="/assets/AdobeStock_621566683.jpeg"
          alt="Cocoon Landing Page Photo"
          layout="fill"
          objectFit="cover"
          className="filter brightness-50"
        />
      </div>
      <div className="grid grid-cols-1 px-16 lg:grid-cols-[3fr_1fr] py-12">
        <h1 className="text-3xl md:text-8xl text-white font-bold max-w-[40rem] leading-[90%] tracking-[-2px] pb-3 self-start animate-fade-up animate-duration-[2000ms] animate-normal animate-fill-forwards">
          Guide you to a{" "}
          <span className="underline decoration-sky-500 ">brighter </span>
          tomorrow.
        </h1>
        <div className="text-base text-white leading-[150%] self-end animate-fade-left animate-duration-[2000ms]  animate-normal animate-fill-forwards grid grid-rows-2">
          <div>
            <Link
              href="/home"
              className="inline-flex px-3 py-4 md:px-6 md:py-5 text-center items-center justify-center text-base md:text-xl lg:text-3xl font-medium text-white bg-sky-500 rounded-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-5 md:m-3"
            >
              Start Now
              <svg
                className="w-3.5 h-3.5 ml-1.5"
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

          <div>
            When uncertain about career choices, remember that{" "}
            <span className="highlight bg-sky-500/30">COCOON</span> is here for
            you. It&apos;s a dependable compass, guiding you towards new
            beginnings in your professional journey.
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 bg-white pt-10">
        <div className="pb-8 w-full flex flex-co p-10 transition-transform transform justify-center items-center animate-fade">
          <video
            autoPlay
            muted
            loop
            playsInline
            controls
            src="/assets/Ai-generatedCocoonIntro.mp4"
          ></video>
        </div>
        <div className="m-3 w-6/7 h-5/6 flex flex-co p-10 transition-transform transform justify-center items-center pt-10 lg:pt-40">
          <div className="animate-fade-left bg-white p-7">
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
            parties. In an era where job markets are rapidly evolving,
            Cocoon&apos;s AI-driven approach ensures that individuals can
            seamlessly transition into new roles and contribute their skills to
            companies seeking top talent.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
