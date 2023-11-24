import Link from "next/link";

export default function AnalysisResultStatus({
  errorMessage,
}: {
  errorMessage: string | null;
}) {
  return (
    <div className="sm:w-3/4 w-full m-auto p-8 flex flex-col justify-center items-center align-middle bg-main-bg rounded-xl shadow-xl">
      <h1 className="font-bold">
        Sorry, we don&apos;t have any paths for you.{" "}
      </h1>
      {errorMessage && (
        <h1 className="place-self-center my-2">{errorMessage}</h1>
      )}
      <Link
        href={"/careers"}
        className="text-center mt-4 bg-main-blue text-black border shadow border-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-bright-main"
      >
        Choose Career
      </Link>
    </div>
  );
}
