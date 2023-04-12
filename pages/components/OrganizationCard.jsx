import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";

const OrganizationCard = ({ organization }) => {
  const [user, setUser] = useState({});
  const router = useRouter();

  const getUser = async () => {
    await axios
      .get(
        `http://localhost:8080/api/organizations/currentuserorganization/${organization?.id}`,
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
  }, []);

  return (
    <div className="p-4 rounded-md bg-secondary-100 my-2">
      <div className="flex items-center justify-between">
        <div
          onClick={() => {
            router.push(`/organizations/${organization?.id}`);
          }}
          className="flex justify-center items-center"
        >
          <Image
            className="mr-1"
            src="/icons/corporation.svg"
            alt="Corporation building"
            width={24}
            height={24}
          />
          <h2 className="text-neutral-800 underline mr-1 hover:cursor-pointer">
            {organization?.name}
          </h2>
        </div>
        <div className="hover:cursor-pointer flex justify-center items-center">
          <div>
            <p className="text-xs font-medium text-secondary-700 mr-2">
              {organization?.organization_members[0].role}
            </p>
          </div>
          {user.role === "owner" && (
            <Image
              src="/icons/dots-black.svg"
              width={24}
              height={24}
              alt="dots"
              onClick={() => {
                router.push(`/organizations/${organization?.id}/settings`);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationCard;
