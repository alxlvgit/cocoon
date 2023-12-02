export default function CareerOutlook({
  careerOutlook,
  brightOutlook,
}: {
  careerOutlook: string[];
  brightOutlook: string[] | null;
}) {
  console.log(careerOutlook);
  return (
    <div className="bg-bright-main p-10 rounded-3xl	 shadow-md flex flex-col">
      <div className="flex items-center justify-center w-full mb-4">
        <h1 className="font-semibold text-lg text-center">Career Outlook</h1>
      </div>
      <div>
        <div className="flex flex-col mb-10">
          {careerOutlook[0] === "Bright" && (
            <div
              className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 text-center"
              role="alert"
            >
              <p className="font-bold">Bright Outlook</p>
              <p className="text-sm">{careerOutlook[1]} </p>
            </div>
          )}
          {careerOutlook[0] === "Average" && (
            <div
              className="bg-green-100 border-t border-b border-green-500 text-green-700 px-4 py-3 text-center"
              role="alert"
            >
              <p className="font-bold">Average Outlook</p>
              <p className="text-sm">{careerOutlook[1]} </p>
            </div>
          )}
          {careerOutlook[0] === "Below Average" && (
            <div
              className="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3 text-center"
              role="alert"
            >
              <p className="font-bold">Below Outlook</p>
              <p className="text-sm">{careerOutlook[1]} </p>
            </div>
          )}
        </div>
        {brightOutlook && (
          <div className="text-center">
            <p className="font-medium">
              Bright Outlook Category: {brightOutlook[0]}
            </p>
            <p className="text-sm">{brightOutlook[1]}</p>
          </div>
        )}
      </div>
    </div>
  );
}
