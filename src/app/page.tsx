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
        <div className="grid mx-14 lg:mx-1 md:p-10 h-96	lg:grid-cols-[2fr_2fr] ">
          <div>
            <h1 className=" text-white font-bold max-w-[40rem] leading-[90%] tracking-[-2px] pb-3 self-start animate-fade-up animate-duration-[2000ms] animate-normal animate-fill-forwards">
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
                href="/profile"
                className="relative inline-flex items-center justify-center p-4 px-3 md:px-6 py-2 md:py-3 overflow-hidden font-medium transition duration-300 ease-out border-2 rounded-full shadow-md group border-white"
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
                <span className="md:text-lg absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                  Start Now
                </span>
                <span className="text-lg relative invisible">Start Now</span>
              </Link>
            </div>
          </div>

          <div className="text-base text-white leading-[150%] self-end animate-fade-left animate-duration-[2000ms]  animate-normal animate-fill-forwards grid  xl:relative xl:bottom-28">
            <div className="pb-8 w-full p-10 transition-transform transform justify-center items-center animate-fade">
              <video
                autoPlay
                muted
                loop
                playsInline
                controls
                src="/assets/Ai-generatedCocoonIntro.mp4"
              ></video>
            </div>
          </div>
        </div>

        <div className="lg:w-6/7 flex flex-col md:p-5 lg:p-10 transition-transform transform justify-center md:justify-between items-center pt-72 lg:pt-40 drop-shadow-[0_35px_35px_rgba(0,0,0,0.30)]">
          <div className="animate-fade-left p-7 w-4/5 bg-[#494949] min-h-auto md:h-80 relative bottom-40 sm:bottom-32 md:bottom-12 lg:bottom-11 rounded-2xl">
            <h3 className="text-white font-semibold text-xl">About Cocoon</h3>
            <div>
              <img
                height={450}
                width={250}
                className="float-right relative rounded-lg bottom-20 ml-4 drop-shadow-xl hidden lg:block"
                src="/assets/about-cocoon.jpg"
              />
              <p className="text-gray-200 text-sm">
                Cocoon, a pioneering AI-driven company, is revolutionizing the
                job search and recruitment landscape by harnessing the power of
                artificial intelligence. By meticulously scanning resumes and
                extracting essential skills, Cocoon is empowering individuals to
                find their dream jobs while assisting companies in discovering
                the ideal candidates. This innovative platform efficiently
                matches job seekers with career opportunities that align with
                their expertise, experience, and aspirations. By using AI to
                bridge the gap between job seekers and employers, Cocoon not
                only streamlines the job hunt process but also enhances the
                chances of a perfect fit for both parties. In an era where job
                markets are rapidly evolving, Cocoon&apos;s AI-driven approach
                ensures that individuals can seamlessly transition into new
                roles and contribute their skills to companies seeking top
                talent.
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
