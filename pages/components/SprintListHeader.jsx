import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Button from "./Button";

const SprintListHeader = ({ user }) => {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center border-b border-b-secondary-400">
      <div className="flex justify-center items-center">
        <Image
          className="mr-1"
          src="/icons/sprint-brown.svg"
          alt="Sprinting man"
          width={24}
          height={24}
        />
        <h1 className="font-bold uppercase text-neutral-800">Sprints</h1>
      </div>
      {user.role === "owner" && (
        <Button
          text={"Create Sprint"}
          handle={() => {
            router.push(
              `/organizations/${router.query?.organization}/projects/${router.query?.project}/sprints/create`
            );
          }}
        />
      )}
    </div>
  );
};

export default SprintListHeader;
