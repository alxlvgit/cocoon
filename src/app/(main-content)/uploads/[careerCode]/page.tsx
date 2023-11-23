import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ProcessingStatuses from "@/components/ProcessingStatuses";
import UploadBackground from "@/components/UploadBG";
import UploadsForm from "@/components/UploadsForm";

async function Uploads({ params }: { params: { careerCode: string } }) {
  const careerCode = params.careerCode;
  // const session = await auth();
  // if (!session) {
  //   redirect(`/api/auth/signin?callbackUrl=/uploads/${careerCode}`);
  // }

  return (
    <main className="mt-36">
      <div className="flex flex-col md:mt-3 md:mb-8 md:mx-14 items-center bg-blue-100 md:rounded-xl shadow-2xl h-screen md:h-full">
        <UploadBackground />
        <ProcessingStatuses />
        <UploadsForm careerCode={careerCode} />
      </div>
    </main>
  );
}

export default Uploads;
