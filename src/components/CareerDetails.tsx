const CareerDetails = ({
  career,
  careerOutlook,
}: {
  career: CareerDetails;
  careerOutlook: CareerOutlook;
}) => {
  return (
    <>
      <div className="flex flex-col m-auto border border-gray-300 shadow-lg w-1/2 p-6 rounded-lg">
        <h1 className="text-center text-lg font-semibold">{career.title}</h1>
        <h2 className="text-center text-sm font-semibold m-2">
          {" "}
          What they do{" "}
        </h2>
        <p className="text-sm">{career.what_they_do}</p>
        <h2 className="text-center text-sm font-semibold m-2">
          {" "}
          On the job tasks
        </h2>
        <p className="text-sm">{career.on_the_job.task}</p>
        <h2 className="text-center text-sm font-semibold m-2"> Job outlook </h2>
        <p className="text-sm">{careerOutlook?.outlook?.description}</p>
        <p className="text-sm">
          Salary: ${careerOutlook?.salary?.annual_median}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center align-middle">
        <p className="text-center text-lg font-semibold m-2 w-1/2">
          {" "}
          Run analysis to find out about transferable and missing skills, and
          what courses to take. Possibly send the user to the resume upload
          page.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Start Search Analysis
        </button>
      </div>
    </>
  );
};

export type CareerDetails = {
  title: string;
  what_they_do: string;
  on_the_job: {
    task: string[];
  };
};

export type CareerOutlook = {
  outlook: {
    description: string;
  };
  salary: {
    annual_median: number;
  };
};

export default CareerDetails;
