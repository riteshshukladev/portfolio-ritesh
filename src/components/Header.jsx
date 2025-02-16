import React, { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative h-[80px]">
      {/* Desktop Header */}
      <div className="hidden md:flex justify-between py-6 px-10 align-center">
        <div className="flex flex-col items-left">
          <h4 className=" md:text-[28px] lg:text-2xl font-semibold uppercase tracking-tighter zilla-text">
            Ritesh Shukla
          </h4>
          <span className="text-sm uppercase opacity-50 font-semibold text-black tracking-tight">
            Main Page
          </span>
        </div>
        <nav>
          <ul className="flex row justify-between  md: gap-12 lg:gap-16">
            <li className="flex flex-col items-left">
              <a
                href="#"
                className="text-xl font-semibold text-black tracking-tighter"
              >
                About
              </a>
              <span className="text-sm uppercase opacity-50 font-semibold text-black tracking-tight">
                A lil about me
              </span>
            </li>
            <li className="flex flex-col items-left">
              <a
                href="#projects"
                className="text-xl font-semibold text-black tracking-tighter"
              >
                Portfolio
              </a>
              <span className="text-sm uppercase opacity-50 font-semibold text-black tracking-tight">
              The things i'm working on
              </span>
            </li>
            <li className="flex flex-col items-left">
              <a
                href="#contact"
                className="text-xl font-semibold text-black tracking-tighter"
              >
                Contact
              </a>
              <span className="text-sm uppercase opacity-50 font-semibold text-black tracking-tight">
                Platforms to reach me
              </span>
            </li>
          </ul>
        </nav>
      </div>
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center py-4 px-6">
        <div className="flex flex-col items-left">
          <h4 className="text-xl font-semibold uppercase tracking-tighter zilla-text">
            Ritesh Shukla
          </h4>
          <span className="text-sm opacity-50 font-semibold text-black tracking-tight uppercase">
            Main Page
          </span>
        </div>
        <button
          onClick={toggleMenu}
          className="text-3xl focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>
      {/* Mobile Menu */}

      {isMenuOpen && (
        <nav className="md:hidden fixed top-0 right-0 w-64 h-full shadow-lg z-50 transform transition-transform duration-300 ease-in-out bg-[#f0f1ed]">
          <div className="h-16 flex items-center justify-end px-6">
            <button
              onClick={toggleMenu}
              className="text-3xl focus:outline-none"
              aria-label="Close Menu"
            >
              ✕
            </button>
          </div>
          <ul className="flex flex-col py-4">
            <li className="px-6 py-3 flex flex-col">
              <a
                href="#"
                className="text-lg block font-semibold text-black tracking-tighter"
              >
                About
              </a>
              <span className="text-xs opacity-50 font-semibold text-black uppercase tracking-tight">
                A lil about me
              </span>
            </li>
            <li className="px-6 py-3 flex flex-col">
              <a
                href="#projects"
                className="text-lg block font-semibold text-black tracking-tighter"
              >
                Portfolio
              </a>
              <span className="text-xs opacity-50 font-semibold text-black uppercase tracking-tight">
                The things i'm working on
              </span>
            </li>
            <li className="px-6 py-3 flex flex-col">
              <a
                href="#contact"
                className="text-lg block font-semibold text-black tracking-tighter"
              >
                Contact
              </a>
              <span className="text-xs opacity-50 font-semibold text-black tracking-tight uppercase">
                Let's talk about project
              </span>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Header;
