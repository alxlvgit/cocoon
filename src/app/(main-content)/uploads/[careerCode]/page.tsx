import { auth } from "@/auth";
import MobileNavbar from "@/components/MobileNavbar";
import NavBar from "@/components/Navbar";
import ProcessingStatuses from "@/components/ProcessingStatuses";
import UploadBackground from "@/components/UploadBG";
import UploadsForm from "@/components/UploadsForm";
import { redirect } from "next/navigation";

async function Uploads({ params }: { params: { careerCode: string } }) {
  const careerCode = params.careerCode;
  const session = await auth();
  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/uploads/${careerCode}`);
  }

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
