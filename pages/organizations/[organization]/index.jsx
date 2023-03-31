import React, { useState, useEffect } from "react";
import OrganizationLayout from "../../components/layout/organization/OrganizationLayout";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import ProjectListHeader from "@/pages/components/ProjectListHeader";
import ProjectList from "@/pages/components/ProjectList";

const Organization = () => {
  const [user, setUser] = useState({});
  const router = useRouter();

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

  useEffect(() => {
    if (router.isReady) {
      getUser();
    }
  }, [router.isReady]);
  return (
    <OrganizationLayout>
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center mt-10">
          <p className="text-base">Select a project.</p>
        </div>
        <div className="w-[80%] bg-secondary-50 rounded-lg mt-10">
          <ProjectList user={user} />
        </div>
      </div>
    </OrganizationLayout>
  );
};

export default Organization;
