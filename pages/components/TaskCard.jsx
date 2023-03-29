import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import TaskStatusButton from "./TaskStatusButton";

const TaskCard = ({
  id,
  name,
  description,
  priority,
  status,
  assigneeId,
  createdBy,
  projectId,
  role,
  userId,
  user,
}) => {
  const [assignee, setAssignee] = useState({});
  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/users/${assigneeId}`,
        {
          withCredentials: true,
        }
      );
      setAssignee(response.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex md:flex-row flex-col justify-between items-center p-4 border border-secondary-300 rounded-lg my-2">
      <div>
        <h2 className="text-primary-500">{name}</h2>
        <p className="text-sm font-medium text-secondary-700">
          {assignee?.user?.name}
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
  );
};

export default TaskCard;
