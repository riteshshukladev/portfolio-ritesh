import React,{memo} from 'react';

const ProjectPage = memo(({ children }) => {
  return (
    <div className="screen">
      {/* Base Background */}
      <div className="base-background"></div>
          
      {/* Grainy Background */}
      <div className="background"></div>
          
      {/* Content */}
      <div className="content">
        {children}
      </div>
    </div>
  );
});

export default ProjectPage;