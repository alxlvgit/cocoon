import { auth } from "@/auth";
import PathsController from "@/components/PathsController";
import { redirect } from "next/navigation";

export default async function Path() {
  const session = await auth();
  // if (!session) {
  //   redirect("/api/auth/signin?callbackUrl=/path");
  // }

  return (
    <main className="mt-36">
      <div className="flex flex-col justify-center my-5 mx-10">
        <h1 className="text-center font-bold text-xl mb-12">
          Career Path Analysis Results
        </h1>
        <PathsController />
      </div>
    </main>
  );
}