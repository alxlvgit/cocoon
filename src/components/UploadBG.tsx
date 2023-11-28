import Image from "next/image";

export default function UploadBackground() {
  return (
    <div className="bg-neutral-600 flex flex-col justify-center items-center relative h-30 md:m-6 rounded-xl sm:w-10/12 md:h-60 overflow-hidden">
      <Image
        src="/assets/uploadPageBG.jpg"
        width={500}
        height={500}
        alt="Upload Background Image"
        className="object-cover object-center w-full h-full brightness-50"
      />
      <p className="text-3xl md:text-6xl font-bold top-0 xs:top-10  z-30 absolute text-white overflow-hidden md:text-center">
        Cocoon
      </p>
      <p className="text-xs text-center bottom-2 xs:bottom-5 w-4/5 sm:w-3/4 text-white absolute overflow-hidden">
        Step 1 - Upload resume → Step 2 - AI analyzes your resume → Step 3 - AI
        recommends paths
      </p>
    </div>
  );
}
