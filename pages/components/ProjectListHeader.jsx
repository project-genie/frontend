import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const ProjectListHeader = ({ user }) => {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center border-b border-b-secondary-400">
      <div className="flex justify-center items-center">
        <Image
          className="mr-1"
          src="/icons/folder.svg"
          alt="A folder"
          width={24}
          height={24}
        />
        <h1 className="font-bold uppercase text-neutral-800">Projects</h1>
      </div>
      {user?.role === "owner" && (
        <Link
          className="px-4 py-2 bg-primary-600 text-white rounded-md my-2 hover:bg-primary-500"
          href={`/organizations/${router.query?.organization}/projects/create`}
        >
          Create Project
        </Link>
      )}
    </div>
  );
};

export default ProjectListHeader;
