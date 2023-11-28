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

  //TODO:
  // 1. Add bottom padding to the analysis page
  // 2. Add more padding to the path progress bar div, and increase the gap slightly on home page
  // 3. Fix the careers page, change to grid - 3 columns, fix the hover on mobile, make the cards look better
  // 4. Fix the career page, wording, layout, etc
  // 5. Fix the upload page, remove extra step before the form
  // 6. Work on home page skills, add property to object , and try to make it work
  // 7. Debug and error handling for uploads page, all processing steps

  return (
    <main className="mt-24 sm:mt-36 pb-10">
      <div className="flex flex-col md:mt-3 w-5/6 xs:w-4/5 justify-evenly md:mb-8 p-6 mx-auto items-center  bg-bright-main rounded-xl shadow-xl h-fit  md:h-full">
        <UploadBackground />
        <ProcessingStatuses />
        <UploadsForm careerCode={careerCode} />
      </div>
    </main>
  );
}

export default Uploads;
