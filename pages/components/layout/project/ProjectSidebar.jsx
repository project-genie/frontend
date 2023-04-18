import React, { useState, useEffect } from "react";
import SidebarLink from "../../SidebarLink";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";

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
        <div className="flex-col justify-center items-center">
          <Link
            className="flex justify-left items-center mb-5"
            href={`/organizations/${router.query?.organization}`}
          >
            <div className="flex justify-center items-center">
              <Image
                src="/icons/brown_corporate.svg"
                width={18}
                height={18}
                alt="corporate building"
                className="mr-1"
              />

              <p className="font-bold text-xs text-secondary-300 uppercase">
                {organization}
              </p>
            </div>
          </Link>
          <Link
            className="lg:flex flex-col justify-center items-center"
            href={`/organizations/${router.query?.organization}/projects/${router.query?.project}`}
          >
            <div className="flex justify-left items-left w-full">
              <Image
                src="/icons/brown_project.svg"
                width={18}
                height={18}
                alt="brown folder"
                className="mr-1"
              />
              <p className="font-bold text-xs text-primary-400 uppercase">
                {project}
              </p>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex lg:flex-col lg:justify-start justify-center items-center lg:mt-4">
        <SidebarLink
          href={`/organizations/${router.query?.organization}/projects/${router.query?.project}`}
          text="Summary"
          isActive={
            router.pathname ===
            `/organizations/[organization]/projects/[project]`
          }
          icon={"dashboard"}
        />
        <SidebarLink
          href={`/organizations/${router.query?.organization}/projects/${router.query?.project}/tasks`}
          text="Tasks"
          isActive={
            router.pathname ===
            `/organizations/[organization]/projects/[project]/tasks`
          }
          icon={"brown_golf"}
        />
        <SidebarLink
          href={`/organizations/${router.query?.organization}/projects/${router.query?.project}/completedtasks`}
          text="Completed Tasks"
          isActive={
            router.pathname ===
            `/organizations/[organization]/projects/[project]/completedtasks`
          }
          icon={"check_circle"}
        />
        <SidebarLink
          href={`/organizations/${router.query?.organization}/projects/${router.query?.project}/people`}
          text="People"
          isActive={
            router.pathname ===
            `/organizations/[organization]/projects/[project]/people`
          }
          icon={"users"}
        />
        {user.role === "owner" && (
          <SidebarLink
            href={`/organizations/${router.query?.organization}/projects/${router.query?.project}/settings`}
            text="Settings"
            isActive={
              router.pathname ===
              `/organizations/[organization]/projects/[project]/settings`
            }
            icon={"settings"}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectSidebar;
