import React, { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../components/layout/MainLayout";
import OrganizationList from "../components/OrganizationList";

const Organizations = () => {
  const [organizations, setOrganizations] = useState([]);

  const handleFetch = async () => {
    await axios
      .get("http://localhost:8080/api/organizations", {
        withCredentials: true,
      })
      .then((response) => {
        setOrganizations(response.data.data);
      })
      .catch((error) => {
        console.log("Error occured!: ", error);
      });
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center mt-10">
          <p className="text-base">Select an organization.</p>
        </div>
        <div className="w-[80%] bg-secondary-50 rounded-lg mt-10">
          <OrganizationList organizations={organizations} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Organizations;
