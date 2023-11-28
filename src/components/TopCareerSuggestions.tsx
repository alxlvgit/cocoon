import { useEffect, useState } from "react";
import * as odotnet from "@/app/api/odotnet/fetch-api";
import * as enums from "@/app/api/odotnet/enums";
import Link from "next/link";

export default function TopCareerSuggestions() {
  const [careersData, setCareersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchResult = await odotnet.odotnetKeyword(
          enums.JobKeyword.UXUIDesigner
        );
        setCareersData(fetchResult.career);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs once after the initial render

  return (
    <>
      <div className="bg-main-bg p-4 shadow-xl rounded-2xl flex-col flex items-center justify-center w-full h-96">
        <p className="font-bold text-lg mb-2 text-center">
          Top career suggestions
        </p>
        <div className="overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 w-full h-full border shadow-lg border-gray-300 rounded-xl px-3 pt-1 pb-3 bg-bright-main">
          {careersData.splice(0, 5).map((career: any) => (
            <div key={career.code} className="bg-blue-200 my-4 p-2 rounded-md">
              <h1>{career.title}</h1>
            </div>
          ))}
        </div>
        <Link
          href={`/careers`}
          className="bg-button-bg hover:bg-white w-fit mt-4 px-8 py-1 text-sm rounded-md border border-gray-600 text-center"
        >
          See More
        </Link>
      </div>
    </>
  );
}
