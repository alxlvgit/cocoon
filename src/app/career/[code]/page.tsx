import * as odotnet from "@/app/api/odotnet/fetch-api";
import * as enums from "@/app/api/odotnet/enums";

import SalaryDetails from "@/components/SalaryDetails";
import CareerOutlook from "@/components/CareerOutlook";
import CareerInfo from "@/components/CareerInfo";
import StartAnalysisContainer from "@/components/StartAnalysisContainer";

type CareerDetails = {
  title: string;
  what_they_do: string;
  on_the_job: { task: string };
};

export default async function Career({ params }: { params: { code: string } }) {
  const careerOverview = await odotnet.odotnetCareerOverview(params.code);
  const career: CareerDetails = careerOverview?.career;
  const careerOutlookData = await odotnet.odotnetCareerOverview(
    params.code,
    enums.CareerSection.JobOutlook
  );
  console.log(careerOutlookData);

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
    <div className="grid grid-cols-4 gap-4 max-w-5xl mx-auto pb-8">
      <h1 className="font-semibold text-lg mb-3 col-span-4 text-center">
        {career.title}
      </h1>
      <CareerInfo title={"Who they are"} whatTheyDo={career.what_they_do} />

      {outlook && (
        <CareerOutlook careerOutlook={outlook} brightOutlook={brightOutlook} />
      )}

      <CareerInfo title={"What they do"} whatTheyDo={career.on_the_job.task} />

      <SalaryDetails careerOutlook={careerOutlookData} />

      <StartAnalysisContainer
        title={"Start Analysis"}
        data={
          "This analysis will help define your skills better match you with the best job/career with current applicable skills! "
        }
        careerCode={params.code}
      />
    </div>
  );
}
