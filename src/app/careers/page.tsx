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
    <>
      <div>
        <h1 className="m-5 text-center">
          Career options for a person interested in UX/UI Design
        </h1>
      </div>
      <div className="grid gap-4 justify-center grid-cols-4 w-3/4 m-auto mt-10 auto-rows-fr">
        {careersData.map((career: any) => (
          <CareerTile key={career.code} career={career} />
        ))}
      </div>
    </>
  );
}

export default Careers;
