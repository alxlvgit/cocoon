import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  return (
    <nav className="flex flex-row flex-wrap items-center justify-between p-4 m-auto font-bold text-gray-400">
      <div className="flex items-center mr-96">
        <Link href="/">Logo</Link>
      </div>
      <div className="flex items-center space-x-9 sm:space-x-20">
        <Link href="/home" className="hover:text-black">
          Home
        </Link>
        <Link href="/about" className="hover:text-black">
          About
        </Link>
        <Link href="/careers" className="hover:text-black">
          Careers
        </Link>
        <Link href="/path" className="hover:text-black">
          Path
        </Link>
      </div>
      <div className="flex mt-4 sm:mt-0 ml-96">
        <Link href="/profile" className="hover:text-black">
          <FontAwesomeIcon icon={faUser} /> 
        </Link>
      </div>
    </nav>
  );
}
