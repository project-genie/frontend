import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TaskStatusButton = ({ status, assigneeId, user, taskId }) => {
  const [color, setColor] = useState("");
  const [isStatutesOpen, setIsStatutesOpen] = useState(false);

  useEffect(() => {
    if (status === "in-progress") {
      setColor("bg-warning-100");
    } else if (status === "done") {
      setColor("bg-success-200");
    } else if (status === "backlog") {
      setColor("bg-neutral-100");
    } else if (status === "todo") {
      setColor("bg-primary-300");
    }
  }, [status]);

  const handleOpenStatutes = () => {
    if (user?.id === assigneeId || user.role === "owner") {
      setIsStatutesOpen(!isStatutesOpen);
    }
  };

  const handleChangeStatus = async (status) => {
    if (user?.id !== assigneeId && user.role !== "owner") {
      toast.error("You are not authorized to change the status of this task");
    }

    let body = {
      status: "",
    };
    switch (status) {
      case "backlog":
        body.status = "backlog";
        break;
      case "todo":
        body.status = "todo";
        break;
      case "in-progress":
        body.status = "in-progress";
        break;
      case "done":
        body.status = "done";
        break;
      case "Remove":
        setColor("bg-error-300");
        break;
      default:
        break;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/tasks/${taskId}`,
        body,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message);
    }
  };

  const handleRemoveTask = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/tasks/${taskId}`,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message);
    }
  };
  return (
    <div
      className={`${color} py-2 px-4 text-sm lowercase rounded-lg flex justify-center items-center hover:cursor-pointer hover:border hover:border-secondary-200 relative`}
      onClick={handleOpenStatutes}
    >
      <p>{status}</p>
      {(user?.id === assigneeId || user.role === "owner") && (
        <div className="flex flex-row justify-between ml-2">
          <Image src="/icons/arrow.svg" alt="arrow" width={16} height={16} />
        </div>
      )}
      {isStatutesOpen && (
        <div className="bg-secondary-300 rounded-lg w-28 absolute top-10 right-0 z-50">
          <ul className="flex flex-col justify-start items-center h-full w-full">
            <li
              onClick={() => {
                handleChangeStatus("backlog");
              }}
              className="p-2 text-sm text-neutral-800 bg-secondary-500 hover:bg-secondary-400 w-full flex justify-center rounded-tl-lg rounded-tr-lg hover:cursor-pointer"
            >
              backlog
            </li>
            <li
              onClick={() => {
                handleChangeStatus("todo");
              }}
              className="text-neutral-50 p-2 text-sm bg-primary-500 hover:bg-primary-400 w-full flex justify-center hover:cursor-pointer"
            >
              todo
            </li>
            <li
              onClick={() => {
                handleChangeStatus("in-progress");
              }}
              className="text-neutral-50 p-2 text-sm bg-warning-200 hover:bg-warning-100 w-full flex justify-center hover:cursor-pointer"
            >
              in-progress
            </li>
            <li
              onClick={() => {
                handleChangeStatus("done");
              }}
              className="text-neutral-50 p-2 text-sm bg-success-200 hover:bg-success-100 w-full flex justify-center hover:cursor-pointer"
            >
              done
            </li>
            <li
              onClick={() => {
                handleRemoveTask();
              }}
              className="p-2 text-sm text-neutral-50 bg-error-300 hover:bg-error-400 w-full flex justify-center rounded-bl-lg rounded-br-lg hover:cursor-pointer"
            >
              Remove
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TaskStatusButton;
