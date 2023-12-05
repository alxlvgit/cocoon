import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

function Home() {
  return (
    <>
      <div>
        <div>
          <Image
            src="/assets/AdobeStock_621566683.jpeg"
            alt="Cocoon Landing Page Photo"
            layout="fill"
            objectFit="cover"
            className="filter brightness-50"
          />
        </div>
        <div className="grid mx-14 lg:mx-1 md:p-10	lg:grid-cols-[2fr_2fr] ">
          <div>
            <h1 className=" text-white font-bold max-w-[40rem] leading-[90%] tracking-[-2px] pb-3 self-start animate-fade-up animate-duration-[2000ms] animate-normal animate-fill-forwards pt-10 lg:pt-20">
              <span className="text-6xl md:text-8xl underline decoration-sky-500 ">
                Cocoon
              </span>
              <span className="text-5xl md:text-6xl">
                {" "}
                guides you to a brighter tomorrow.
              </span>
            </h1>
            <div className="relative pt-8">
              <Link
                href="/home"
                className="relative inline-flex items-center justify-center p-4 px-2 md:px-6 py-1 md:py-1 overflow-hidden font-medium transition duration-300 ease-out border-2 rounded-lg shadow-md group border-white"
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
                <span className="md:text-xl absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                  Start Now
                </span>
                <span className="text-xl relative invisible">Start Now</span>
              </Link>
            </div>
          </div>

          <div className="text-base text-white leading-[150%] self-end animate-fade-left animate-duration-[2000ms]  animate-normal animate-fill-forwards grid  xl:relative xl:bottom-28">
            <div className="pt-10 w-full lg:pt-40 transition-transform transform justify-center items-center animate-fade">
              <video
                autoPlay
                muted
                loop
                playsInline
                controls
                src="/assets/TechDemoCocoon.mp4"
              ></video>
            </div>
          </div>
        </div>

        <div className="lg:w-6/7 flex flex-col md:p-5 lg:p-10 transition-transform transform justify-center md:justify-between items-center pt-72 lg:pt-40 drop-shadow-[0_35px_35px_rgba(0,0,0,0.30)]">
          <div className="animate-fade-left p-7 w-4/5 bg-[#494949] min-h-auto md:h-80 relative bottom-40 sm:bottom-32 md:bottom-12 lg:bottom-40 rounded-2xl">
            <h3 className="text-white font-semibold text-xl">About Cocoon</h3>
            <div>
              <Image
                alt="About Cocoon"
                height={450}
                width={250}
                className="float-right relative rounded-lg bottom-20 ml-4 drop-shadow-xl hidden lg:block"
                src="/assets/about-cocoon.jpg"
              />
              <br />
              <p className="text-gray-200 text-sm">
                Introducing Cocoon, your personalized gateway to a tailored and
                successful career path. Cocoon is a cutting-edge application
                that harnesses the power of artificial intelligence to
                revolutionize the way individuals navigate their professional
                journeys. By seamlessly scanning and analyzing resumes, Cocoon
                intelligently matches an individual&apos;s skills with their
                chosen career, ensuring a perfect synergy between aspirations
                and qualifications.{" "}
              </p>
              <br />
              <p className="text-gray-200 text-sm">
                {" "}
                What sets Cocoon apart is its proactive approach to career
                development. Not only does it identify existing skills, but it
                also highlights any gaps that may hinder one&apos;s eligibility
                for their desired industry. Recognizing the dynamic nature of
                the job market, Cocoon takes the initiative to recommend
                targeted courses and programs. These personalized suggestions
                empower users to acquire the necessary skills and knowledge,
                bridging the gap between their current capabilities and the
                requirements of their chosen field.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
