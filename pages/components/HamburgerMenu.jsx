import Image from "next/image";
import React from "react";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <div
        className=""
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
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden bg-neutral-800">
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
              <div>
                 
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
