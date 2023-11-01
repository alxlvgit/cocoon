"use client";
import Link from "next/link";
import { useState } from "react";

const CareerTile = ({ career }: { career: CareerData }) => {
  const [addedToBucket, setAddedToBucket] = useState(false);
  // const [bucketItems, setBucketItems] = useState([]);
  const [bucketString, setBucketString] = useState("Add to Bucket");
  // const [quantity, setQuantity] = useState(0);

  const clickHandler = (e: any) => {
    setAddedToBucket((prevValue) => !prevValue);
    setBucketString((prevString) =>
      prevString === "Add to Bucket" ? "Added to Bucket" : "Add to Bucket"
    );
    console.log(e.target);

    // setQuantity((prevQuantity) => (e.target ? prevQuantity + 1 : prevQuantity - 1));
  };

  return (
    <div className="mx-auto p-4 w-full lg:w-4/5 justify-center items-center align-middle rounded-2xl shadow-xl bg-gradient-to-t from-indigo-300 cursor-pointer hover:bg-indigo-400 z-30 border-0 text-black">
      <div className="bg-indigo-100 flex flex-col h-full w-full rounded-lg mx-auto p-3 text-center shadow-2xl align-middle items-center justify-center">
        <div>
          <h1 className="text-md md:text-base lg:text-lg text-center w-full">
            {career.title}
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 pt-5 md:gap-1 lg:gap-4">
          <div
            id={career.code}
            onClick={clickHandler}
            className={` text-white ${
              addedToBucket ? "bg-gray-900" : "bg-gray-500"
            } hover:bg-gray-900 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`}
          >
            {bucketString}
          </div>
          <Link
            href={`/career/${career.code}`}
            className={` text-white bg-gray-500 hover:bg-gray-900 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`}
          >
            Show Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

export type CareerData = {
  code: string;
  title: string;
};

export default CareerTile;
