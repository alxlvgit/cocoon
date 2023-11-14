import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white rounded-lg shadow m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="#"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <strong className="text-xl font-bold">Cocoon</strong>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li className="mr-4">
              <Link href="/about" className="hover:text-black">
                About
              </Link>
            </li>
            <li>
              <Link href="/home" className="hover:text-black">
                Home
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="#" className="hover:underline">
            Cocoon™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
