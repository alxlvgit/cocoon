export default function CareerOutlook({
  careerOutlook,
  brightOutlook,
}: {
  careerOutlook: string[];
  brightOutlook: string[] | null;
}) {
  return (
    <div className="bg-bright-main p-10 rounded-3xl	 shadow-md flex flex-col">
      <div className="flex items-center justify-center w-full mb-4">
        <h1 className="font-semibold text-lg text-center">Career Outlook</h1>
      </div>
      <div>
        <div className="flex flex-col mb-10">
          {careerOutlook[0] === "Bright" && (
            <span className="text-sm text-white text-center font-bold bg-green-500 mb-10 py-2 rounded-full w-36 ml-40">
              Bright Outlook
            </span>
          )}
          {careerOutlook[0] === "Average" && (
            <span className="text-sm text-white text-center font-bold bg-yellow-500 mb-2 px-2 py-2 rounded-full">
              Average Outlook
            </span>
          )}
          {careerOutlook[0] === "Below Average" && (
            <span className="text-sm text-white text-center font-bold bg-red-500 mb-2 px-2 py-2 rounded-full">
              Below Average Outlook
            </span>
          )}
          <p className="text-sm ">{careerOutlook[1]}</p>
        </div>
        {brightOutlook && (
          <>
            <p className="font-medium">
              Bright Outlook Category: {brightOutlook[0]}
            </p>
            <p className="text-sm">{brightOutlook[1]}</p>
          </>
        )}
      </div>
    </div>
  );
}
