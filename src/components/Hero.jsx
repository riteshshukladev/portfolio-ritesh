import React from "react";

const Hero = () => {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 lg:gap-32 px-6 md:px-0 relative">
      <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-[#DFDBCB] animate-pulse flex-shrink-0" />
      <div className="w-full md:w-[40%] flex flex-col gap-2 text-base md:text-lg tracking-tight">
        <p>
          <strong>Diary</strong> — because I'll note down the what, how, and why of anything I do, and document it here.
        </p>
        <p>
          Hi, this is Ritesh. Here I'll share with the world my learnings and whatever I'm into. You can expect:
        </p>
        <ul className="list-disc pl-5 flex flex-col gap-0 text-base text-[#56544D] tracking-[0.01em]">
          <li>Projects that I've built</li>
          <li>Backend-related stuff — specifically Go, systems, and projects</li>
          <li>Math</li>
          <li>Teachings from the Upanishads and the Gita</li>
        </ul>
        
        <div className="mt-2">
          <p className="mb-2">Here are my socials — if anything's on your mind, please let me know.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <a
              href="https://github.com/riteshshukladev"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-[0.85]"
              style={{ textDecoration: "underline", textDecorationThickness: "0.5px" }}
            >
              Github
            </a>
            <a
              href="https://www.linkedin.com/in/ritesh-shukla-475078244/"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-[0.85]"
              style={{ textDecoration: "underline", textDecorationThickness: "0.5px" }}
            >
              LinkedIn
            </a>
            <a
              href="https://x.com/Riteshukla_04"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-[0.85]"
              style={{ textDecoration: "underline", textDecorationThickness: "0.5px" }}
            >
              X
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
