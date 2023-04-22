import ProjectLayout from "@/pages/components/layout/project/ProjectLayout";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import TaskList from "@/pages/components/TaskList";
import TasksLineChart from "@/pages/components/charts/TasksLineChart";

const Project = () => {
  const [user, setUser] = useState({});
  const router = useRouter();

  const [tasks, setTasks] = useState([]);
  const [tasksData, setTasksData] = useState([]);

  const getTasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/tasks/open/project/${router.query?.project}`,
        {
          withCredentials: true,
        }
      );
      setTasks(response?.data.data);
      const filteredData = response.data.data.map((item) => {
        const date = new Date(item.created_date);

        const myDate = date.toLocaleDateString();

        return {
          created_date: myDate,
        };
      });

      setTasksData(filteredData);
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  const getUser = async () => {
    await axios
      .get(
        `http://localhost:8080/api/projects/currentuserproject/${router.query?.project}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setUser(response.data.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  useEffect(() => {
    if (router.isReady) {
      getUser();
      getTasks();
    }
  }, [router.isReady]);

  return (
    <ProjectLayout>
      <div className="flex flex-col justify-center items-center">
        <div className="w-[90%] bg-secondary-50">
          <TasksLineChart data={tasksData} />
        </div>
        <div className="w-[80%] bg-secondary-50 rounded-lg mt-10">
          <TaskList user={user} />
        </div>
      </div>
    </ProjectLayout>
  );
};

export default Project;
