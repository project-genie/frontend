import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const SprintHeader = ({
  name,
  description,
  startDate,
  endDate,
  user,
  phase,
}) => {
  const [status, setStatus] = useState(null);
  const [formattedStartDate, setFormattedStartDate] = useState(null);
  const [formattedEndDate, setFormattedEndDate] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setFormattedStartDate(new Date(startDate).toLocaleDateString());
    setFormattedEndDate(new Date(endDate).toLocaleDateString());
    console.log("new date: ", new Date(startDate));
    if (new Date(startDate) < new Date()) {
      setStatus("active");
    } else {
      setStatus("inactive");
    }
  }, [startDate, endDate]);

  return (
    <div className="relative border border-secondary-700 rounded-md p-4 flex flex-col justify-center items-start w-full">
      <div>
        <h1 className="font-bold text-primary-500">Sprint</h1>
        <p className="font-bold text-primary-800 mb-4">{name}</p>
      </div>

      <div>
        <p className="font-bold text-secondary-800 text-sm">Description</p>
        <p className="text-primary-600">{description}</p>
      </div>
      <div>
        <p className="font-bold text-secondary-800 text-sm">Phase</p>
        <p className="text-primary-600">{phase}</p>
      </div>
      <div>
        <p className="font-bold text-secondary-800 text-sm">Start Date</p>
        <p className="text-primary-600">{formattedStartDate}</p>
      </div>
      <div>
        <p className="font-bold text-secondary-800 text-sm">End Date</p>
        <p className="text-primary-600">{formattedEndDate}</p>
      </div>
      <p className="absolute right-2 top-2 text-primary-800 text-sm">
        {status}
      </p>
      {user.role === "owner" && (
        <Image
          onClick={() => {
            router.push(
              `/organizations/${router.query.organization}/projects/${router.query.project}/sprints/${router.query.sprint}/edit`
            );
          }}
          className="absolute right-2 bottom-2 p-2 bg-secondary-500 rounded-full hover:cursor-pointer hover:bg-secondary-300"
          src={"/icons/edit.svg"}
          alt="edit"
          width={40}
          height={40}
        />
      )}
    </div>
  );
};

export default SprintHeader;
