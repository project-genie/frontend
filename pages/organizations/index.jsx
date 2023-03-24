import React, { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../components/layout/MainLayout";
import { useRouter } from "next/router";
import Button from "../components/Button";

const Organizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const router = useRouter();
  const handleFetch = async () => {
    console.log("Fetch Orgs");
    await axios
      .get("http://localhost:8080/api/organizations", {
        withCredentials: true,
      })
      .then((response) => {
        setOrganizations(response.data.data);
        console.log("Organizations: ", response);
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
      <div className="m-20">
        <div className="w-[90%] border border-black flex flex-col items-start">
          {/* HERO */}
          <div className="flex justify-between items-start p-4 w-full">
            <h1 className="text-xl font-medium underline">Organizations</h1>
            <Button
              text="Create Organization"
              handle={() => router.push("/organizations/create")}
            />
          </div>
          {/* SELECT COMPONENT WRAPPER*/}
          <div className="flex justify-center">
            {/* SELECT COMPONENT*/}
            <ul className="flex flex-col justify-center items-start">
              {organizations?.map((organization) => (
                <li
                  key={organization.organization.id}
                  className="flex justify-center items-center p-4 m-4 bg-secondary-400 rounded-lg cursor-pointer hover:bg-secondary-500 w-[10rem] h-[10rem]"
                  onClick={() =>
                    router.push(
                      `/organizations/${organization.organization.id}`
                    )
                  }
                >
                  <h1 className="text-sm font-medium">
                    {organization.organization.name}
                  </h1>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Organizations;
