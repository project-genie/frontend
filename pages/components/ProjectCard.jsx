import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import ButtonSecondary from "./ButtonSecondary";
import Image from "next/image";
import TaskExtendedChunk from "./TaskExtendedChunk";

const ProjectCard = ({
  id,
  name,
  description,
  role,
  userId,
  organizationId,
  type,
}) => {
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState(0);
  const [assignedTasks, setAssignedTasks] = useState(0);
  const [openTasks, setOpenTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [allCompletedTasks, setAllCompletedTasks] = useState(0);
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

        response.data.data.forEach((task) => {
          if (task.status !== "completed") {
            setOpenTasks(openTasks + 1);
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
    <div className="p-4 rounded-md bg-secondary-100 my-2 relative border border-secondary-600">
      <div className="absolute right-2 bottom-2 bg-secondary-600 p-3 rounded-full">
        <Image
          src={type === "waterfall" ? "/icons/water.svg" : "/icons/sprint.svg"}
          width={40}
          height={40}
          alt={type === "waterfall" ? "Waterfall" : "Sprint"}
        />
      </div>
      <div className="flex items-center justify-between">
        <div
          className="flex items-center justify-center"
          onClick={() => {
            router.push(`/organizations/${organizationId}/projects/${id}`);
          }}
        >
          <Image
            className="mr-1"
            src="/icons/folder.svg"
            alt="Folder"
            width={20}
            height={20}
          />
          <h2 className="text-sm text-neutral-800 underline mr-1 hover:cursor-pointer">
            {name}
          </h2>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex items-center justify-start">
            <p className="text-sm font-medium text-secondary-700 mr-2">
              {user.role}
            </p>
          </div>
          <div className="hover:cursor-pointer flex justify-center items-center">
            {user.role === "owner" ? (
              <Image
                src="/icons/settings.svg"
                width={24}
                height={24}
                alt="dots"
                onClick={() => {
                  router.push(
                    `/organizations/${organizationId}/projects/${id}/settings`
                  );
                }}
              />
            ) : null}
          </div>
        </div>
      </div>
      <div>
        <TaskExtendedChunk
          description="Members"
          text={members}
          icon="task_user"
        />
        <TaskExtendedChunk
          description="Open Tasks"
          text={openTasks}
          icon="brown_golf"
        />
        <TaskExtendedChunk
          description="Completed Tasks"
          text={allCompletedTasks}
          icon="brown_golf"
        />

        <TaskExtendedChunk
          description="Assigned Tasks"
          text={assignedTasks}
          icon="task_point"
        />
      </div>
    </div>
  );
};

export default ProjectCard;
