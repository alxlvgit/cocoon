import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="m-auto font-bold z-50 p-4 fixed top-0 left-0 text-black h-22 w-full hidden sm:block bg-main-bg">
      <div className="flex items-center space-x-4 sm:space-x-8 md:space-x-12 justify-center">
        <Link href="/home" className="hover:bg-nav-button rounded-xl px-6 py-3">
          Home
        </Link>
        <Link
          href="/careers"
          className="hover:bg-nav-button rounded-xl px-6 py-3"
        >
          Career Paths
        </Link>
        <Link
          href="/analysis"
          className="hover:bg-nav-button rounded-xl px-6 py-3"
        >
          Analysis
        </Link>
      </div>
    </nav>
  );
}
