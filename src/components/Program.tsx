import { ProgramProps } from "../programs-data/interfaces";

export default function Program({
  programProps,
}: {
  programProps: ProgramProps;
}) {
  const intakeString = programProps.Intakes
    ? programProps.Intakes.join(", ")
    : "N/A";
  const tuition = programProps.TuitionDomestic
    ? programProps.TuitionDomestic
    : programProps.Tuition && typeof programProps.Tuition === "string"
    ? programProps.Tuition
    : "N/A";

  return (
    <div className="flex flex-col bg-blue-200 rounded-lg m-3">
      <h2 className="m-3 font-bold">{programProps.ProgramName}</h2>
      <div className="flex flex-row justify-between m-3">
        <p>Tuition Domestic: {tuition}</p>
        <p>Degree: {programProps.Degree}</p>
      </div>
      <p className="m-3">Intakes: {intakeString}</p>
    </div>
  );
}
