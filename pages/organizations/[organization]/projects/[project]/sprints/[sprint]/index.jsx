import ProjectLayout from "@/pages/components/layout/project/ProjectLayout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import SprintHeader from "@/pages/components/SprintHeader";

const Sprint = () => {
  const [sprint, setSprint] = useState({});
  const [user, setUser] = useState({});

  const router = useRouter();

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
    }
  }, [router.isReady]);

  const getSprint = async () => {
    try {
      await axios
        .get(
          `http://localhost:8080/api/projects/sprint/${router.query?.sprint}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log("sinlge sprint: ", res.data.data);
          setSprint(res.data.data);
        });
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      getSprint();
    }
  }, [router.isReady]);

  return (
    <ProjectLayout>
      <div className="flex flex-col justify-center items-center m-2">
        <SprintHeader
          name={sprint.name}
          description={sprint.description}
          startDate={sprint.startDate}
          endDate={sprint.endDate}
          user={user}
          phase={sprint.phase}
        />
      </div>
      <div>ı am sprint</div>
    </ProjectLayout>
  );
};

export default Sprint;
