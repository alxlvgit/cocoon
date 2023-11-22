import CareerInfo from "./CareerInfo";
import CareerOutlook from "./CareerOutlook";
import SalaryDetails from "./SalaryDetails";
import * as odotnet from "@/app/api/odotnet/fetch-api";
import * as enums from "@/app/api/odotnet/enums";

type CareerDetails = {
  title: string;
  what_they_do: string;
  on_the_job: { task: string };
};

const AllCareerData = async ({ careerCode }: { careerCode: string }) => {
  const careerOverview = await odotnet.odotnetCareerOverview(careerCode);
  const career: CareerDetails = careerOverview?.career;
  const careerOutlookData = await odotnet.odotnetCareerOverview(
    careerCode,
    enums.CareerSection.JobOutlook
  );

  const outlook = careerOutlookData.outlook
    ? [
        careerOutlookData.outlook?.category || "N/A",
        careerOutlookData.outlook?.description || "N/A",
      ]
    : null;

  const brightOutlook = careerOutlookData.bright_outlook
    ? [
        careerOutlookData.bright_outlook?.category[0],
        careerOutlookData.bright_outlook?.description,
      ]
    : null;

  return (
    <>
      <h1 className="font-semibold text-lg mb-3 md:col-span-2 text-center">
        {career.title}
      </h1>
      <SalaryDetails careerOutlook={careerOutlookData} />
      <CareerInfo title={"Who they are"} whatTheyDo={career.what_they_do} />
      {outlook && (
        <CareerOutlook careerOutlook={outlook} brightOutlook={brightOutlook} />
      )}
      <CareerInfo title={"What they do"} whatTheyDo={career.on_the_job.task} />
    </>
  );
};

export default AllCareerData;
