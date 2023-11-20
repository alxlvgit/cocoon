import StartAnalysisContainer from "@/components/StartAnalysisContainer";
import AllCareerData from "@/components/AllCareerData";
import { Suspense } from "react";

export default async function Career({ params }: { params: { code: string } }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto pb-8 m-3 px-3 w-full">
      <Suspense
        fallback={
          <div className="mx-auto mt-8 col-span-2 animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 dark:border-white"></div>
        }
      >
        <AllCareerData careerCode={params.code} />
        <StartAnalysisContainer
          title={"Start Analysis"}
          data={
            "This analysis will help define your skills better match you with the best job/career with current applicable skills! "
          }
          careerCode={params.code}
        />
      </Suspense>
    </div>
  );
}
