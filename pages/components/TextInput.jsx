import React from "react";

const TextInput = ({
  label,
  id,
  type,
  onChange,
  value,
  required,
  placeholder,
}) => {
  return (
    <div className="mb-3">
      <label
        htmlFor={id}
        className="block mb-1 text-sm font-medium text-neutral-800"
      >
        {label}
        {required ? "*" : ""}
      </label>
      <input
        type={type}
        id={id}
        className="bg-transparent border border-neutral-800 text-neutral-800 text-sm rounded-lg  focus:ring-primary-500 focus:border-primary-500 outline-primary-500 block p-2.5 w-full"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required={required}
      />
    </div>
  );
};

export default TextInput;
