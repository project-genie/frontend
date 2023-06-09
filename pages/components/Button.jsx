import React from "react";

const Button = ({ text, handle }) => {
  return (
    <button
      className="text-sm py-2 px-4 bg-primary-500 hover:bg-primary-600 text-neutral-50 rounded-lg m-2"
      onClick={handle}
    >
      {text}
    </button>
  );
};

export default Button;
