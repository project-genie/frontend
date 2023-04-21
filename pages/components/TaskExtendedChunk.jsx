import Image from "next/image";
import React from "react";

const TaskExtendedChunk = ({ description, text, icon }) => {
  return (
    <div className="flex justify-start items-center mt-2 pt-2">
      <div className="flex justify-start items-start">
        <Image
          src={`/icons/${icon}.svg`}
          alt={icon}
          width={16}
          height={16}
          className="mr-1"
        />
        <p className="font-bold text-xs text-secondary-700">{description}</p>
      </div>
      <p className="ml-2 text-secondary-900 text-sm font-semibold">{text}</p>
    </div>
  );
};

export default TaskExtendedChunk;
