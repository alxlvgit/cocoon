import React, { useState } from "react";
import Link from "next/link";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800">
          <span className="text-3xl text-indigo-600 mr-1 pt-2">
            <ion-icon name="logo-ionic"></ion-icon>
          </span>
        Cocoon
        </div>

        <div
          onClick={toggleMenu}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <ion-icon name={isOpen ? "close" : "menu"}></ion-icon>
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            isOpen ? "top-20" : "top-[-490px]"
          }`}
        >
          <li className="md:ml-8 text-xl md:my-0 my-7">
            <Link href="/home">
              <a className="text-gray-800 hover:text-gray-400 duration-500">
                Home
              </a>
            </Link>
          </li>
          <li className="md:ml-8 text-xl md:my-0 my-7">
            <Link href="/about">
              <a className="text-gray-800 hover:text-gray-400 duration-500">
                About
              </a>
            </Link>
          </li>
          <li className="md:ml-8 text-xl md:my-0 my-7">
            <Link href="/careers">
              <a className="text-gray-800 hover:text-gray-400 duration-500">
                Careers
              </a>
            </Link>
          </li>
          <li className="md:ml-8 text-xl md:my-0 my-7">
            <Link href="/career-gap">
              <a className="text-gray-800 hover:text-gray-400 duration-500">
                Paths
              </a>
            </Link>
          </li>
          <li className="md:ml-8 text-xl md:my-0 my-7">
            <Link href="/profile">
              <a className="text-gray-800 hover:text-gray-400 duration-500">
                Profile
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
