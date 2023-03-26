import Image from "next/image";
import Link from "next/link";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import HeaderIcon from "../HeaderIcon";

const MainHeader = () => {
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/users/signout",
        {},
        { withCredentials: true }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data.message);
    }
  };
  return (
    <nav className="px-2 sm:px-4 py-4 bg-neutral-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link href="/organizations" className="flex items-center">
          <Image
            alt="Project Genie Logo"
            src="/logo/logo_light.svg"
            width={100}
            height={100}
          />
        </Link>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 mt-4 rounded-lg bg-neutral-900 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <HeaderIcon
                alt={"Account"}
                href={"/account"}
                src={"/icons/account.svg"}
              />
            </li>
            <li>
              <HeaderIcon
                alt={"Bell"}
                href={"/notifications"}
                src={"/icons/notifications.svg"}
              />
            </li>
            <li>
              <button
                onClick={() => handleLogout()}
                className="flex justify-start items-center py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <Image
                  className="mr-2"
                  alt="Door"
                  src="/icons/signout.svg"
                  width={24}
                  height={24}
                />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainHeader;
