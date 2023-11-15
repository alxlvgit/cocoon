import { auth } from "@/auth";
import PathsController from "@/components/PathsController";
import { redirect } from "next/navigation";

export default async function Path() {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/path");
  }

  return (
    <div className="flex flex-col justify-center my-5 mx-10">
      <h1 className="m-5 text-center font-bold text-2xl mb-5">
        Suggested Paths Based on Your Profile
      </h1>
      <PathsController />
    </div>
  );
}
