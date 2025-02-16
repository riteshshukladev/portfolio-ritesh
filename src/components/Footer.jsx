import React from "react";
import projectData from "../utils/projects.json";

const Footer = () => {
  return (
    <div className="pl-8 md:pl-30 lg:pl-60 pt-15 md:pt-30 pb-10 flex flex-col gap-16" id="contact">
      <div className="flex flex-col gap-8">
        <h6 className="text-black opacity-70 text-base md:text-lg pb-10 uppercase font-bold tracking-tight">
          Contacts
        </h6>
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold">
          riteshuklaa@gmail.com
        </h1>
        <div className="Contacts flex flex-row flex-wrap gap-12 lg:gap-16 mt-12">
          {projectData.Contacts.map((contact, index) => (
            <div key={index}>
              <a
                className="text-lg md:text-xl font-semibold text-black tracking-tighter"
                href={contact.link}
              >
                {contact.name}
              </a>
              <p className="text-xs md:text-sm uppercase opacity-50 font-semibold text-black tracking-tight">
                {contact.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/*  */}
      <div className="flex flex-col  items-end lg:items-end mr-10">
        <h4 className="text-xl md:text-[28px] lg:text-2xl font-semibold uppercase tracking-tighter opacity-60 zilla-text">
          Ritesh Shukla
        </h4>
        <span className="text-sm uppercase opacity-50 font-semibold text-black tracking-tight text-center">
          made by---
        </span>
      </div>
    </div>
  );
};

export default Footer;
