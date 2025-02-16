import React from "react";
import { homeContacts } from "../utils/projects.json";

const Hero = () => {
  return (
    <div className="h-[calc(100vh-80px)] flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 lg:gap-32 px-6 md:px-0 relative">
      <h1 className="text-7xl md:text-8xl xl:text-[144px] font-bold">
        Hello <br /> World
      </h1>
      <div className="w-ful md:w-[30%] flex flex-col gap-4">
        <h6 className="text-base md:text-lg tracking-tight">
          Namaste! <span className="underline">Ritesh</span> here. A software dev who finds chill in
          building complex, functional, and simplistically beautiful products.
        </h6>
        {/* Rest of the text */}
        <div className="text-base md:text-lg tracking-tight">
          Uses my ability to code products along with AI tools for building
          products faster and better than expected.
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 py-6 px-6 md:px-10 flex justify-left gap-4">
        {homeContacts.map((contact, index) => (
          <a
            key={index}
            href={contact.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 hover:opacity-80 transition-opacity"
          >
            <img
              src={contact.icon}
              alt={contact.name}
              className="w-full h-full object-contain"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Hero;
