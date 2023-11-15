import React from "react";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import SignoutButton from "@/components/SignoutButton";
import ProfileClient from "@/components/ProfileClient";
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 justify-center w-3/4 m-auto my-5 ">
      <div className="flex flex-col xs:flex-row xs:justify-between align-middle items-center sm:col-span-2">
        <div className="w-20 h-20 xs:mr-6 mx-auto">
          <Image
            src={user.image ? user.image : "/images/avatar.png"} 
            alt={user.name + " avatar"}
            width={80}
            height={80}
            className="object-cover h-20 w-20 rounded-full"
          />
        </div>
        <div className="flex-grow flex flex-col sm:flex-row justify-between">
          <div className="mb-2 xs:mb-0 flex flex-col items-start xs:items-start">
            <h1 className="font-bold w-full text-xl">Welcome,</h1>
            <p className="text-lg text-gray-500 text-left">
              {user.name}
            </p>
          </div>
          <SignoutButton
            signOut={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          />
        </div>
      </div>
      <ProfileClient user={user} />
    </div>
  )

}
