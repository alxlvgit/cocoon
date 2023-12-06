import AllCareerData from "@/components/AllCareerData";
import Link from "next/link";

export default async function Career({ params }: { params: { code: string } }) {
  return (
    <main className="mt-16 md:mt-28 max-w-6xl mx-auto sm:mt-36">
      <div className="m-5">
        <Link href="/careers">
          <button
            type="button"
            className="grid grid-cols-2 items-center justify-center px-5 py-2 text-sm text-gray-700 transition-colors duration-200 border border-gray-600 bg-button-bg rounded-lg w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-800"
          >
            <svg
              className="w-5 h-5 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
            <span>Go back</span>
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto pb-16 m-3 px-6 w-full">
        <AllCareerData careerCode={params.code} />
      </div>
    </main>
  );
}
