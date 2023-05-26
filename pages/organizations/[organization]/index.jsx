import React, { useState, useEffect } from "react";
import OrganizationLayout from "../../components/layout/organization/OrganizationLayout";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import ProjectList from "@/pages/components/ProjectList";
import AllProjectsTasksChart from "@/pages/components/charts/AllProjectsTasksChart";

const Organization = () => {
  const [user, setUser] = useState({});
  const router = useRouter();
  const [tasksData, setTasksData] = useState([]);

  const getUser = async () => {
    await axios
      .get(
        `http://localhost:8080/api/organizations/currentuserorganization/${router.query?.organization}`,
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

  const getTasksData = async () => {
    await axios
      .get(
        `http://localhost:8080/api/organizations/projects/tasks/${router.query?.organization}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("received data", response.data.data);
        setTasksData(response.data.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  useEffect(() => {
    if (router.isReady) {
      getUser();
      getTasksData();
    }
  }, [router.isReady]);

  return (
    <OrganizationLayout>
      <div className="flex flex-col justify-center items-center">
        {tasksData.length > 0 && (
          <div className="w-[80%] bg-secondary-50 rounded-lg mt-10 h-[300px]">
            <AllProjectsTasksChart data={tasksData} />
          </div>
        )}

        <div className="flex justify-center items-center mt-10">
          <p className="text-sm uppercase font-bold text-secondary-900">
            Select a project.
          </p>
        </div>
        <div className="w-[80%] bg-secondary-50 rounded-lg mt-10">
          <ProjectList user={user} />
        </div>
      </div>
    </OrganizationLayout>
  );
};

export default Organization;
