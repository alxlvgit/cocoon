import Link from "next/link";

export default function StartAnalysisContainer({
  title,
  data,
  careerCode,
}: {
  title: string;
  data: string;
  careerCode: string;
}) {
  return (
    <div className="bg-bright-main p-10 rounded-3xl	 shadow-md flex flex-col items-center justify-between md:col-span-2">
      <div>
        <h1 className="font-semibold text-lg mb-3">{title}</h1>
      </div>
      <div className="pb-3">
        <p className="text-sm">{data}</p>
      </div>
      <div className="mt-6">
        <Link
          href={`/uploads/${careerCode}`}
          className="bg-button-bg text-black border font-bold border-gray-500 hover:bg-white py-2 px-8 rounded-lg animate-pulse"
        >
          Start
        </Link>
      </div>
    </div>
  );
}
