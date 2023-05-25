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
        .get(
          `http://localhost:8080/api/projects/sprints/${router.query?.project}`,
          {
            withCredentials: true,
          }
        )
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
      <div className="">
        {sprints.map((sprint) => (
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
  );
};

export default SprintList;
