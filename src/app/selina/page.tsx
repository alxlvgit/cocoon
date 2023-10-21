"use client";

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

import JobDetailContainer from "@/components/jobDetailContainter";

import * as fakeDatabase from "@/fakeDatabase";
const odotnet = fakeDatabase.getAllJobData();

export default function page({ params }: { params: { username: string } }) {
  const canvasElAnnual = useRef(null);
  const canvasElHourly = useRef(null);

  const colors = {
    purple: {
      default: "rgba(149, 76, 233, 1)",
      half: "rgba(149, 76, 233, 0.5)",
      quarter: "rgba(149, 76, 233, 0.25)",
      zero: "rgba(149, 76, 233, 0)",
    },
    indigo: {
      default: "rgba(80, 102, 120, 1)",
      half: "rgba(80, 102, 120, 0.5)",
      zero: "rgba(80, 102, 120, 0)",
      quarter: "rgba(80, 102, 120, 0.25)",
    },
  };

  const labels = ["10% of People", "Median", "90% of People"];

  useEffect(() => {
    if (canvasElAnnual.current) {
      //@ts-ignore
      const ctxAnnual = canvasElAnnual.current.getContext("2d");

      const gradientAnnual = ctxAnnual.createLinearGradient(0, 16, 0, 600);
      gradientAnnual.addColorStop(0, colors.purple.half);
      gradientAnnual.addColorStop(0.65, colors.purple.quarter);
      gradientAnnual.addColorStop(1, colors.purple.zero);

      const salaryAnnualData = [
        odotnet.job_outlook.salary.annual_10th_percentile,
        odotnet.job_outlook.salary.annual_median,
        odotnet.job_outlook.salary.annual_90th_percentile,
      ];

      const dataAnnual = {
        labels: labels,
        datasets: [
          {
            backgroundColor: gradientAnnual,
            label: "Annual Salary in $",
            data: salaryAnnualData,
            fill: true,
            borderWidth: 2,
            borderColor: colors.purple.default,
            lineTension: 0.2,
            pointBackgroundColor: colors.purple.default,
            pointRadius: 3,
          },
        ],
      };

      const configAnnual = {
        type: "line",
        data: dataAnnual,
      };
      //@ts-ignore
      const myLineChartAnnual = new Chart(ctxAnnual, configAnnual);

      return function cleanup() {
        myLineChartAnnual.destroy();
      };
    }
  }, [odotnet]);

  useEffect(() => {
    if (canvasElHourly.current) {
      //@ts-ignore
      const ctxHourly = canvasElHourly.current.getContext("2d");

      const gradientHourly = ctxHourly.createLinearGradient(0, 16, 0, 600);
      gradientHourly.addColorStop(0, colors.indigo.half);
      gradientHourly.addColorStop(0.65, colors.indigo.quarter);
      gradientHourly.addColorStop(1, colors.indigo.zero);

      const salaryHourlyData = [
        odotnet.job_outlook.salary.hourly_10th_percentile,
        odotnet.job_outlook.salary.hourly_median,
        odotnet.job_outlook.salary.hourly_90th_percentile,
      ];

      const dataHourly = {
        labels: labels,
        datasets: [
          {
            backgroundColor: gradientHourly,
            label: "Hourly Salary in $",
            data: salaryHourlyData,
            fill: true,
            borderWidth: 2,
            borderColor: colors.indigo.default,
            lineTension: 0.2,
            pointBackgroundColor: colors.indigo.default,
            pointRadius: 3,
          },
        ],
      };

      const configHourly = {
        type: "line",
        data: dataHourly,
      };

      //@ts-ignore
      const myLineChartHourly = new Chart(ctxHourly, configHourly);

      return function cleanup() {
        myLineChartHourly.destroy();
      };
    }
  }, [odotnet]);

  const data = [
    odotnet.job_outlook.bright_outlook.category,
    odotnet.job_outlook.bright_outlook.description,
  ];

  const additionalData = [
    odotnet.job_outlook.outlook.category,
    odotnet.job_outlook.outlook.description,
  ];

  return (
    <div className="grid grid-cols-4 gap-4 max-w-5xl mx-auto pb-8">
      <h1 className="font-semibold text-lg mb-3 col-span-4 text-center">
        {odotnet.career.title}
      </h1>
      <JobDetailContainer
        title={"Who they are"}
        data={odotnet.career.what_they_do}
      />
      <JobDetailContainer
        title={"Career Outlook"}
        data={data}
        additionalData={additionalData}
      />

      <JobDetailContainer
        title={"What they do"}
        data={odotnet.career.on_the_job.task}
      />

      <div className="bg-blue-100 col-span-2 p-10 rounded-md shadow-md flex flex-col items-center overflow-hidden">
        <div>
          <h1 className="font-semibold text-base mb-3">Salary</h1>
        </div>
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <span className="flex flex-col items-center text-sm font-semibold">
              Annual Salary Chart
            </span>
            <canvas
              id="myChartAnnual"
              ref={canvasElAnnual}
              className="mt-2"
              style={{ height: "200px", width: "100%" }}
            />
          </div>
          <div>
            <span className="flex flex-col items-center text-sm font-semibold">
              Hourly Salary Chart
            </span>
            <canvas
              id="myChartHourly"
              ref={canvasElHourly}
              className="mt-2"
              style={{ height: "200px", width: "100%" }}
            />
          </div>
        </div>
      </div>

      <JobDetailContainer
        title={"Start Analysis"}
        data={
          "This analysis will help define your skills better match you with the best job/career with current applicable skills! "
        }
        button={true}
      />
    </div>
  );
}
