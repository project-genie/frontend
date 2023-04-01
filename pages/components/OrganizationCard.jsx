import React, { useState, useEffect } from "react";
import ButtonSecondary from "./ButtonSecondary";
import ButtonError from "./ButtonError";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

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

  const handleLeaveOrganization = () => {
    axios
      .post(
        `http://localhost:8080/api/organizations/${organization?.id}/leave`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        toast.success("You have left the organization.");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="flex md:flex-row flex-col justify-between items-center p-4 border border-secondary-300 rounded-lg my-2">
      <div className="flex items-center justify-start">
        <h2
          className="text-primary-500 underline mr-1 hover:cursor-pointer"
          onClick={() => {
            router.push(`/organizations/${organization?.id}`);
          }}
        >
          {organization?.name}
        </h2>
        <p className="text-sm font-medium text-secondary-700">
          {organization?.organization_members[0].role}
        </p>
      </div>
      <div>
        {user.role === "owner" && (
          <ButtonSecondary
            text="Settings"
            handle={() => {
              router.push(`/organizations/${organization?.id}/settings`);
            }}
          />
        )}

        <ButtonError text="Leave" handle={handleLeaveOrganization} />
      </div>
    </div>
  );
};

export default OrganizationCard;
