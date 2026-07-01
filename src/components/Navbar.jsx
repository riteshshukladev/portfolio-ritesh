import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isOpen, setIsOpen }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-[60] px-6 md:px-10 py-5 flex items-center justify-between pointer-events-none">
      {/* Hamburger Menu - Left */}
      <button
        id="hamburger-menu"
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto relative z-[60] flex flex-col justify-center items-center w-8 h-8 gap-[5px] group cursor-pointer"
        aria-label="Toggle menu"
      >
        <span
          className={`block h-[1.5px] w-6 bg-black/70 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] origin-center ${isOpen
            ? "rotate-45 translate-y-[6.5px]"
            : "group-hover:w-4 group-hover:bg-black"
            }`}
        />
        <span
          className={`block h-[1.5px] w-6 bg-black/70 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen
            ? "opacity-0 scale-x-0"
            : "group-hover:bg-black"
            }`}
        />
        <span
          className={`block h-[1.5px] w-6 bg-black/70 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] origin-center ${isOpen
            ? "-rotate-45 -translate-y-[6.5px]"
            : "group-hover:w-3 group-hover:bg-black"
            }`}
        />
      </button>

      {/* Ritesh's Diary - Right */}
      <Link
        to="/"
        className="pointer-events-auto zilla-text text-black/80 hover:text-black transition-colors duration-300 text-[16px] md:text-[18px] select-none"
        style={{
          fontWeight: 400,
        }}
      >
        ritesh's diary
      </Link>
    </nav>
  );
};

export default Navbar;
