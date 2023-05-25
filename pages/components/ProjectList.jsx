import React, { useEffect, useState } from "react";
import ProjectCard from "@/pages/components/ProjectCard";
import axios from "axios";
import ProjectListHeader from "./ProjectListHeader";

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
        console.log("resp: ", response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProjects();
  }, [user]);
  return (
    <div>
      <ProjectListHeader user={user} />
      <div className="">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            name={project.name}
            description={project.description}
            role={user.role}
            userId={user.id}
            organizationId={project.organizationId}
            type={project.type}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
