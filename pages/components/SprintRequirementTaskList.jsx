import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import TaskCard from "./TaskCard";

const SprintRequirementTaskList = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  const getTasksRequirement = async () => {
    await axios
      .get(
        `http://localhost:8080/api/tasks/sprintrequirement/${router.query?.requirement}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setTasks(res.data.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    if (router.isReady) {
      getTasksRequirement();
    }
  }, [router.isReady]);
  return (
    <div>
      {tasks.map((task) => (
        <TaskCard
          id={task.id}
          name={task.name}
          description={task.description}
          priority={task.priority}
          status={task.status}
          assigneeId={task.assigneeId}
          createdAt={task.created_date}
          startedAt={task.startedAt}
          exception={task.exception}
          difficulty={task.difficulty}
          user={user}
          predicted_work_hours={task.predicted_work_hours}
        />
      ))}
    </div>
  );
};

export default SprintRequirementTaskList;
