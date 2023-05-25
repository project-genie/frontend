import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

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
        <Link
          className="px-4 py-2 bg-primary-600 text-white rounded-md my-2 hover:bg-primary-500"
          href={`/organizations/${router.query?.organization}/projects/${router.query?.project}/sprints/create`}
        >
          Create Sprint
        </Link>
      )}
    </div>
  );
};

export default SprintListHeader;
