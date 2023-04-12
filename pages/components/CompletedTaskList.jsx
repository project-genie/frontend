import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CompletedTaskCard from "./CompletedTaskCard";

const CompletedTaskList = ({ user }) => {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/tasks/project/completed/${router.query?.project}`,
        {
          withCredentials: true,
        }
      );
      setTasks(response.data.data);
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      getTasks();
    }
  }, [router.isReady]);

  return (
    <div>
      <div className="">
        {tasks.map((task) => (
          <CompletedTaskCard
            key={task.id}
            id={task.id}
            name={task.name}
            description={task.description}
            priority={task.priority}
            status={task.status}
            assigneeId={task.user_id}
            dueDate={task.dueDate}
            createdBy={task.createdBy}
            createdAt={task.created_date}
            exception={task.exception}
            difficulty={task.difficulty}
            projectId={task.project_id}
            role={user.role}
            userId={user.id}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default CompletedTaskList;
