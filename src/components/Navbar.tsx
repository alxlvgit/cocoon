import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex flex-row flex-wrap items-center justify-between p-4 m-auto font-bold text-gray-400">
      <div className="flex items-center">
        <Link href="/">Logo</Link>
      </div>
      <div className="flex items-center space-x-9 sm:space-x-20">
        <Link href="/" className="hover:text-black">
          Home
        </Link>
        <Link href="/about" className="hover:text-black">
          About
        </Link>
        <Link href="/careers" className="hover:text-black">
          Careers
        </Link>
        <Link href="/career-gap" className="hover:text-black">
          Paths
        </Link>
      </div>
      <div className="flex mt-4 sm:mt-0">
        <Link href="/profile" className="hover:text-black">
          Profile
        </Link>
      </div>
    </nav>
  );
}
