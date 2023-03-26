import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeaderIcon = ({ href, alt, src }) => {
  return (
    <Link
      href={href}
      className="flex justify-start items-center py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    >
      <Image className="mr-2" alt={alt} src={src} width={26} height={26} />
    </Link>
  );
};

export default HeaderIcon;
