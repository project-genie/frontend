import PeopleList from "@/pages/components/PeopleList";
import OrganizationLayout from "@/pages/components/layout/organization/OrganizationLayout";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import PeopleInviteList from "@/pages/components/PeopleInviteList";

const OrganizationPeople = () => {
  const [user, setUser] = useState({});
  const router = useRouter();

  const getUser = async () => {
    console.log("ROUTER!:", router.query.organization);
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
        <div className="w-[80%] bg-secondary-50 rounded-lg mt-10">
          <PeopleList user={user} type="organization" />
        </div>
        <div className="w-[80%] bg-secondary-50 rounded-lg mt-10">
          <PeopleInviteList user={user} />
        </div>
      </div>
    </OrganizationLayout>
  );
};

export default OrganizationPeople;
