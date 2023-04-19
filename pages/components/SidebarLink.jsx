import Image from "next/image";
import Link from "next/link";
import React from "react";

const SidebarLink = ({ href, text, isActive, icon }) => {
  return (
    <Link
      href={`${href}`}
      className={`${
        isActive && "bg-neutral-700"
      } mt-2 text-secondary-300 text-xs font-bold w-[80%] py-4 px-6 rounded-lg flex justify-left items-center hover:bg-neutral-600 }`}
    >
      <Image
        src={`/icons/${icon}.svg`}
        alt={icon}
        width={18}
        height={18}
        className="mr-1"
      />
      {text}
    </Link>
  );
};

export default SidebarLink;
