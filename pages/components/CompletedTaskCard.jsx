import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";

const CompletedTaskCard = ({ id }) => {
  const [task, setTask] = useState({});

  const getTask = async () => {
    console.log("id: ", id);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/tasks/${id}`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      setTask(response.data.data);
      console.log("sinlge task: ", response.data.data);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  return (
    <div className="flex justify-between p-4 rounded.md bg-secondary-100 my-2">
      <div className="flex-col justify-start items-start">
        <div className="flex justify-start items-center">
          <Image
            className="mr-1"
            src="/icons/golf.svg"
            alt="golf hole"
            width={20}
            height={20}
          />
          <h2 className="text-neutral-800 underline hover:cursor-pointer text-sm">
            {task.name}
          </h2>
        </div>
        <div>
          <p>{task.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CompletedTaskCard;
