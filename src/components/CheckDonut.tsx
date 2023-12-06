//@ts-nocheck

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useAppSelector } from "@/redux/hooks";
ChartJS.register(ArcElement, Tooltip, Legend); 
import { useState, useEffect } from "react";
import SkillsModal from "./SkillsModal";
import {
    CourseWithSkills,
    PathSkill,
    ProgramWithSkills,
    UdemyCourseWithSkills,
} from "@/redux/features/pathSlice";

interface CheckDonutCourseProps {
    val: string;
    currentPathCoursesAndPrograms: ProgramWithSkills | CourseWithSkills | UdemyCourseWithSkills;
}
export default function CheckDonutCourse({val, currentPathCoursesAndPrograms }: CheckDonutCourseProps) {
    const [currentCoursePercentage, setCurrentCoursePercentage] = useState(0)
    const data = {
        labels: ["Completed", "Uncompleted"],
        datasets: [
            {
                label: "Course Completed",
                data: [currentCoursePercentage, 100 - currentCoursePercentage],
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
                text: `${currentCoursePercentage}%`,
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

        afterRender(chart: { getDatasetMeta?: any; ctx?: any; }, args: any, pluginOptions: any) {
            const { ctx } = chart;
            ctx.save();
            ctx.font = "bolder 25px sans-serif";
            ctx.fillStyle = "#FFFFFF";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            ctx.fillText(
                `${currentCoursePercentage}%`,
                chart.getDatasetMeta(0).data[0].x,
                chart.getDatasetMeta(0).data[0].y
            );
        },
    };

    const [isModalOpen, setModalOpen] = useState(false);


    const handleCourseSelect = (title: string, skills: PathSkill[]) => {
        // setSelectedCourse({
        //     title,
        //     skills,
        // });
        setModalOpen(true);
    };


    return (
        <>
            <p>{currentCoursePercentage}</p>
            {/* <p>val:{JSON.stringify(currentPathCoursesAndPrograms.skills.filter(skill => skill.acquired === true))}</p> */}
            <SkillsModal
                key={val || ""}
                title={val || ""}
                skills={currentPathCoursesAndPrograms.skills || []}
                open={isModalOpen}
                setModalOpen={setModalOpen}
                setCurrentCoursePercentage={setCurrentCoursePercentage}
                />
            <div
                key={val}
                className="bg-main-bg p-5 md:p-8 w-full relative h-full gap-6 rounded-lg drop-shadow-md place-self-center flex flex-col justify-between items-center"
            >
                <div className="text-black h-2/3 place-content-center">
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3"></div>
                    <p className="mt-6">{val}</p>
                </div>
                <div className="w-full h-full flex items-center justify-center pb-5">
                    <Doughnut
                        key={val}
                        data={data}
                        options={options}
                        plugins={[textCenter]}
                    ></Doughnut>
                </div>


                <button
                    className="h-fit px-3 py-1 border border-gray-400 rounded-lg shadow place-self-center hover:bg-white bg-button-bg w-fit text-xs text-center hover:cursor-pointer"
                    onClick={() =>
                        handleCourseSelect(
                            val,
                            currentPathCoursesAndPrograms.skills
                        )
                    }
                >
                    View Skills
                </button>
            </div>
        </>
    )
}