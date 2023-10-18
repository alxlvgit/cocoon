"use client"
import React, { useState } from 'react';


export default function Career() {
    const [selectedButton, setSelectedButton] = useState("");

    const handleClick = (buttonText: string) => {
        setSelectedButton(buttonText);
    }

    return (
        <div className="flex flex-col justify-center my-5">
            <h1 className='place-self-center'>Suggested paths based on your profile</h1>


            <div className="flex flex-cols-2 m-5 justify-center">
                <button
                    className={`mx-5 ${selectedButton === 'Careers' ? 'font-bold' : ''}`}
                    onClick={() => handleClick('Careers')}
                >
                    Careers
                </button>
                <button
                    className={`mx-5 ${selectedButton === 'Courses' ? 'font-bold' : ''}`}
                    onClick={() => handleClick('Courses')}
                >
                    Courses
                </button>
            </div>
            
            <div className="flex flex-row items-start ml-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
            </div>

            <div className="grid  sm:grid-cols-1 lg:grid-cols-2 ">
                <div className="flex flex-col bg-gray-400 rounded-lg m-3">
                    <h2 className="m-3 font-bold">UX/UI Designer</h2>
                    <div className="flex flex-row justify-between m-3">
                        <p>Average cost: $5,000</p>
                        <p>Average time: 236 hours</p>
                    </div>
                    <p className="m-3">Path Option: Coursera, SpringBoard, CareerFoundry</p>              
                </div>

                <div className="flex flex-col bg-gray-400 rounded-lg m-3">
                    <h2 className="m-3 font-bold">UX/UI Designer</h2>
                    <div className="flex flex-row justify-between m-3">
                        <p>Average cost: $5,000</p>
                        <p>Average time: 236 hours</p>
                    </div>
                    <p className="m-3">Path Option: Coursera, SpringBoard, CareerFoundry</p>
                </div>

                <div className="flex flex-col bg-gray-400 rounded-lg m-3">
                    <h2 className="m-3 font-bold">UX/UI Designer</h2>
                    <div className="flex flex-row justify-between m-3">
                        <p>Average cost: $5,000</p>
                        <p>Average time: 236 hours</p>
                    </div>
                    <p className="m-3">Path Option: Coursera, SpringBoard, CareerFoundry</p>
                </div>

                <div className="flex flex-col bg-gray-400 rounded-lg m-3">
                    <h2 className="m-3 font-bold">UX/UI Designer</h2>
                    <div className="flex flex-row justify-between m-3">
                        <p>Average cost: $5,000</p>
                        <p>Average time: 236 hours</p>
                    </div>
                    <p className="m-3">Path Option: Coursera, SpringBoard, CareerFoundry</p>
                </div>
            </div>
        </div>
    )
}