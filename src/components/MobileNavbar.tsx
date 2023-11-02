"use client"

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const MobileNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldShowLogo, setShouldShowLogo] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShouldShowLogo(false);
      } else {
        setShouldShowLogo(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`w-full ${
        isOpen ? "h-full bg-gray-400" : ""
      } z-50 fixed top-0 left-0 p-4 ${shouldShowLogo ? "" : "hidden"}`}
    >
      <div className="flex justify-between items-center">
        {!isOpen && shouldShowLogo && (
          <div className="text-white font-bold text-xl">Logo</div>
        )}
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
        <div className="mt-20">
          <a
            href="/home"
            className="block text-white py-8 text-center text-2xl"
          >
            Home
          </a>
          <a
            href="/about"
            className="block text-white py-10 text-center text-2xl"
          >
            About
          </a>
          <a
            href="/careers"
            className="block text-white py-12 text-center text-2xl"
          >
            Careers
          </a>
          <a
            href="/path"
            className="block text-white py-12 text-center text-2xl mb-12"
          >
            Path
          </a>
          <a
            href="/profile"
            className="flex items-center justify-center text-white py-8 text-2xl"
          >
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;
