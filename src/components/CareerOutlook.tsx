export default function CareerOutlook({
  careerOutlook,
  brightOutlook,
}: {
  careerOutlook: string[];
  brightOutlook: string[] | null;
}) {
  return (
    <div className="bg-blue-100 p-10 rounded-md shadow-md flex flex-col items-center">
      <div>
        <h1 className="font-semibold text-base mb-3">Career Outlook</h1>
      </div>
      <div>
        <ol className="text-sm">
          <li className="font-semibold">Future Status: {careerOutlook[0]}</li>
          <li>{careerOutlook[1]}</li>
          <br />

          {brightOutlook && (
            <>
              <li className="font-semibold">
                Future Status: {brightOutlook[0]}
              </li>
              <li>{brightOutlook[1]}</li>
            </>
          )}
        </ol>
      </div>
    </div>
  );
}
