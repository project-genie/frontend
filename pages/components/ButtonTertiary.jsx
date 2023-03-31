import Image from "next/image";
import React from "react";

const ButtonTertiary = ({ icon, text, handle }) => {
  return (
    <button
      className="flex justify-center items-center px-2 py-1 border border-secondary-200 hover:bg-secondary-100 rounded-md mr-1"
      onClick={handle}
    >
      <Image
        src={`/icons/${icon}.svg`}
        width={12}
        height={12}
        alt="pencil"
        className="mr-1"
      />
      <span className="text-sm">{text}</span>
    </button>
  );
};

export default ButtonTertiary;
