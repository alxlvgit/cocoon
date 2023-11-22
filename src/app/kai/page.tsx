import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Setting() {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/profile");
  }

  const { user } = session;

  const userData = {
    user: {
      id: user.id,
      username: user.name,
      useremail: user.email,
      // usernumber: user.number,
      avatar: user.image || "/assets/avatar-placeholder.jpg",
    },

  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 justify-center w-3/4 m-auto my-5">
      <div className="flex flex-col xs:flex-row xs:justify-center align-middle items-center sm:col-span-2">
        <div className="w-full h-full">
          <div className="flex justify-center items-center h-full w-full">
            <Image
              src={userData.user.avatar}
              alt={userData.user.username + " avatar"}
              width={150}
              height={150}
              className="object-cover rounded-full mx-auto"
            />
          </div>
        </div>
      </div>

      <div className=" bg-blue-100 p-5 rounded-3xl shadow-md grid grid-rows-1 items-center justify-center md:row-span-2">
        <div>
          <p className="font-bold text-lg text-center">Profile Infomation</p>
        </div>
        <div className="row-span-2">
          <p className=" bg-white p-2 rounded-md shadow-md mb-6">{userData.user.username}</p>
          <p className="bg-white p-2 rounded-md shadow-md mb-6">{userData.user.useremail}</p>
          <p className="bg-white p-2 rounded-md shadow-md mb-6">1234567</p>
          {/* this is the user phone number area */}
          {/* <p className="bg-white p-3 rounded-md shadow-md mb-6">{userData.user.username}</p> */}
        </div>
      </div>

      <div className=" bg-blue-100 p-5 rounded-3xl shadow-md grid grid-rows-1 items-center justify-center">
        <div>
          <p className="font-bold text-lg text-center">Display</p>
        </div>
        <div className="row-span-5">
          <select id="language" className="mt-1 block w-full">
            <option>Light Mode</option>
            <option>Dark Mode</option>
          </select>
        </div>
      </div>

      <div className=" bg-blue-100 p-5 rounded-3xl shadow-md grid grid-rows-3 items-center justify-center md:row-span-2">
        <div>
          <p className="font-bold text-lg text-center">General Preferences</p>
        </div>
        <div className="row-span-2">
          <label htmlFor="language">Language</label>
          <select id="language" className="mt-1 block w-full">
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
          </select>
        </div>
      </div>

      <div className=" bg-blue-100 p-5 rounded-3xl md:row-span-2 shadow-md grid grid-rows-3 items-center justify-center">
        <div>
          <p className="font-bold text-lg text-center">
            Account Management
          </p>
        </div>
        <div className="row-span-2">
          <button className="bg-white p-2 rounded-md">
            Delete account
          </button>
        </div>
      </div>
    </div>
  );
}
