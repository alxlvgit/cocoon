export default function JobDetailContainer({
  title,
  data,
  additionalData,
  button,
}: {
  title: string;
  data: string | string[];
  additionalData?: string[];
  button?: boolean;
}) {
  if (additionalData && additionalData.length > 0) {
    return (
      <div className="bg-blue-100 col-span-2 p-10 rounded-md shadow-md flex flex-col items-center">
        <div>
          <h1 className="font-semibold text-base mb-3">Career Outlook</h1>
        </div>
        <div>
          <ol className="text-sm">
            <li className="font-semibold">Future Status: {data[0]}</li>
            <li>{data[1]}</li>
            <br />
            <li className="font-semibold">
              Future Status: {additionalData[0]}
            </li>
            <li>{additionalData[1]}</li>
          </ol>
        </div>
      </div>
    );
  }

  if (button) {
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

  return (
    <div className="bg-blue-100 p-10  col-span-2 rounded-md shadow-md flex flex-col items-center">
      <div>
        <h1 className="font-semibold text-base mb-3">{title}</h1>
      </div>
      <div>
        <p className="text-sm">{data}</p>
      </div>
    </div>
  );
}
