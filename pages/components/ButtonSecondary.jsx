import React from "react";

const ButtonSecondary = ({ text, handle }) => {
  return (
    <button
      className="text-sm py-2 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg m-2"
      onClick={handle}
    >
      {text}
    </button>
  );
};

export default ButtonSecondary;
