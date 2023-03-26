import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import SidebarLink from "../../SidebarLink";

const OrganizationSidebar = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center lg:block col-start-1 col-end-13 lg:col-start-1 lg:col-end-3 row-start-1 row-end-2 lg:row-start-1 lg:row-end-13 h-20 lg:min-h-screen bg-neutral-800">
      <div className="flex lg:flex-col justify-center items-center lg:h-full">
        <SidebarLink
          href={`/organizations/${router.query?.organization}`}
          text="Summary"
          isActive={router.pathname === `/organizations/[organization]`}
        />
        <SidebarLink
          href={`/organizations/${router.query?.organization}/projects`}
          text="Projects"
          isActive={
            router.pathname === `/organizations/[organization]/projects`
          }
        />
        <SidebarLink
          href={`/organizations/${router.query?.organization}/people`}
          text="People"
          isActive={router.pathname === `/organizations/[organization]/people`}
        />
        <SidebarLink
          href={`/organizations/${router.query?.organization}/settings`}
          text="Settings"
          isActive={
            router.pathname === `/organizations/[organization]/settings`
          }
        />
      </div>
    </div>
  );
};

export default OrganizationSidebar;
