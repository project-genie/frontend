import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/router";

const SprintRequirementCard = ({ requirement, user }) => {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    await axios
      .get(
        `http://localhost:8080/api/tasks/sprintrequirement/${requirement.id}`,
        {
          withCredentials: true,
        }
      )
      .then((result) => {
        console.log("returned tasks, ", result.data.data);
        setTasks(result.data.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    getTasks();
  }, []);
  return (
    <div className="w-full border border-secondary-600 my-2 p-2 rounded-md bg-secondary-200 relative">
      <div
        className="my-2 underline hover:cursor-pointer"
        onClick={() => {
          router.push(
            `/organizations/${router.query.organization}/projects/${router.query.project}/sprints/${router.query.sprint}/requirements/${requirement.id}`
          );
        }}
      >
        <p className="font-bold text-neutral-800">{requirement.name}</p>
      </div>
      <div>
        <p className="font-bold text-xs text-secondary-900 mt-4">Description</p>
        <p className="font-bold text-neutral-800">{requirement.description}</p>
      </div>
      <div>
        <p className="font-bold text-xs text-secondary-900">Open Tasks</p>
        <p className="font-bold text-neutral-800">
          {tasks.filter((task) => task.status !== "completed").length}
        </p>
      </div>
      <div>
        <p className="font-bold text-xs text-secondary-900">Completed Tasks</p>
        <p className="font-bold text-neutral-800">
          {tasks.filter((task) => task.status === "completed").length}
        </p>
      </div>
      {user.role === "owner" && (
        <Image
          onClick={() => {
            router.push(
              `/organizations/${router.query.organization}/projects/${router.query.project}/sprints/${router.query.sprint}/requirements/${requirement.id}/edit`
            );
          }}
          className="absolute right-2 bottom-2 p-2 bg-secondary-500 rounded-full hover:cursor-pointer hover:bg-secondary-300 z-50"
          src={"/icons/edit.svg"}
          alt="edit"
          width={40}
          height={40}
        />
      )}
    </div>
  );
};

export default SprintRequirementCard;
