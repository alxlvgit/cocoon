import { auth } from "@/auth";
import SkillsProgress from "@/components/SkillsProgress";
import { redirect } from "next/navigation";
import Image from "next/image";

/*
NOTES FROM SELINA TO XIAO 👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽

Data we need for this page: Missing skills, Matched skills, Number Completed Courses, Learning Hours, Top career suggestions, Saved Careers.

If don't have these data, I think alex and you (BE devs) should talk to the designers or 
at minimum, let's discuss what we have, and what we are going to show on this page....! 
*/

export default async function Profile() {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/profile");
  }
  const { user } = session;

  const userData = {
    user: {
      id: user.id,
      username: user.name,
      avatar: user.image || "/assets/avatar-placeholder.jpg",
    },

    // change this to the data from the db
    savedPathDetail: {
      id: 1,
      field: "Web & Digital Interface Designers",
      fieldId: "15-1255.00",
      specificPath: "Cheapest Path",
      title: "Photoshop for Web Publishing - BCIT Course",
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 justify-center w-3/4 m-auto my-5 ">
      <div className="flex align-middle items-center flex-col xs:flex-row">
        <div className="w-20 h-20 xs:mr-6">
          <Image
            src={userData.user.avatar}
            alt={userData.user.username + " avatar"}
            width={80}
            height={80}
            className="object-cover h-20 w-20 rounded-full"
          />
        </div>
        <div className="mt-3 xs:mt-0 flex flex-col items-center xs:items-start">
          <h1 className="font-bold text-xl">Welcome,</h1>
          <p className="text-lg text-gray-500 text-center">
            {userData.user.username}
          </p>
        </div>
      </div>

      <SkillsProgress />
      <div className=" bg-blue-100 p-5 rounded-3xl	shadow-md grid grid-rows-3 items-center justify-center">
        <div>
          <p className="font-bold text-lg text-center">Skills</p>
        </div>
        <div className="row-span-2">
          <p className="text-base">Nothing to display</p>
        </div>
      </div>

      <div className=" bg-blue-100 p-5 rounded-3xl	shadow-md grid grid-rows-3 items-center justify-center">
        <div>
          <p className="font-bold text-lg text-center">Missing Skills</p>
        </div>
        <div className="row-span-2">
          <p className="text-base">Nothing to display</p>
        </div>
      </div>

      <div className=" bg-blue-100 p-5 rounded-3xl	shadow-md grid grid-rows-3 items-center justify-center">
        <div>
          <p className="font-bold text-lg text-center">Statistics</p>
        </div>
        <div className="row-span-2">
          <p className="text-base">Nothing to display</p>
        </div>
      </div>

      <div className=" bg-blue-100 p-5 rounded-3xl md:row-span-2 	shadow-md grid grid-rows-3 items-center justify-center">
        <div>
          <p className="font-bold text-lg text-center">
            Top career suggestions
          </p>
        </div>
        <div className="row-span-2">
          <p className="text-base text-center">Nothing to display</p>
        </div>
      </div>
      <div className=" bg-blue-100 p-5 rounded-3xl	shadow-md grid grid-rows-3 items-center justify-center">
        <div>
          <p className="font-bold text-lg text-center">Saved Careers</p>
        </div>
        <div className="row-span-2">
          <p className="text-base">Nothing to display</p>
        </div>
      </div>
    </div>
  );
}
