import React from "react";

const SprintRequirementCard = ({ requirement }) => {
  console.log("single req: ", requirement);
  return (
    <div className="w-full border border-secondary-600 my-2 p-2 rounded-md bg-secondary-200">
      {requirement.name}
    </div>
  );
};

export default SprintRequirementCard;
