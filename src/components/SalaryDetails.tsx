"use client";

import { useEffect, useRef } from "react";
import Chart, { ChartConfiguration, ChartTypeRegistry } from "chart.js/auto";
import { chartColors, chartLabels } from "../utils/chart-constants";

type CareerOutlook = {
  outlook: {
    category: string;
    description: string;
  };
  bright_outlook: {
    category: string;
    description: string;
  };
  salary: {
    hourly_10th_percentile: number;
    hourly_median: number;
    hourly_90th_percentile: number;
    annual_10th_percentile: number;
    annual_median: number;
    annual_90th_percentile: number;
  };
};

export default function SalaryDetails({
  careerOutlook,
}: {
  careerOutlook: CareerOutlook;
}) {
  const canvasElAnnual = useRef(null);
  const canvasElHourly = useRef(null);

  useEffect(() => {
    if (canvasElAnnual.current) {
      const ctxAnnual: CanvasRenderingContext2D | null = (
        canvasElAnnual.current as HTMLCanvasElement
      ).getContext("2d");

      const gradientAnnual = ctxAnnual!.createLinearGradient(0, 16, 0, 600);
      gradientAnnual.addColorStop(0, chartColors.purple.half);
      gradientAnnual.addColorStop(0.65, chartColors.purple.quarter);
      gradientAnnual.addColorStop(1, chartColors.purple.zero);

      const salaryAnnualData = [
        careerOutlook.salary.annual_10th_percentile,
        careerOutlook.salary.annual_median,
        careerOutlook.salary.annual_90th_percentile,
      ];

      const dataAnnual = {
        labels: chartLabels,
        datasets: [
          {
            backgroundColor: gradientAnnual,
            label: "Annual Salary in $",
            data: salaryAnnualData,
            fill: true,
            borderWidth: 2,
            borderColor: chartColors.purple.default,
            lineTension: 0.2,
            pointBackgroundColor: chartColors.purple.default,
            pointRadius: 3,
          },
        ],
      };

      const configAnnual: ChartConfiguration<
        keyof ChartTypeRegistry,
        number[],
        string
      > = {
        type: "line",
        data: dataAnnual,
      };

      const myLineChartAnnual = new Chart(ctxAnnual!, configAnnual);

      return function cleanup() {
        myLineChartAnnual.destroy();
      };
    }
  }, [careerOutlook]);

  useEffect(() => {
    if (canvasElHourly.current) {
      const ctxHourly: CanvasRenderingContext2D | null = (
        canvasElHourly.current as HTMLCanvasElement
      ).getContext("2d");

      const gradientHourly = ctxHourly!.createLinearGradient(0, 16, 0, 600);
      gradientHourly.addColorStop(0, chartColors.indigo.half);
      gradientHourly.addColorStop(0.65, chartColors.indigo.quarter);
      gradientHourly.addColorStop(1, chartColors.indigo.zero);

      const salaryHourlyData = [
        careerOutlook.salary.hourly_10th_percentile,
        careerOutlook.salary.hourly_median,
        careerOutlook.salary.hourly_90th_percentile,
      ];

      const dataHourly = {
        labels: chartLabels,
        datasets: [
          {
            backgroundColor: gradientHourly,
            label: "Hourly Salary in $",
            data: salaryHourlyData,
            fill: true,
            borderWidth: 2,
            borderColor: chartColors.indigo.default,
            lineTension: 0.2,
            pointBackgroundColor: chartColors.indigo.default,
            pointRadius: 3,
          },
        ],
      };

      const configHourly: ChartConfiguration<
        keyof ChartTypeRegistry,
        number[],
        string
      > = {
        type: "line",
        data: dataHourly,
      };

      const myLineChartHourly = new Chart(ctxHourly!, configHourly);

      return function cleanup() {
        myLineChartHourly.destroy();
      };
    }
  }, [careerOutlook]);

  return (
    <div className="bg-bright-main p-10 rounded-3xl shadow-md flex flex-col items-center overflow-hidden">
      <div>
        <h1 className="font-semibold text-base mb-3 text-lg">Salary</h1>
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
  );
}
