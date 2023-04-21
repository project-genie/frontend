import Image from "next/image";
import React, { useState } from "react";

const InfoPopUp = ({ text }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="relative">
        <Image
          alt="question mark"
          width={20}
          height={20}
          src="/icons/question-mark.svg"
          onMouseOver={() => setIsOpen(true)}
          onMouseOut={() => setIsOpen(false)}
        />
        {isOpen && (
          <div className="absolute bottom-full left-full bg-secondary-300 text-neutral-800 text-xs p-2 rounded-md min-w-[200px] max-w-[300px]">
            <p>{text}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoPopUp;
