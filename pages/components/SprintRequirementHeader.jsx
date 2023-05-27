import React from "react";

const SprintRequirementHeader = ({ name, description, user }) => {
  return (
    <div className="relative border border-secondary-700 rounded-md p-4 flex flex-col justify-center items-start w-full">
      <div>
        <h1 className="font-bold text-primary-500">Requirement</h1>
        <p className="font-bold text-primary-800 mb-4">{name}</p>
      </div>

      <div>
        <p className="font-bold text-secondary-800 text-sm">Description</p>
        <p className="text-primary-600">{description}</p>
      </div>
    </div>
  );
};

export default SprintRequirementHeader;
