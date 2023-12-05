import * as odotnet from "@/app/api/odotnet/fetch-api";
import * as enums from "@/app/api/odotnet/enums";
import CareerTile from "@/components/CareerTitleTile";

async function Careers() {
  // Fetch careers data for those interested in ux/ui designer
  const fetchResult = await odotnet.odotnetKeyword(
    enums.JobKeyword.UXUIDesigner
  );
  const careersData = fetchResult.career;
  // console.log(careersData, "careersData");

  return (
    <main className="mt-24 sm:mt-24 pb-10 max-w-screen-2xl m-auto">
      <div className="grid grid-cols-3">
        <h1 className="m-10 text-center col-span-3 md:col-span-2 md:place-self-end font-bold text-2xl">
          Make Your Next Step With Us!
        </h1>
        <div className="col-span-3 mx-3 lg:mx-5 md:col-span-1 animate-fade-right animate-once animate-duration-1000 animate-delay-900">
          <div role="alert" className="alert">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>
              Additional careers will be introduced later, but the currently
              showcased options are particularly well-suited for individuals
              with a keen interest in the UX/UI industry.
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:gap-10 justify-center grid-cols-1 xs:grid-cols-2 md:grid-cols-3 w-3/5 xs:w-3/4 m-auto my-10 auto-rows-fr">
        {careersData.map((career: any) => (
          <CareerTile key={career.code} career={career} />
        ))}
      </div>
    </main>
  );
}

export default Careers;
