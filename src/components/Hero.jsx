import React from "react";

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
    </div>
  );
};

export default Hero;
