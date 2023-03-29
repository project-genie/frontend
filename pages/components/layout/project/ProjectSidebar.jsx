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
          href={`/organizations/${router.query?.organization}/projects/${router.query?.project}`}
          text="Summary"
          isActive={
            router.pathname ===
            `/organizations/[organization]/projects/[project]`
          }
        />
        <SidebarLink
          href={`/organizations/${router.query?.organization}/projects/${router.query?.project}/tasks`}
          text="Tasks"
          isActive={
            router.pathname ===
            `/organizations/[organization]/projects/[project]/tasks`
          }
        />
        <SidebarLink
          href={`/organizations/${router.query?.organization}/projects/${router.query?.project}/people`}
          text="People"
          isActive={
            router.pathname ===
            `/organizations/[organization]/projects/[project]/people`
          }
        />
        {user.role === "owner" && (
          <SidebarLink
            href={`/organizations/${router.query?.organization}/projects/${router.query?.project}/settings`}
            text="Settings"
            isActive={
              router.pathname ===
              `/organizations/[organization]/projects/[project]/settings`
            }
          />
        )}
      </div>
    </div>
  );
};

export default ProjectSidebar;
