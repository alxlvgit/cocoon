"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export default function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="m-auto font-bold z-50 p-4 absolute top-0 left-0 text-black h-22 w-full hidden sm:block bg-main-bg">
      <div className="flex absolute ml-6 items-center text-white font-medium justify-center">
        <Link
          href="/home"
          className={twMerge(
            "rounded-xl px-6 py-3 hover:bg-cyan-700",
            `${pathname === "/home" ? "bg-cyan-700" : ""}`
          )}
        >
          Dashboard
        </Link>
      </div>
      <div className="flex items-center w-full align-middle space-x-6 sm:space-x-1 md:space-x-12  text-white font-medium justify-center">
        <Link
          href="/careers"
          className={twMerge(
            "rounded-xl px-6 py-3 hover:bg-cyan-700",
            `${pathname === "/careers" ? "bg-cyan-700" : ""}`
          )}
        >
          Career Paths
        </Link>
        <Link
          href="/analysis"
          className={twMerge(
            "rounded-xl px-6 py-3 hover:bg-cyan-700",
            `${pathname === "/analysis" ? "bg-cyan-700" : ""}`
          )}
        >
          Analysis
        </Link>
      </div>
      <div className="flex absolute right-0 mr-6 top-5 items-center text-white font-medium justify-center">
        <img
          src="/assets/newlogo.svg"
          alt="logo"
          className="w-15 h-10 place-items-end"
        />
      </div>
    </nav>
  );
}
