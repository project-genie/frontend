import PeopleList from "@/pages/components/PeopleList";
import ProjectLayout from "@/pages/components/layout/project/ProjectLayout";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

const ProjectPeople = () => {
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
  return (
    <ProjectLayout>
      <div className="flex flex-col justify-center items-center">
        <div className="w-[80%] bg-secondary-50 rounded-lg mt-10">
          <PeopleList user={user} type="project" />
        </div>
      </div>
    </ProjectLayout>
  );
};

export default ProjectPeople;
