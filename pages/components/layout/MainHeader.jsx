import Image from "next/image";
import Link from "next/link";
import React from "react";

const MainHeader = () => {
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
              <Link
                href="/profile"
                className="flex justify-start items-center py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <Image
                  className="mr-2"
                  alt="Account Icon"
                  src="/icons/account.svg"
                  width={26}
                  height={26}
                />
              </Link>
            </li>
            <li>
              <Link
                href="/notifications"
                className="flex justify-start items-center py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <Image
                  className="mr-2"
                  alt="Account Icon"
                  src="/icons/notifications.svg"
                  width={24}
                  height={24}
                />
              </Link>
            </li>
            <li>
              <button className="flex justify-start items-center py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
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
