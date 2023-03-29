import React from "react";
import SidebarLink from "../../SidebarLink";
import { useRouter } from "next/router";

const ProjectSidebar = ({ user }) => {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center lg:sticky lg:top-0 lg:h-screen lg:block col-start-1 col-span-full lg:col-start-1 lg:col-end-3 row-start-1 row-end-2 lg:row-start-1 lg:row-span-full h-20 bg-neutral-800">
      <div></div>
      <div className="flex lg:flex-col lg:justify-start justify-center items-center lg:mt-4">
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
        {user.role === "owner" && (
          <SidebarLink
            href={`/organizations/${router.query?.organization}/settings`}
            text="Settings"
            isActive={
              router.pathname === `/organizations/[organization]/settings`
            }
          />
        )}
      </div>
    </div>
  );
};

export default ProjectSidebar;
