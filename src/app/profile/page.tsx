import React from "react";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import SignoutButton from "@/components/SignoutButton";
import ProfileClient from "@/components/ProfileClient";

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
      <div className="md:col-span-2">
        <h1 className="font-bold text-xl">Welcome,</h1>
        <p className="text-lg text-gray-500">{user.name}</p>
      </div>
      <SignoutButton
        signOut={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      />
      <ProfileClient user={user} />
    </div>
  )

}
