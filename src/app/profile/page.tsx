//@ts-nocheck

import Image from "next/image";
import Link from "next/link";

export default function Profile(userData: object) {
  //Once set up the database for the user, query the user data and saved path from the database.
  //For now, I used the fake(hard-coded) data for this page (selina)
  //userData passing in as props here can be the user id(?)
  userData = {
    user: {
      username: "Jonathan",
      avatar:
        "https://velog.velcdn.com/images/jangseoyoung98/post/c4e9bc8f-207e-4d68-aaeb-8711a10a2de9/image.png",
      savedPath: "1",
    },
    savedPathDetail: {
      id: 1,
      field: "Web & Digital Interface Designers",
      fieldId: "15-1255.00",
      specificPath: "Cheapest Path",
      title: "Photoshop for Web Publishing - BCIT Course",
    },
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="pt-3 pb-3 flex-col flex items-center">
        <Image
          src={userData.user.avatar}
          alt="Description of your image"
          width={300}
          height={200}
          className="border rounded-full w-36 h-36"
        ></Image>
        <p className="pt-2 text-md justify-center items-center font-bold text-black">
          Make your next step with us!
        </p>
        <p className="text-xl items-center justify-center font-bold text-black">
          {userData.user.username}
        </p>
      </div>
      <div className="mx-auto p-4 w-4/5 justify-center items-center align-middle rounded-2xl shadow-xl  from-indigo-300 cursor-pointer bg-indigo-400/50 border-0 text-black">
        <div className="bg-indigo-100 h-full w-full rounded-lg mx-auto p-4 text-center shadow-2xl flex flex-col align-middle items-center space-y-3 justify-center ">
          <p className="text-xl items-center justify-center font-bold text-black">
            Your Current Path in{" "}
            <span className="underline text-2xl">
              {userData.savedPathDetail.field}
            </span>
          </p>
          <p>
            {userData.savedPathDetail.specificPath}:{" "}
            {userData.savedPathDetail.title}
          </p>
          <Link
            href={`/career/${userData.savedPathDetail.fieldId}`}
            className={` text-white bg-gray-500 hover:bg-gray-900 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`}
          >
            Check the Market
          </Link>
        </div>
      </div>
    </div>
  );
}
