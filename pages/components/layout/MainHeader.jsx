import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import HeaderIcon from "../HeaderIcon";
import useWindowSize from "@/pages/hooks/useWindowSize";
import HamburgerMenu from "../HamburgerMenu";

const MainHeader = () => {
  const [notificationsExist, setNotificationsExist] = useState(false);
  const size = useWindowSize();

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

  const getInvites = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/users/invites",
        {
          withCredentials: true,
        }
      );
      if (response.data.data.length > 0) {
        setNotificationsExist(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInvites();
  }, []);

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

        <div className="block w-auto" id="navbar-default">
          {size.width > 800 ? (
            <ul className="flex flex-col p-2 mt-2 rounded-lg bg-neutral-900 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <HeaderIcon
                  alt={"Home"}
                  href={"/organizations"}
                  src={"/icons/home.svg"}
                />
              </li>
              <li>
                <HeaderIcon
                  alt={"Account"}
                  href={"/account"}
                  src={"/icons/account.svg"}
                />
              </li>
              <li className="relative">
                {notificationsExist && (
                  <div className="w-2 h-2 bg-primary-400 absolute top-0 right-1 rounded-full"></div>
                )}
                <HeaderIcon
                  alt={"Bell"}
                  href={"/notifications"}
                  src={"/icons/notifications.svg"}
                />
              </li>
              <li>
                <button
                  onClick={() => handleLogout()}
                  className="flex justify-start items-center"
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
          ) : (
            <div>
              <HamburgerMenu />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainHeader;
