import React from "react";

const ButtonError = ({ text, handle, disabled = false }) => {
  return (
    <button
      className="text-sm py-2 px-4 bg-error-300 hover:bg-error-400 disabled:bg-neutral-400 text-neutral-50 rounded-lg m-2"
      onClick={handle}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default ButtonError;
