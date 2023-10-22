"use client";

interface Schedule {
  Date: string;
  Day: string;
  Time: string;
  Location: string;
}

interface Offerings {
  CRN: string;
  Duration: string;
  Tuition: string;
  Schedule: Schedule[];
  Instructor: string;
  Status: string;
}

interface CourseProps {
  CourseCode: string;
  CourseName?: string;
  title?: string;
  Terms: string[];
  Campus: string[];
  Offerings: Offerings[];
}

function calculateAverageTuition(offerings: Offerings[]): number | null {
  if (offerings.length === 0) {
    return null; // Return null for an empty array
  }

  const totalTuition = offerings.reduce((sum, offering) => {
    // Extract the numeric value from the Tuition string and add it to the sum
    const tuitionValue = parseFloat(offering.Tuition.replace("$", ""));
    return sum + tuitionValue;
  }, 0);

  // Calculate the average tuition
  const averageTuition = Number((totalTuition / offerings.length).toFixed(2));

  return averageTuition;
}

function calculateAverageDuration(offerings: Offerings[]): string | null {
  if (offerings.length === 0) {
    return null; // Return null for an empty array
  }

  const totalWeeks = offerings.reduce((sum, offering) => {
    const match = offering.Duration.match(/\((\d+) weeks\)/);
    const weeks = match ? parseInt(match[1], 10) : 0;
    return sum + weeks;
  }, 0);

  const averageWeeks = Math.round(totalWeeks / offerings.length);
  return `${averageWeeks} weeks`;
}

export default function Course({ courseProps }: { courseProps: CourseProps }) {
  let termString = "";
  termString = courseProps.Terms?.join(", ") || "N/A";

  return (
    <div className="flex flex-col bg-blue-200 rounded-lg m-3">
      <h2 className="m-3 font-bold">
        {courseProps.CourseName ? courseProps.CourseName : courseProps.title}
      </h2>
      <div className="flex flex-row justify-between m-3">
        <p>
          Average cost:{" "}
          {courseProps.Offerings
            ? calculateAverageTuition(courseProps.Offerings)
            : "N/A"}
        </p>
        <p>
          Average time:
          {courseProps.Offerings
            ? calculateAverageDuration(courseProps.Offerings)
            : "N/A"}
        </p>
      </div>
      <p className="m-3">Terms: {termString}</p>
    </div>
  );
}
