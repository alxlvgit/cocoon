"use client"
import Course from '@/components/Course';
import Program from '@/components/Program';
import React, { useState } from 'react';

import { useAsyncFn } from "react-use"
import { generateProgramsEmbeddings, generateCoursesEmbeddings } from './embeddings';
import programAndCourseData from "@/programs-data/programsData.json"
import { SearchResults } from '@/programs-data/interfaces';

interface RequiredCourses {
    CourseName: string;
    Credits: number;
}


const programs = programAndCourseData.programs;
const courses = programAndCourseData.courses; 

export default function Search() {
    const [selectedButton, setSelectedButton] = useState("Courses")
    const [query, setQuery] = useState("")

    // generate embeddings for courses and programs when the page loads
    const programEmbeddings = generateProgramsEmbeddings();
    const courseEmbeddings = generateCoursesEmbeddings();

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
        <div className="flex flex-col place-items-center justify-center my-5 mx-10">

            {/* search bar */}
            <div className="bg-gray-400 p-3 rounded-lg flex items-center justify-center place-self-center max-w-md my-5">
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        search()
                    }}
                    method="POST"
                    className="flex-1"
                >
                    <div className="flex items-center justify-center  max-w-md ">
                        <input type="text" name="keyword" value={query} placeholder="Search" className="w-full p-2 rounded-lg focus:outline-none bg-gray-400" onChange={(e) => setQuery(e.target.value)}></input>
                        <button type="submit">
                            <div className="p-2 bg-gray-300 rounded-lg cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </button>
                    </div>
                </form>
            </div>

            {/* Conditional rendering based on loading and search results */}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {/* all programs and courses */}
                    {(!value || (value && (!value.results.programs.length && !value.results.courses.length))) && (
                        <div className="flex flex-wrap flex-cols-2 gap-5">
                            <div className="flex flex-col flex-wrap gap-5">
                                <p>Programs</p>
                                {programs.map((program, index) => (
                                    <Program key={index} programProps={program} />
                                ))}
                            </div>
                            <div className="flex flex-col flex-wrap gap-5">
                                <p>Courses</p>
                                {courses.map((course, index) => (
                                    <Course key={index} courseProps={course} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* search results */}
                    {(value && (value.results.programs.length || value.results.courses.length)) && (
                        <div className="mt-10 flex justify-center place-content-center">
                            <div className="flex flex-wrap flex-cols-2 gap-5">
                                <div className='flex flex-col flex-wrap gap-5'>
                                    {value.results.programs.map((program) => (
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
                                </div>

                                <div className='flex flex-col flex-wrap gap-5'>
                                    {value.results.courses.map((course) => (
                                        <div
                                            key={course.CourseName}
                                            className="flex flex-col bg-gray-700 rounded-lg shadow-lg p-5 w-full max-w-sm text-gray-300"
                                        >
                                            <p>Course</p>
                                            <h2 className="text-xl font-bold">{course.CourseName}</h2>
                                            <p className="text-sm">{course.cost}</p>
                                            <p className="text-sm">{course.duration}</p>
                                            <p className="text-sm">{course.Terms.join(", ")}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
