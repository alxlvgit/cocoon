function Home() {
  return (
    <main>
      <div className="grid grid-cols-1 px-16 lg:grid-cols-[3fr_1fr] py-12">
        <h1 className="text-3xl md:text-8xl  font-bold max-w-[40rem] leading-[90%] tracking-[-2px] pb-3 self-start animate-fade-up animate-duration-[2000ms] animate-delay-500 animate-normal animate-fill-forwards">
          Guide you to a{" "}
          <span className="underline decoration-sky-500 ">brighter </span>
          tomorrow.
        </h1>
        <div className="text-base leading-[150%] self-end animate-fade-left animate-duration-[2000ms] animate-delay-500 animate-normal animate-fill-forwards">
          When uncertain about career choices, remember that{" "}
          <span className="highlight bg-sky-500/30">COCOON</span> is here for
          you. It's a dependable compass, guiding you towards new beginnings in
          your professional journey.
        </div>
      </div>

      <div className="pb-8 w-full bg-356CBE flex flex-co p-10 transition-transform transform hover:shadow-lg justify-center items-center">
        <video
          autoPlay
          muted
          loop
          playsInline
          controls
          src="/assets/Ai-generatedCocoonIntro.mp4"
        ></video>
      </div>
    </main>
  );
}

export default Home;
