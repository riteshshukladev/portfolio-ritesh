import React from "react";
import ProjectPage from "./layouts/ProjectPage";
import projectData from "../utils/projects.json";

const Projects = () => {
  return (
    <ProjectPage>
      <div className="min-h-screen px-8 md:px-30 lg:px-60 py-15 md:py-30" id="projects">
        <h6 className="text-[#3d3d3d] text-base  pb-10 uppercase font-bold">
          Recent Projects/ <span>{projectData.projects.length}</span>
        </h6>
        <div className="projects grid grid-cols-1 md:grid-cols-2   gap-8 md:gap-4 lg:gap-12">
          {projectData.projects.map((project, index) => (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              className="group relative overflow-hidden rounded-lg transition-transform hover:scale-101"
            >
              <div className="relative h-[300px] w-full">
                <img
                  src={project.image}
                  alt={project.name}
                  className="h-full w-full object-cover"
                />

                {/* Overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 py-2 px-4 text-white">
                  <h3 className="text-lg md:text-xl mb-2 font-normal opacity-70">
                    {project.name}
                  </h3>
                  <p
                    className={`text-xs mb-4 uppercase font-light opacity-90 ${
                      index % 2 === 0 ? "text-gray-400" : "text-[#f0f1ed]"
                    }`}
                  >
                    {project.description}
                  </p>
                </div>

                {/* Year - Moved inside the relative container */}
                <span className="absolute top-4 right-4 text-white text-[10px] opacity-70">
                  {project.year}
                </span>
              </div>
            </a>
          ))}

          <div className="bg-transparent w-full h-[300px]">
            <div className="h-full w-full flex items-center justify-center">
              <h6 className="text-base text-[#3d3d3d] font-medium">
                Future projects will be here🫡
              </h6>
            </div>
          </div>
        </div>
      </div>
    </ProjectPage>
  );
};

export default Projects;
