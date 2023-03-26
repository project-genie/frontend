import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

const SidebarLink = ({ href, text, isActive }) => {
  return (
    <Link
      href={`${href}`}
      className={`${
        isActive && "bg-primary-700"
      } mt-2 text-neutral-50 text-xs font-light w-[80%] py-4 px-6 rounded-lg hover:bg-primary-700 }`}
    >
      {text}
    </Link>
  );
};

export default SidebarLink;
