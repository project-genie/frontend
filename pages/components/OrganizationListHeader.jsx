import React from "react";
import Image from "next/image";
import Link from "next/link";

const OrganizationListHeader = () => {
  return (
    <div className="flex justify-between items-center border-b border-b-secondary-400">
      <div className="flex justify-center items-center">
        <Image
          className="mr-1"
          src="/icons/corporation.svg"
          alt="Corporation building"
          width={24}
          height={24}
        />
        <h1 className="font-bold uppercase text-neutral-800">Organizations</h1>
      </div>
      <Link
        className="px-4 py-2 bg-primary-600 text-white rounded-md my-2 hover:bg-primary-500"
        href={"/organizations/create"}
      >
        Create Organization
      </Link>
    </div>
  );
};

export default OrganizationListHeader;
