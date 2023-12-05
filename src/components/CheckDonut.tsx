//@ts-nocheck

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useAppSelector } from "@/redux/hooks";
ChartJS.register(ArcElement, Tooltip, Legend); 
import { useState } from "react";
import SkillsModal from "./SkillsModal";
import {
    CourseWithSkills,
    PathSkill,
    ProgramWithSkills,
    UdemyCourseWithSkills,
} from "@/redux/features/pathSlice";

interface CheckDonutCourseProps {
    currentCoursePercentage: number;
    setCurrentCoursePercentage: React.Dispatch<React.SetStateAction<number>>;
    val: string;
    currentPathCoursesAndPrograms: ProgramWithSkills | CourseWithSkills | UdemyCourseWithSkills;
}
export default function CheckDonutCourse({ currentCoursePercentage, setCurrentCoursePercentage, val, currentPathCoursesAndPrograms }: CheckDonutCourseProps) {
    // const [currentCoursePercentage, setcurrentCoursePercentage] = useState<number>(0)
    
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
    let currentPathCoursesAndProgramss = { "skills": [{ "skill": "develop and test layouts, interfaces, functionality, and navigation menus", "acquired": false }], "course": { "_class": "course", "id": 3227583, "title": "Complete Web & Mobile Designer in 2023: UI/UX, Figma, +more", "url": "/course/complete-web-designer-mobile-designer-zero-to-mastery/", "is_paid": true, "price": "CA$139.99", "price_detail": { "amount": 139.99, "currency": "CAD", "price_string": "CA$139.99", "currency_symbol": "C$" }, "price_serve_tracking_id": "Wc10R-aYSl6FaHvfckXAPQ", "visible_instructors": [{ "_class": "user", "title": "Andrei Neagoie", "name": "Andrei", "display_name": "Andrei Neagoie", "job_title": "Founder of zerotomastery.io", "image_50x50": "https://img-c.udemycdn.com/user/50x50/38516954_b11c_3.jpg", "image_100x100": "https://img-c.udemycdn.com/user/100x100/38516954_b11c_3.jpg", "initials": "AN", "url": "/user/andrei-neagoie/" }, { "_class": "user", "title": "Daniel Schifano", "name": "Daniel", "display_name": "Daniel Schifano", "job_title": "Design Leader and Mentor", "image_50x50": "https://img-c.udemycdn.com/user/50x50/97703786_c953.jpg", "image_100x100": "https://img-c.udemycdn.com/user/100x100/97703786_c953.jpg", "initials": "DS", "url": "/user/daniel-schifano/" }], "image_125_H": "https://img-c.udemycdn.com/course/125_H/3227583_5e75_6.jpg", "image_240x135": "https://img-c.udemycdn.com/course/240x135/3227583_5e75_6.jpg", "is_practice_test_course": false, "image_480x270": "https://img-c.udemycdn.com/course/480x270/3227583_5e75_6.jpg", "published_title": "complete-web-designer-mobile-designer-zero-to-mastery", "tracking_id": "", "locale": { "_class": "locale", "locale": "en_US", "title": "English (US)", "english_title": "English (US)", "simple_english_title": "English" }, "predictive_score": null, "relevancy_score": null, "input_features": null, "lecture_search_result": null, "curriculum_lectures": [], "order_in_results": null, "curriculum_items": [], "headline": "Become a Designer in 2023! Master Mobile and Web Design, User Interface + User Experience (UI/UX Design), HTML, and CSS", "instructor_name": null } }


    return (
        <>
            {/* <p>current: {JSON.stringify(currentPathCoursesAndPrograms)}</p> */}
            {/* <p>val:{val.val}</p> */}
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