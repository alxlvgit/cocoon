"use client"
import Course from '@/components/Course';
import Program from '@/components/Program';
import React, { useState } from 'react';

// sample course & program data for testing props
const course = {
    "CourseCode": "GDES 1069",
    "CourseName": "Layout: Adobe InDesign",
    "Terms": [
        "Fall",
        "Winter",
        "Spring"
    ],
    "Campus": [
        "Downtown",
        "Online"
    ],
    "Offerings": [
        {
            "CRN": "50134",
            "Duration": "Sat Sep 16 - Sat Dec 16(11 weeks)",
            "Tuition": "$575.20",
            "Schedule": [
                {
                    "Date": "Sep 16 - Dec 16",
                    "Day": "Sat",
                    "Time": "09:30 - 12:45",
                    "Location": "Online"
                }
            ],
            "Instructor": "Negin Etemadi",
            "Status": "IN PROGRESS"
        },
        {
            "CRN": "50125",
            "Duration": "Tue Sep 12 - Tue Nov 28(12 weeks)",
            "Tuition": "$602.31",
            "Schedule": [
                {
                    "Date": "Sep 12 - Nov 28",
                    "Day": "Tue",
                    "Time": "18:00 - 21:00",
                    "Location": "DowntownDTC Rm. 890"
                }
            ],
            "Instructor": "Paul Sawyer",
            "Status": "IN PROGRESS"
        }
    ]
};

const program = {
    "ProgramName": "Digital Photography",
    "TuitionDomestic": "$2,100*",
    "Intakes": [
        "January",
        "April",
        "September"
    ],
    "Degree": "Statement of Completion",
    "RequiredCourses": [
        {
            "CourseName": "Raster Graphics: Adobe Photoshop",
            "Credits": 3.0
        },
        {
            "CourseName": "Photography 1",
            "Credits": 1.5
        },
        {
            "CourseName": "Digital Darkroom",
            "Credits": 1.5
        },
        {
            "CourseName": "Photography 2",
            "Credits": 1.5
        }
    ],
    "TotalCredits": 7.5,
    "Delivery": "Blended",
    "Contact": {
        "Name": "Gabriela Silva-Paula",
        "Role": "Program Assistant, Digital Arts",
        "Phone": "604-432-8248",
        "Email": "Gabriela_SilvaPaula@bcit.ca"
    }
};

export default function Career() {
    const [selectedButton, setSelectedButton] = useState("Courses");

    const handleClick = (buttonText: string) => {
        setSelectedButton(buttonText);
    }

    return (
        <div className="flex flex-col justify-center my-5 mx-10">

            <div className="bg-gray-400 p-3 rounded-lg flex items-center justify-center place-self-center max-w-md my-5">
                <form action="" method="POST" className="flex-1">
                    <input type="text" name="keyword" placeholder="Search" className="w-full p-2 rounded-lg focus:outline-none bg-gray-400"></input>
                </form>
                <div className="p-2 bg-gray-300 rounded-lg cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </div>

            <h1 className='place-self-center my-5'>Suggested paths based on your profile</h1>


            <div className="flex flex-cols-2 m-5 justify-center">
                <button
                    className={`mx-5 ${selectedButton === 'Courses' ? 'font-bold' : ''}`}
                    onClick={() => handleClick('Courses')}
                >
                    Courses
                </button>
                <button
                    className={`mx-5 ${selectedButton === 'Programs' ? 'font-bold' : ''}`}
                    onClick={() => handleClick('Programs')}
                >
                    Programs
                </button>
            </div>

            <div className="flex flex-row justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
            </div>

            <div className="grid  sm:grid-cols-1 lg:grid-cols-2 ">
                {/* course cards */}
                {selectedButton === 'Courses' && <Course {...course} />}
                {/* <Course {...course} /> */}
                
                {/* program cards */}
                {selectedButton === 'Programs' && <Program {...program} />}
                {/* <Program {...program} /> */}


                {/* hardcoded data for testing */}
                {/* <div className="flex flex-col bg-gray-400 rounded-lg m-3">
                    <h2 className="m-3 font-bold">UX/UI Designer</h2>
                    <div className="flex flex-row justify-between m-3">
                        <p>Average cost: $5,000</p>
                        <p>Average time: 236 hours</p>
                    </div>
                    <p className="m-3">Path Option: Coursera, SpringBoard, CareerFoundry</p>
                </div> */}
            </div>
        </div>
    )
}