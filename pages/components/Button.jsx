import Link from "next/link";
import React from "react";

const Button = ({ text, handle }) => {
  return (
    <button
      className="py-2 px-4 bg-primary-500 hover:bg-primary-600 text-neutral-50 rounded-lg"
      onClick={handle}
    >
      {text}
    </button>
  );
};

export default Button;
