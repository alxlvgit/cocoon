import * as odotnet from "@/app/api/odotnet/fetch-api";
import * as enums from "@/app/api/odotnet/enums";
import CareerDetails from "@/components/CareerDetails";
import React from "react";

const Career = async ({ params }: { params: { code: string } }) => {
  // Fetch individual career data
  const careerDetails = await odotnet.odotnetCareerOverview(params.code);
  const careerOutlook = await odotnet.odotnetCareerOverview(
    params.code,
    enums.CareerSection.JobOutlook
  );
  //   console.log(careerOutlook, "careerOutlook");

  const careerData = careerDetails.career;
  //   console.log(careerData, "careerData");

  return (
    <>
      <div>
        <h1 className="m-5 text-center">
          Career options for a person interested in UX/UI Design
        </h1>
      </div>
      <div className="w-full">
        <CareerDetails career={careerData} careerOutlook={careerOutlook} />
      </div>
    </>
  );
};

export default Career;
