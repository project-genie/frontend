import React, { useState, useEffect } from "react";
import SprintListHeader from "./SprintListHeader";
import SprintCard from "./SprintCard";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const SprintList = ({ user }) => {
  const router = useRouter();
  const [sprints, setSprints] = useState([]);

  const getSprints = async () => {
    try {
      await axios
        .get(`http://localhost:8080/api/sprints/${router.query?.project}`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log("sprints: ", res);
          setSprints(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      getSprints();
    }
  }, [router.isReady]);
  return (
    <div>
      <SprintListHeader user={user} />

      <div className="my-4">
        <div>
          <h1 className="text-secondary-800 text-sm font-bold">
            Active Sprints
          </h1>
        </div>
        <div className="">
          {sprints
            .filter((sprint) => sprint.status === "active")
            .map((sprint) => (
              <SprintCard
                key={sprint.id}
                id={sprint.id}
                name={sprint.name}
                description={sprint.description}
                phase={sprint.phase}
                status={sprint.status}
              />
            ))}
        </div>
      </div>

      <div className="my-4">
        <div>
          <h1 className="text-secondary-800 text-sm font-bold">
            Inactive Sprints
          </h1>
        </div>
        <div className="">
          {sprints
            .filter((sprint) => sprint.status === "inactive")
            .map((sprint) => (
              <SprintCard
                key={sprint.id}
                id={sprint.id}
                name={sprint.name}
                description={sprint.description}
                phase={sprint.phase}
                status={sprint.status}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SprintList;
