"use client"
import React, { useState } from 'react';

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
};

interface CourseProps {
    CourseCode: string;
    CourseName: string;
    Terms: string[];
    Campus: string[];
    Offerings: Offerings[];
};

function calculateAverageTuition(offerings: Offerings[]): number | null {
    if (offerings.length === 0) {
        return null; // Return null for an empty array
    }

    const totalTuition = offerings.reduce((sum, offering) => {
        // Extract the numeric value from the Tuition string and add it to the sum
        const tuitionValue = parseFloat(offering.Tuition.replace('$', ''));
        return sum + tuitionValue;
    }, 0);

    // Calculate the average tuition
    const averageTuition = Number((totalTuition / offerings.length).toFixed(2)) ;

    return averageTuition;
};

function calculateAverageDuration(offerings: Offerings[]): number | null {
    if (offerings.length === 0) {
        return null; // Return null for an empty array
    }

    const totalWeeks = offerings.reduce((sum, offering) => {
        const match = offering.Duration.match(/\((\d+) weeks\)/);
        const weeks = match ? parseInt(match[1], 10) : 0;
        return sum + weeks;
    }, 0);

    const averageWeeks = totalWeeks / offerings.length;
    return averageWeeks;
};


export default function Course(courseProps: CourseProps) {
    let termString = "";
    termString = courseProps.Terms.join(", ");

    return (
        <div className="flex flex-col bg-gray-400 rounded-lg m-3">
            <h2 className="m-3 font-bold">{courseProps.CourseName}</h2>
            <div className="flex flex-row justify-between m-3">
                <p>Average cost: ${calculateAverageTuition(courseProps.Offerings)}</p>
                <p>Average time: {calculateAverageDuration(courseProps.Offerings)} weeks</p>
            </div>
            <p className="m-3">Terms: {termString}</p>
        </div>
    )
}