import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

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
          <FontAwesomeIcon icon={faUser} />
        </Link>
      </div>
    </nav>
  );
}
