import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex flex-row items-center justify-between p-4 m-auto font-bold text-gray-400">
      <div className="flex items-center mr-10 sm:mr-20">
        <Link href="/">Logo</Link>
      </div>
      <div className="flex items-center space-x-4 sm:space-x-8 md:space-x-12">
        <Link href="/home" className="hover:text-black">
          Home
        </Link>
        <Link href="/about" className="hover:text-black">
          About
        </Link>
        <Link href="/careers" className="hover:text-black">
          Careers
        </Link>
        <Link href="/career-gap" className="hover:text-black">
          Path
        </Link>
      </div>
      <div className="flex mt-4 ml-16 sm:mt-0">
        <Link href="/profile" className="hover:text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </Link>
      </div>
    </nav>
  );
}
