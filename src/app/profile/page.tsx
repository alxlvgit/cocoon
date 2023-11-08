//@ts-nocheck

import Image from "next/image";

export default function Profile(userData: object) {
  //Once set up the database for the user, query the user data and saved path from the database.
  //For now, I used the fake(hard-coded) data for this page (selina)
  //userData passing in as props here can be the user id(?)
  userData = [
    {
      user: {
        username: "Jonathan",
        avatar:
          "https://velog.velcdn.com/images/jangseoyoung98/post/c4e9bc8f-207e-4d68-aaeb-8711a10a2de9/image.png",
      },
    },
  ];

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="pt-3 pb-3 flex-col flex items-center">
        <Image
          src={userData[0].user.avatar}
          alt="Description of your image"
          width={300} // Set the desired width
          height={200}
          className="border rounded-full w-36 h-36"
        ></Image>
        <p className="pt-2 text-md justify-center items-center font-bold text-black">
          Make your next step with us!
        </p>
        <p className="text-xl items-center justify-center font-bold text-black">
          {userData[0].user.username}
        </p>
      </div>
      <div className="mx-auto p-4 w-4/5 justify-center items-center align-middle rounded-2xl shadow-xl  from-indigo-300 cursor-pointer bg-indigo-400/50 border-0 text-black">
        <div className="bg-indigo-100 h-full w-full rounded-lg mx-auto p-4 text-center shadow-2xl flex flex-col align-middle items-center justify-center">
          <p className="text-xl items-center justify-center font-bold text-black">
            Your Current Path
          </p>
          <div></div>
        </div>
      </div>
    </div>
  );
}
