import { auth } from "@/auth";
import ProcessingStatuses from "@/components/ProcessingStatuses";
import UploadsForm from "@/components/UploadsForm";
import { redirect } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

async function Uploads({ params }: { params: { careerCode: string } }) {
  const careerCode = params.careerCode;
  const session = await auth();
  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/uploads/${careerCode}`);
  }

  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <div className="relative shadow-md rounded-2xl bg-center bg-718096 flex flex-col justify-center items-center flex-nowrap m-5 h-1/5 min-h-60 w-3/4 overflow-hidden">
      <Image src="/assets/uploadPageBG" className="w-full h-150 object-cover filter brightness-50" alt="Background" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 self-center w-full p-5 text-center text-white text-5xl">
        <p className="text-6xl font-bold">Cocoon</p>
        <br />
        <p>
          Step 1 - Upload resume   →   Step 2 - AI analyzes your resume   →   Step 3 - Browse careers
        </p>
      </div>
      {
        !isFormVisible && (
          <div className="relative flex flex-col mt-[-50px] items-center justify-center min-w-300 min-h-180 bg-white border border-e2e8f0 rounded-2xl shadow-md mb-5 p-5 text-2xl font-bold transition-opacity duration-1000 ease-out">
            <p>Upload Resume</p>
            <button className="bg-white m-3 hover:bg-edf2f7 text-4a5568 font-semibold py-1 px-4 border border-cbd5e0 rounded shadow-sm text-sm px-20 text-lg" onClick={() => setIsFormVisible(true)}>
              🡡 Upload
            </button>
          </div>
        )
      }
      {
        isFormVisible && (
          <div className={`transition-opacity duration-1000 ease-in ${isFormVisible ? "opacity-100" : "opacity-0"}`}>
            <UploadsForm careerCode={careerCode} />
            <ProcessingStatuses />
          </div>
        )
      }
    </div >
  );
}

export default Uploads;
