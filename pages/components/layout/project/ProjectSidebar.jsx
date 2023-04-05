import React, { useState, useEffect } from "react";
import SidebarLink from "../../SidebarLink";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

const ProjectSidebar = ({ user }) => {
  const [project, setProject] = useState("");
  const router = useRouter();

  const getProject = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/projects/${router.query?.project}`,
      {
        withCredentials: true,
      }
    );
    setProject(response.data.data.name);
  };

  const [organization, setOrganization] = useState("");
  const getOrganization = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/organizations/${router.query?.organization}`,
      {
        withCredentials: true,
      }
    );
    setOrganization(response.data.data.name);
  };

  useEffect(() => {
    if (router.isReady) {
      getProject();
      getOrganization();
    }
  }, [router.isReady]);

  return (
    <div className="flex justify-center items-center lg:sticky lg:top-0 lg:h-screen lg:block col-start-1 col-span-full lg:col-start-1 lg:col-end-3 row-start-1 row-end-2 lg:row-start-1 lg:row-span-full h-20 bg-neutral-800">
      <div className="flex-col lg:flex justify-center items-center text-neutral-50 lg:mt-10 mr-10 lg:mr-0 font-light">
        <Link
          className="lg:flex flex-col justify-center items-center mb-5"
          href={`/organizations/${router.query?.organization}`}
        >
          <p className="font-bold text-xs text-secondary-300 uppercase">
            Organization
          </p>
          <p className="underline">{organization}</p>
        </Link>
        <Link
          className="lg:flex flex-col justify-center items-center"
          href={`/organizations/${router.query?.organization}/projects/${router.query?.project}`}
        >
          <p className="font-bold text-xs text-secondary-300 uppercase">
            Project
          </p>
          <p className="underline">{project}</p>
        </Link>
      </div>
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
