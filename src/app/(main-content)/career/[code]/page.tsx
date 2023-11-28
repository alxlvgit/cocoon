import StartAnalysisContainer from "@/components/StartAnalysisContainer";
import AllCareerData from "@/components/AllCareerData";

export default async function Career({ params }: { params: { code: string } }) {
  return (
    <main className=" mt-24 sm:mt-36">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto pb-16 m-3 px-6 w-full">
        <AllCareerData careerCode={params.code} />
        <StartAnalysisContainer
          title={"Start Analysis"}
          data={
            "This analysis will help you determine if you have enough skills to be successful in this career, and if not, what skills you need to work on."
          }
          careerCode={params.code}
        />
      </div>
    </main>
  );
}
