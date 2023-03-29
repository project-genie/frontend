import React, { useState, useEffect } from "react";
import TaskListHeader from "./TaskListHeader";
import TaskCard from "./TaskCard";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const TaskList = ({ user }) => {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/tasks/project/${router.query?.project}`,
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
      <TaskListHeader />
      <div className="">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            name={task.name}
            description={task.description}
            priority={task.priority}
            status={task.status}
            assigneeId={task.assigneeId}
            createdBy={task.createdBy}
            createdAt={task.createdAt}
            exception={task.exception}
            difficulty={task.difficulty}
            updatedAt={task.updatedAt}
            projectId={task.projectId}
            role={user.role}
            userId={user.id}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
