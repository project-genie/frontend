import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectCardTitle from "./ProjectCardTitle";
import { useRouter } from "next/router";

const ProjectCard = ({ id, name, description, role, userId }) => {
  const [assignedTasks, setAssignedTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [members, setMembers] = useState(0);
  const router = useRouter();

  const getTasks = async () => {
    await axios
      .get(`http://localhost:8080/api/tasks/project/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        let assigned = 0;
        response.data.data.forEach((task) => {
          if (task.assigneeId === userId) {
            assigned++;
          }
        });

        setAssignedTasks(assigned);

        let completed = 0;
        response.data.data.forEach((task) => {
          if (task.assigneeId === userId && task.status === "completed") {
            completed++;
          }
        });
        setCompletedTasks(completed);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getMembers = async () => {
    await axios
      .get(`http://localhost:8080/api/projects/${id}/members`, {
        withCredentials: true,
      })
      .then((response) => {
        setMembers(response.data.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTasks();
    getMembers();
  }, []);

  const handleProjectClick = () => {
    router.push(`/organizations/${router.query?.organization}/projects/${id}`);
  };
  return (
    <div
      className="p-4 bg-secondary-100 rounded-lg w-96 hover:bg-secondary-300 hover:cursor-pointer m-2 border-l-8 border-neutral-900"
      onClick={handleProjectClick}
    >
      <ProjectCardTitle title="Name" text={name} size="lg" />
      <ProjectCardTitle title="Description" text={description} size="sm" />
      <ProjectCardTitle title="Members" text={members} size="base" />
      <ProjectCardTitle title="Role" text={role} size="sm" />
      <ProjectCardTitle title="Assigned Tasks" text={assignedTasks} size="xl" />
      <ProjectCardTitle
        title="Completed Tasks"
        text={completedTasks}
        size="xl"
      />
    </div>
  );
};

export default ProjectCard;
