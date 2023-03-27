import React from "react";
import ProjectCardElementTitle from "./ProjectCardElementTitle";

const ProjectCardTitle = ({ title, text, size }) => {
  return (
    <div className="flex flex-col justify-start items-start my-2">
      <ProjectCardElementTitle title={title} />
      <p className={`text-${size} text-neutral-800`}>{text}</p>
    </div>
  );
};

export default ProjectCardTitle;
