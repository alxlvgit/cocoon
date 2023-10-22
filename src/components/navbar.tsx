import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex flex-row m-auto font-bold text-gray-400 overflow-x-auto">
      <div className="flex items-center justify-between w-full ">
        <div className="flex items-center h-full drop-shadow-2xl">
          <Link href="/">Logo</Link>
        </div>
        <div className="flex justify-between items-center space-x-9 sm:space-x-20 ">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <Link href="/about" className="hover:text-black">
            About
          </Link>
          <Link href="/careers" className="hover:text-black">
            Careers
          </Link>
          {/* <Link href="/uploads" className="hover:text-black">
            Upload
          </Link> */}
        </div>
        <div className="flex">
          <Link href="/profile">Profile</Link>
        </div>
      </div>
    </nav>
  );
}
