import React, { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import AccountUpdateForm from "../components/AccountUpdateForm";
import axios from "axios";
import Image from "next/image";
import ButtonError from "../components/ButtonError";
import { toast } from "react-toastify";

const Account = () => {
  const [organizations, setOrganizations] = useState([]);

  const getOrganizations = async () => {
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
    getOrganizations();
  }, []);

  const handleLeaveOrganization = async (id) => {
    await axios
      .post(
        `http://localhost:8080/api/organizations/${id}/leave`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        toast.error(error.response?.data.message);
      });
  };

  return (
    <MainLayout>
      {" "}
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center mt-10">
          <p className="text-base">Edit the account.</p>
        </div>
        <div className="w-[80%] bg-secondary-50 rounded-lg mt-10">
          <AccountUpdateForm />
        </div>
        <div className="w-[80%] bg-secondary-50 rounded-lg mt-10">
          {organizations.map((organization) => (
            <div
              key={organization.id}
              className="p-4 rounded-md bg-secondary-100 my-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex justify-center items-center">
                  <Image
                    className="mr-1"
                    src="/icons/corporation.svg"
                    alt="Corporation building"
                    width={24}
                    height={24}
                  />
                  <h2 className="text-neutral-800 mr-1">
                    {organization?.name}
                  </h2>
                </div>
                <div className="flex justify-center items-center">
                  <div>
                    <p className="text-xs font-medium text-secondary-700 mr-2">
                      {organization?.organization_members[0].role}
                    </p>
                  </div>
                  <div>
                    <ButtonError
                      handle={() => handleLeaveOrganization(organization.id)}
                      text={"Leave"}
                      disabled={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Account;
