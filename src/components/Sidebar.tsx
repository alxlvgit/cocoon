import Link from "next/link";


export default function Sidebar() {
  return (
    <aside className="flex flex-col justify-start h-full  bg-blue-500 text-white w-48">
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
    </aside>
  );
}


