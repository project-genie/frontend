import React, { useEffect, useState } from "react";
import ProjectCard from "@/pages/components/ProjectCard";
import axios from "axios";

const ProjectList = ({ user }) => {
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    let url = "";
    if (user.role === "owner") {
      url = `http://localhost:8080/api/projects/organization/${user.organizationId}`;
    } else {
      url = `http://localhost:8080/api/projects/organization/currentuser/${user.organizationId}`;
    }
    await axios
      .get(url, {
        withCredentials: true,
      })
      .then((response) => {
        setProjects(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProjects();
  }, [user]);
  return (
    <div className="p-2 m-2 flex flex-wrap">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          name={project.name}
          description={project.description}
          role={user.role}
          userId={user.id}
        />
      ))}
    </div>
  );
};

export default ProjectList;
