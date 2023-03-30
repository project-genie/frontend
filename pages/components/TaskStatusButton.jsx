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
      setColor("bg-neutral-100");
    }
  }, [status]);

  // const handleRemoveTask = async () => {
  //   try {
  //     const response = await axios.delete(
  //       `http://localhost:8080/api/tasks/${taskId}`,
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     toast.success(response.data.message);
  //     setTimeout(() => {
  //       window.location.reload();
  //     }, 1000);
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.response?.data.message);
  //   }
  // };
  return (
    <div
      className={`${color} px-2 py-1 text-sm lowercase rounded-lg flex justify-center items-center`}
    >
      <p>{status}</p>
    </div>
  );
};

export default TaskStatusButton;
