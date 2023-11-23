"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const MobileNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Disable overflow when the mobile navbar is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      // Reset overflow when the mobile navbar is closed
      document.body.style.overflow = "auto";
    }

    // Clean up the effect when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleButtonClick = (route: string) => {
    router.push(route);
    setIsOpen(false);
  };

  return (
    <div
      className={`z-50 w-full sm:hidden ${
        isOpen
          ? "fixed top-0 left-0 z-50 h-full bg-main-bg"
          : "block w-full h-fit fixed top-0 left-0 bg-main-bg"
      }`}
    >
      <div className="w-full p-2 h-22 flex items-center align-middle justify-end">
        <button
          className="text-white focus:outline-none lg:hidden"
          onClick={toggleMenu}
        >
          {isOpen ? (
            // Close Icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="24"
              height="24"
              viewBox="0 0 50 50"
            >
              <path d="M 7.7070312 6.2929688 L 6.2929688 7.7070312 L 23.585938 25 L 6.2929688 42.292969 L 7.7070312 43.707031 L 25 26.414062 L 42.292969 43.707031 L 43.707031 42.292969 L 26.414062 25 L 43.707031 7.7070312 L 42.292969 6.2929688 L 25 23.585938 L 7.7070312 6.2929688 z"></path>
            </svg>
          ) : (
            // Hamburger Icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"></path>
            </svg>
          )}
        </button>
      </div>
      {isOpen && (
        <div className="flex flex-col w-full align-middle items-center mt-10">
          <button
            onClick={() => handleButtonClick("/home")}
            className="hover:bg-nav-button text-lg font-bold text-center w-3/4 border border-white border-opacity-30 rounded-xl px-6 mb-8 py-4"
          >
            Home
          </button>
          <button
            onClick={() => handleButtonClick("/careers")}
            className="hover:bg-nav-button text-lg font-bold w-3/4 text-center border border-white border-opacity-30 rounded-xl mb-8 px-6 py-4"
          >
            Career Paths
          </button>
          <button
            onClick={() => handleButtonClick("/analysis")}
            className="hover:bg-nav-button w-3/4 text-lg font-bold text-center border border-white border-opacity-30 rounded-xl px-6 py-4"
          >
            Analysis
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;
