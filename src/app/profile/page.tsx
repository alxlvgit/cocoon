"use client"
import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";


export default function Profile() {
  return (
    <>
      <div className="flex flex-col m-4  items-center">
        <h1 className="text-4xl font-bold text-gray-400">
          Welcome to Profile Page
        </h1>
      </div>
      
      <div className="flex m-4 justify-center h-screen">
        <div className="w-96">
          {/* <progress className="w-full" value="60" max="100" /> */}
          <ProgressBar completed={60} maxCompleted={100} bgColor="#2896b2" animateOnRender={true} />
        </div>
      </div>
    </>
  );
}
