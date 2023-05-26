import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Button from "./Button";

const SprintRequirementListHeader = ({ user }) => {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center border-b border-b-secondary-400">
      <div className="flex justify-center items-center">
        <Image
          className="mr-1"
          src="/icons/article.svg"
          alt="Page with text"
          width={24}
          height={24}
        />
        <h1 className="font-bold uppercase text-neutral-800">Requirements</h1>
      </div>
      {user.role === "owner" && (
        <Button
          text={"Create Requirement"}
          handle={() => {
            router.push(
              `/organizations/${router.query?.organization}/projects/${router.query?.project}/sprints/${router.query?.sprint}/create-requirement`
            );
          }}
        />
      )}
    </div>
  );
};

export default SprintRequirementListHeader;
