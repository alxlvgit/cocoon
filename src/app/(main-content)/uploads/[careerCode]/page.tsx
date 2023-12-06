import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ProcessingStatuses from "@/components/ProcessingStatuses";
import UploadBackground from "@/components/UploadBG";
import UploadsForm from "@/components/UploadsForm";

async function Uploads({ params }: { params: { careerCode: string } }) {
  const careerCode = params.careerCode;
  const session = await auth();
  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/uploads/${careerCode}`);
  }

  return (
    <main className="mt-24 sm:mt-36 pb-10 max-w-screen-2xl m-auto">
      <div className="flex flex-col md:mt-3 w-5/6 xs:w-4/5 justify-evenly md:mb-8 p-6 mx-auto items-center  bg-bright-main rounded-xl shadow-xl h-fit  md:h-full">
        <UploadBackground />
        <ProcessingStatuses />
        <UploadsForm careerCode={careerCode} />
      </div>
    </main>
  );
}

export default Uploads;
