"use client"
import Course from '@/components/Course';
import Program from '@/components/Program';
import React, { useState } from 'react';

import { useAsyncFn } from "react-use"

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

interface SearchResults {
    results: {
        programs: {

            ProgramName: string;
            TuitionDomestic: string;
            Intakes: string[];
            Degree: string;
            RequiredCourses: RequiredCourses[];
            TotalCredits: number;
            Delivery: string;
            Contact: Contact;
        }[],
        courses: {
            CourseCode: string;
            CourseName?: string;
            title?: string;
            Terms: string[];
            Campus: string[];
            Offerings: Offerings[];
            code: string;
            cost?: string;
            duration?: string;
        }[]
    }
};



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

export default function Search() {
    const [selectedButton, setSelectedButton] = useState("Courses")
    const [query, setQuery] = useState("")

    const [{ value, loading }, search] = useAsyncFn<() => Promise<SearchResults>>(
        async () => {
            const response = await fetch("/api/search?q=" + query);
            const data = await response.json();
            console.log(data);
            return data;
        },
        [query]
    )

    const handleClick = (buttonText: string) => {
        setSelectedButton(buttonText);
    }

    return (
        <div className="flex flex-col justify-center my-5 mx-10">

            <div className="bg-gray-400 p-3 rounded-lg flex items-center justify-center place-self-center max-w-md my-5">
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        search()
                    }}
                    method="POST"
                    className="flex-1"
                >
                    <input type="text" name="keyword" value={query} placeholder="Search" className="w-full p-2 rounded-lg focus:outline-none bg-gray-400" onChange={(e) => setQuery(e.target.value)}></input>
                </form>
                <div className="p-2 bg-gray-300 rounded-lg cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </div>


                <div className="mt-10">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className="flex flex-wrap gap-5">
                            {value?.results.programs.map((program) => (
                                <div
                                    key={program.ProgramName}
                                    className="flex flex-col bg-black rounded-lg shadow-lg p-5 w-full max-w-sm text-gray-300"
                                >
                                    <p>Program</p>
                                    <h2 className="text-xl font-bold">{program.ProgramName}</h2>
                                    <p className="text-sm">{program.TuitionDomestic}</p>
                                    <p className="text-sm">{program.Degree}</p>
                                    <p className="text-sm">{program.Intakes.join(", ")}</p>
                                </div>
                            ))}

                            {value?.results.courses.map((course) => (
                                <div
                                    key={course.CourseName}
                                    className="flex flex-col bg-black rounded-lg shadow-lg p-5 w-full max-w-sm text-gray-300"
                                >
                                    <p>Course</p>
                                    <h2 className="text-xl font-bold">{course.CourseName}</h2>
                                    <p className="text-sm">{course.cost}</p>
                                    <p className="text-sm">{course.duration}</p>
                                    <p className="text-sm">{course.Terms.join(", ")}</p>
                                </div>
                            ))}
                        </div>

                        
                    )}
                </div>                
        </div>
    )
}