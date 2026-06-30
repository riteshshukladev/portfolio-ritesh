import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-10 py-5 flex items-center justify-between">
      {/* Hamburger Menu - Left */}
      <button
        id="hamburger-menu"
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 flex flex-col justify-center items-center w-10 h-10 gap-[6px] group cursor-pointer"
        aria-label="Toggle menu"
      >
        <span
          className={`block h-[1.5px] w-7 bg-black/70 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] origin-center ${isOpen
            ? "rotate-45 translate-y-[7.5px]"
            : "group-hover:w-5 group-hover:bg-black"
            }`}
        />
        <span
          className={`block h-[1.5px] w-7 bg-black/70 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen
            ? "opacity-0 scale-x-0"
            : "group-hover:bg-black"
            }`}
        />
        <span
          className={`block h-[1.5px] w-7 bg-black/70 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] origin-center ${isOpen
            ? "-rotate-45 -translate-y-[7.5px]"
            : "group-hover:w-4 group-hover:bg-black"
            }`}
        />
      </button>

      {/* Ritesh's Diary - Right */}
      <a
        href="/"
        className="zilla-text text-black/80 hover:text-black transition-colors duration-300 text-[16px] md:text-[18px] select-none"
        style={{
          fontWeight: 400,
        }}
      >
        ritesh's diary
      </a>
    </nav>
  );
};

export default Navbar;
