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
    getUser();
  }, [router.isReady]);
  return (
    <OrganizationLayout>
      <ProjectListHeader user={user} />
      <ProjectList user={user} />
    </OrganizationLayout>
  );
};

export default Organization;
