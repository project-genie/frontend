import React from "react";
import ButtonSecondary from "./ButtonSecondary";
import ButtonError from "./ButtonError";
import { useRouter } from "next/router";

const OrganizationCard = ({ organization }) => {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center p-4 border border-secondary-300 rounded-lg my-2">
      <div className="flex items-center justify-start">
        <h2
          className="text-primary-500 underline mr-1 hover:cursor-pointer"
          onClick={() => {
            router.push(`/organizations/${organization.organization.id}`);
          }}
        >
          {organization.organization.name}
        </h2>
        <p className="text-sm font-medium text-secondary-700">
          {organization.role}
        </p>
      </div>
      <div>
        <ButtonSecondary
          text="Settings"
          handle={() => {
            router.push(
              `/organizations/${organization.organization.id}/settings`
            );
          }}
        />
        <ButtonError text="Leave" />
      </div>
    </div>
  );
};

export default OrganizationCard;
