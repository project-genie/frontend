import React from "react";
import { useRouter } from "next/router";

const SprintCard = ({ id, name, description, phase, status }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col p-4 bg-secondary-100 border border-secondary-400 rounded-md">
      <h1
        className="text-primary-600 text-lg font-bold underline hover:cursor-pointer"
        onClick={() => {
          router.push(
            `/organizations/${router.query.organization}/projects/${router.query.project}/sprints/${id}`
          );
        }}
      >
        Sprint - {name}
      </h1>
      <div className="py-2">
        <p className="font-bold text-sm text-secondary-900">Phase</p>
        <p className="uppercase font-bold text-primary-400">{phase}</p>
      </div>
    </div>
  );
};

export default SprintCard;
