import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="flex flex-col justify-start fixed  bg-blue-500 overflow-y-auto z-40 top-0 left-0 text-white w-48 h-full">
      <div className="p-4">
        <Link href="/">Logo</Link>
      </div>
      <div className="flex flex-col">
        <Link href="/home" className="py-3 px-4 text-lg hover:text-black">
          Home
        </Link>
        <Link href="/about" className="py-3 px-4 text-lg hover:text-black">
          About
        </Link>
        <Link href="/careers" className="py-3 px-4 text-lg hover:text-black">
          Careers
        </Link>
        <Link href="/path" className="py-3 px-4 text-lg hover:text-black">
          Path
        </Link>
      </div>
      <div className="flex-grow"></div>
      <div className="p-4">
        <Link href="/profile" className="text-lg hover:text-black">
          Profile
        </Link>
      </div>
    </div>
  );
}
