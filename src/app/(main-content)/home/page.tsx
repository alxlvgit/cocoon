import React from "react";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import SignoutButton from "@/components/SignoutButton";
import ProfileClient from "@/components/ProfileClient";
import Image from "next/image";
import Test from "@/components/Test";

export default async function Profile() {
  const session = await auth();

  // Use this for productions
  // if (!session) {
  // redirect("/api/auth/signin?callbackUrl=/profile");
  // }
  // const { user } = session;

  // Keep this here temporary for development
  let user = null;
  if (!session) {
    user = {
      name: "Guest",
      image: "/assets/avatar-placeholder.jpg",
      email: "",
    };
  } else {
    user = session.user;
  }

  return (
    <main className="mt-36">
      <div className="flex flex-col justify-center my-5 mx-10">
        <h1 className="flex flex-col xs:flex-row xs:justify-between align-middle items-center sm:col-span-2  mb-5">
          <div className="w-20 h-20 xs:mr-6 mx-auto">
            <Image
              src={user.image ? user.image : "/assets/avatar-placeholder.jpg"}
              alt={user.name + " avatar"}
              width={80}
              height={80}
              className="object-cover h-20 w-20 rounded-full"
            />
          </div>
          <div className="flex-grow flex flex-col sm:flex-row justify-between">
            <div className="mb-2 xs:mb-0 flex flex-col items-start xs:items-start">
              <h1 className="font-bold w-full text-xl">Welcome,</h1>
              <p className="text-lg text-gray-500 text-left">{user.name}</p>
            </div>
            <SignoutButton
              signOut={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            />
          </div>
        </h1>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-3 w-full justify-center items-start">
          <ProfileClient user={user} />
        </div>
      </div>
    </main>
  );
}
