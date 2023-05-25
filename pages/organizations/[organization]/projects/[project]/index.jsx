import ProjectLayout from "@/pages/components/layout/project/ProjectLayout";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import TaskList from "@/pages/components/TaskList";
import TasksPieChart from "@/pages/components/charts/TasksPieChart";
import SprintList from "@/pages/components/SprintList";

const Project = () => {
  const [user, setUser] = useState({});
  const router = useRouter();

  const [project, setProject] = useState({});
  const [tasks, setTasks] = useState([]);
  const [tasksData, setTasksData] = useState([]);
  const [tasksByNumber, setTasksByNumber] = useState([]);

  const getProject = async () => {
    try {
      await axios
        .get(`http://localhost:8080/api/projects/${router.query?.project}`, {
          withCredentials: true,
        })
        .then((res) => {
          setProject(res.data.data);
        });
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };
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

  const getTasksByNumber = async () => {
    await axios
      .get(
        `http://localhost:8080/api/projects/tasks/${router.query?.project}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setTasksByNumber(response.data.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  useEffect(() => {
    if (router.isReady) {
      getUser();
      getTasks();
      getTasksByNumber();
      getProject();
    }
  }, [router.isReady]);

  return (
    <ProjectLayout>
      <div className="flex flex-col justify-center items-center">
        {tasks.length > 0 && (
          <div className="w-[90%] bg-secondary-50 h-[400px]">
            <TasksPieChart data={tasksByNumber} />
          </div>
        )}

        {project.type === "agile" && (
          <div className="w-[80%] bg-secondary-50 rounded-lg mt-10">
            <SprintList user={user} />
          </div>
        )}

        <div className="w-[80%] bg-secondary-50 rounded-lg mt-10">
          <TaskList user={user} />
        </div>
      </div>
    </ProjectLayout>
  );
};

export default Project;
