//@ts-nocheck
"use client";
import { useState } from "react";
import PathContainer from "./PathContainer";
import "react-circular-progressbar/dist/styles.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { RecommendedPathResult } from "@/app/path/college-path";
import { UdemyCourse } from "@/app/path/online-path";

ChartJS.register(ArcElement, Tooltip, Legend);

const PathsSelection = ({
  skillsMatched,
  positionTitle,
  recommendedPathData: recommendedPath,
  onlineOnlyPath,
}: {
  skillsMatched: number;
  positionTitle: string;
  recommendedPathData: RecommendedPathResult;
  onlineOnlyPath: UdemyCourse;
}) => {
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const data = {
    labels: ["Matched", "Unmatched"],
    datasets: [
      {
        label: "Skill Analysis",
        data: [skillsMatched, 100 - skillsMatched],
        backgroundColor: [
          "rgba(85, 111, 242, 0.9)",
          "rgba(177, 190, 255, 0.6)",
          "rgba(177, 190, 255, 0.2)",
        ],
        borderColor: ["#556ff2", "#B1BEFF"],
        borderWidth: 0,
        hoverOffset: 6,
        shadowOffsetX: 3,
        shadowOffsetY: 3,
        shadowBlur: 20,
        shadowColor: "rgba(0, 0, 0, 0.5)", // Enhanced shadow color
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    cutout: "60%",
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 2000,
      easing: "easeInOutQuart",
    },
    centerLabel: {
      center: {
        text: `${skillsMatched}%`,
        color: "#333",
        fontStyle: "Arial",
        sidePadding: 20,
        minFontSize: 20,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const textCenter = {
    id: "hello",

    afterRender(chart, args, pluginOptions) {
      const { ctx } = chart;

      ctx.save();
      ctx.font = "bolder 25px sans-serif";
      ctx.fillStyle = "#556ff2";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText(
        `${skillsMatched}%`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      );
    },
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center my-5 mx-5 ">
        <div className="grid grid-cols-1 gap-4 m-3 w-full lg:w-1/2">
          <div className="bg-indigo-100 h-full w-full rounded-lg mx-auto p-4 text-center align-middle items-center justify-center grid grid-cols-1 md:grid-cols-2 pb-8">
            <h1 className="m-5 text-center font-bold md:col-span-2 text-lg mb-10">
              {positionTitle}
            </h1>
            <div className="w-full h-full flex items-center justify-center pb-5">
              <Doughnut
                data={data}
                options={options}
                plugins={[textCenter]}
              ></Doughnut>
            </div>
            <div className="place-self-center">
              <p className="text-gray-700 text-base md:text-lg lg:text-xl">
                You are a{" "}
                <span className="font-bold text-gray-900 underline dark:text-white decoration-blue-500 decoration-double">
                  {skillsMatched}%
                </span>{" "}
                match with
              </p>
              <p className="font-bold text-base  md:text-lg lg:text-xl">
                <span className="font-semibold text-gray-900 underline dark:text-white decoration-sky-500 decoration-wavy">
                  {positionTitle}
                </span>
              </p>
            </div>
          </div>
          <div className="bg-indigo-400 h-full w-full rounded-lg mx-auto p-5 text-center grid grid-cols-1  items-center place-items-center justify-between gap-3">
            <div className="bg-indigo-100 h-full w-full rounded-lg mx-auto p-5  text-center grid grid-cols-1 align-middle items-center justify-center ">
              <PathContainer
                pathType="Recommended"
                recommendedPathData={recommendedPath}
                onMouseEnter={() => setHoveredPath("Recommended")}
                onMouseLeave={() => setHoveredPath(null)}
                hoveredPath={hoveredPath}
              />
            </div>
            <div className="bg-indigo-100 h-full w-full rounded-lg mx-auto p-5 text-center grid grid-cols-1 align-middle items-center justify-center">
              <PathContainer
                pathType="Online-Only"
                onlineOnlyPathData={onlineOnlyPath}
                onMouseEnter={() => setHoveredPath("Online-Only")}
                onMouseLeave={() => setHoveredPath(null)}
                hoveredPath={hoveredPath}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PathsSelection;

/*
 <div className="grid grid-cols-1 md:grid-cols-2 pt-14 lg:gap-4 gap-1 ">
              <button
                onClick={() => {
                  handleClick();
                }}
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 mr-2 border border-gray-400 rounded-lg shadow text-sm"
              >
                {/* {showDetails ? "Hide Details" : "Show Details"} */
//</button>
// <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 mr-2 border border-gray-400 rounded-lg shadow text-sm">
//Remove
//</button>
// </div>
