//@ts-nocheck

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function SkillsMatchInfo({
  skillsMatched,
  positionTitle,
}: {
  skillsMatched: number;
  positionTitle: string;
}) {
  const data = {
    labels: ["Matched", "Unmatched"],
    datasets: [
      {
        label: "Skill Analysis",
        data: [skillsMatched, 100 - skillsMatched],
        backgroundColor: ["#DBC2CF", "#D0F0F6"],
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
        color: "#FFFFFF",
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
      ctx.fillStyle = "#FFFFFF";
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
    <div className="bg-main-bg h-full w-full rounded-2xl mx-auto p-4 text-center align-middle items-center justify-center grid grid-cols-1 md:grid-cols-2 shadow-xl pb-8">
      <h1 className="m-5 text-center font-bold md:col-span-2 text-lg mb-8">
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
        <p className="text-black text-base font-bold md:text-lg">
          You are a{" "}
          <span className="font-bold text-gray-900 dark:text-white decoration-blue-500 decoration-double">
            {skillsMatched}%
          </span>{" "}
          match with
        </p>
        <p className="font-bold text-base  md:text-lg">
          <span className="font-bold text-gray-900 dark:text-white decoration-sky-500 decoration-wavy">
            {positionTitle}
          </span>
        </p>
        <p className="text-black text-xs mt-3">
          You currently already acquire {skillsMatched}% of the skills required
          to be certified. Looks like you need a few more to get going. Below is
          an overview of what skills are required to become fully qualified for
          a {positionTitle} career.
        </p>
      </div>
    </div>
  );
}
