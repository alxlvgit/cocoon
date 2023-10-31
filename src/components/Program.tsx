interface RequiredCourses {
  CourseName: string;
  Credits: number;
}

interface Contact {
  Name: string;
  Role: string;
  Phone: string;
  Email: string;
}

interface Tuition {
  Domestic: {
    twoTerms: string;
    threeTerms: string;
  };
  International: {
    twoTerms: string;
    threeTerms: string;
  };
}

interface ProgramProps {
  ProgramName?: string;
  TuitionDomestic?: string;
  Tuition?: string | Tuition;
  Intakes?: string[];
  Degree?: string;
  RequiredCourses?: RequiredCourses[];
  TotalCredits?: number;
  Delivery?: string;
  Contact?: Contact;
}

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
