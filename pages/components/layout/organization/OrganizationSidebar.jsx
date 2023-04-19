import React, { useEffect } from "react";
import SidebarLink from "../../SidebarLink";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";

const OrganizationSidebar = ({ user }) => {
  const [organization, setOrganization] = React.useState("");
  const router = useRouter();

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
      getOrganization();
    }
  }, [router.isReady]);
  return (
    <div className="flex justify-center items-center lg:sticky lg:top-0 lg:h-screen lg:block col-start-1 col-span-full lg:col-start-1 lg:col-end-3 row-start-1 row-end-2 lg:row-start-1 lg:row-span-full h-20 bg-neutral-800">
      <div className="flex-col lg:flex justify-center items-center text-neutral-50 lg:mt-10 mr-10 lg:mr-0 font-light">
        <Link
          className="lg:flex flex-col justify-center items-center"
          href={`/organizations/${router.query?.organization}`}
        >
          <div className="flex justify-center items-center">
            <Image
              src="/icons/brown_corporate.svg"
              width={18}
              height={18}
              alt="corporation building"
              className="mr-1"
            />
            <p className="font-bold text-xs text-neutral-100 uppercase underline">
              {organization}
            </p>
          </div>
        </Link>
      </div>
      <div className="flex lg:flex-col lg:justify-start justify-center items-center lg:mt-4">
        <SidebarLink
          href={`/organizations/${router.query?.organization}`}
          text="Summary"
          isActive={router.pathname === `/organizations/[organization]`}
          icon={"dashboard"}
        />
        <SidebarLink
          href={`/organizations/${router.query?.organization}/projects`}
          text="Projects"
          isActive={
            router.pathname === `/organizations/[organization]/projects`
          }
          icon={"brown_folder"}
        />
        <SidebarLink
          href={`/organizations/${router.query?.organization}/people`}
          text="People"
          isActive={router.pathname === `/organizations/[organization]/people`}
          icon={"users"}
        />
        {user.role === "owner" && (
          <SidebarLink
            href={`/organizations/${router.query?.organization}/settings`}
            text="Settings"
            isActive={
              router.pathname === `/organizations/[organization]/settings`
            }
            icon={"settings"}
          />
        )}
      </div>
    </div>
  );
};

export default OrganizationSidebar;
