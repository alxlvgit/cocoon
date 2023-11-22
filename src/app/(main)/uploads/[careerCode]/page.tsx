import { auth } from "@/auth";
import ProcessingStatuses from "@/components/ProcessingStatuses";
import UploadsForm from "@/components/UploadsForm";
import { redirect } from "next/navigation";

async function Uploads({ params }: { params: { careerCode: string } }) {
  const careerCode = params.careerCode;
  const session = await auth();
  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/uploads/${careerCode}`);
  }

  return (
    <div className="flex flex-col md:mt-3 md:mb-8 md:mx-14 items-center bg-blue-100 md:rounded-xl shadow-2xl h-screen md:h-full">
      <div className="bg-neutral-600 flex flex-col flex-nowrap m-5 h-20 md:m-6 rounded-xl w-3/4 md:h-60 items-center overflow">
        <div className="grow">
          <p className="self-center w-full p-6 md:p-20 text-center text-white text-xl md:text-5xl grow">
            Cocoon
          </p>
        </div>
      </div>
      <UploadsForm careerCode={careerCode} />
      <ProcessingStatuses />
    </div>
  );
}

export default Uploads;
