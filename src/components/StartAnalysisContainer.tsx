export default function StartAnalysisContainer({
  title,
  data,
}: {
  title: string;
  data: string;
}) {
  return (
    <div className="bg-blue-100 p-10 col-start-2 col-span-2 rounded-md shadow-md flex flex-col items-center">
      <div>
        <h1 className="font-semibold text-base mb-3">{title}</h1>
      </div>
      <div className="pb-3">
        <p className="text-sm">{data}</p>
      </div>
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Click me
        </button>
      </div>
    </div>
  );
}
