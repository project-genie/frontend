import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import TaskStatusButton from "./TaskStatusButton";
import Image from "next/image";
import TaskExtendedChunk from "./TaskExtendedChunk";

const TaskCard = ({
  id,
  name,
  description,
  priority,
  status,
  assigneeId,
  createdAt,
  updatedAt,
  exception,
  difficulty,
  projectId,
  role,
  userId,
  user,
}) => {
  const [assignee, setAssignee] = useState({});
  const [showExtendedTaskView, setShowExtendedTaskView] = useState(false);
  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/users/${assigneeId}`,
        {
          withCredentials: true,
        }
      );
      setAssignee(response.data.user);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleExtendedTaskView = () => {
    setShowExtendedTaskView(!showExtendedTaskView);
  };
  return (
    <>
      <div className="flex flex-col p-4 border border-secondary-300 rounded-lg my-2">
        <div className="flex md:flex-row flex-col justify-between items-center rounded-lg w-full">
          <div onClick={handleExtendedTaskView}>
            <h2 className="text-primary-500 underline hover:cursor-pointer">
              {name}
            </h2>
            <p className="text-sm font-medium text-secondary-700 underline hover:cursor-pointer">
              {assignee?.name}
            </p>
          </div>
          <div>
            <TaskStatusButton
              id={id}
              status={status}
              assigneeId={assigneeId}
              user={user}
              taskId={id}
            />
          </div>
        </div>
        {showExtendedTaskView && (
          <div className="flex md:flex-col flex-col justify-between items-center p-4 rounded-lg my-2">
            <div className="mb-10">
              <h2 className="text-primary-500 text-lg">{name}</h2>
              <p className="text-sm font-medium text-neutral-700">
                {description}
              </p>
            </div>
            <div className="flex justify-around items-start w-full">
              <div>
                <TaskExtendedChunk
                  description="Assignee"
                  text={assignee?.name}
                />
                <TaskExtendedChunk description="Created At" text={createdAt} />
                <TaskExtendedChunk description="Updated At" text={updatedAt} />
                <TaskExtendedChunk description="Priority" text={priority} />
              </div>
              <div>
                <TaskExtendedChunk description="Difficulty" text={difficulty} />
                <TaskExtendedChunk description="Status" text={status} />
                <TaskExtendedChunk
                  description="Exception"
                  text={exception ? "Yes" : "No"}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TaskCard;
