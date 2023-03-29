import React, { useState, useEffect } from "react";
import MainHeader from "../MainHeader";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import ProjectSidebar from "./ProjectSidebar";

const ProjectLayout = ({ children }) => {
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
    <div className="flex flex-col w-full">
      <MainHeader />
      <div className="grid grid-cols-12 grid-rows-12">
        <ProjectSidebar user={user} />

        <div className="col-start-1 col-end-13 lg:col-start-3 lg:col-end-13 row-start-2 row-end-13 lg:row-start-1 lg:row-end-13">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProjectLayout;
