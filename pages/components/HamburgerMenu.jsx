import Image from "next/image";
import React from "react";
import SidebarLink from "./SidebarLink";
import axios from "axios";
import { useRouter } from "next/router";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();

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
    <div className="">
      <div
        className="p-4"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <Image
          className="mr-2"
          alt="lines"
          src="/icons/menu.svg"
          width={28}
          height={28}
        />
      </div>
      {isOpen && (
        <div className="absolute top-0 left-0 w-full bg-neutral-800">
          <div
            className="absolute top-0 right-0 p-4"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <Image
              className="mr-2"
              alt="close"
              src="/icons/close-white.svg"
              width={28}
              height={28}
            />
          </div>
          <div className="">
            <div className="h-screen flex flex-col justify-center items-center">
              <SidebarLink
                href={`/organizations`}
                text="Home"
                isActive={router.pathname === `/organizations`}
              />
              <SidebarLink
                href={`/account`}
                text="Account"
                isActive={router.pathname === `/account`}
              />
              <SidebarLink
                href={`/notifications`}
                text="Notifications"
                isActive={router.pathname === `/notifications`}
              />
              <button
                className="mt-2 text-neutral-50 text-xs font-light w-[80%] py-4 px-6 rounded-lg hover:bg-primary-700"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
