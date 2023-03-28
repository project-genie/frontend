import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import ButtonSecondary from "./ButtonSecondary";

const ProjectCard = ({
  id,
  name,
  description,
  role,
  userId,
  organizationId,
}) => {
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState(0);
  const [assignedTasks, setAssignedTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [allCompletedTasks, setAllCompletedTasks] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [members, setMembers] = useState(0);
  const router = useRouter();

  const getTasks = async () => {
    await axios
      .get(`http://localhost:8080/api/tasks/project/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setTasks(response.data.data.length);

        response.data.data.forEach((task) => {
          if (task.status === "completed") {
            setAllCompletedTasks(allCompletedTasks + 1);
          }
        });

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

  const getUser = async () => {
    await axios
      .get(`http://localhost:8080/api/projects/currentuserproject/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("User: ", user);
        setUser(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTasks();
    getMembers();
    getUser();
  }, []);

  return (
    <div className="flex md:flex-row flex-col justify-between items-center p-4 border border-secondary-300 rounded-lg my-2">
      <div className="flex items-center justify-start">
        <h2
          className="text-primary-500 underline mr-1 hover:cursor-pointer"
          onClick={() => {
            router.push(`/organizations/${organizationId}/projects/${id}`);
          }}
        >
          {name}
        </h2>
        <p className="text-sm font-medium text-secondary-700">{user.role}</p>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <div className="flex justify-start items-end mr-2">
            <p className="text-lg font-medium text-secondary-700">{tasks}</p>
            <span className="text-xs font-medium text-secondary-700">
              open tasks
            </span>
          </div>
          <div className="flex justify-start items-end mr-2">
            <p className="text-lg font-medium text-secondary-700">
              {assignedTasks}
            </p>
            <span className="text-xs font-medium text-secondary-700">
              assigned
            </span>
          </div>
          <div className="flex justify-start items-end mr-2">
            <p className="text-lg font-medium text-secondary-700">
              {completedTasks}
            </p>
            <span className="text-xs font-medium text-secondary-700">
              completed
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg font-medium text-secondary-700">
              {tasks ? Math.round((completedTasks / tasks) * 100) : 0}%
            </p>
          </div>
        </div>
      </div>

      <div>
        {user.role === "owner" ? (
          <ButtonSecondary
            text="Settings"
            handle={() => {
              router.push(
                `/organizations/${organizationId}/projects/${id}/settings`
              );
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ProjectCard;
