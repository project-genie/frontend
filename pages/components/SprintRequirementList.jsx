import React, { useState, useEffect } from "react";
import SprintRequirementListHeader from "./SprintRequirementListHeader";
import SprintRequirementCard from "./SprintRequirementCard";
import axios from "axios";
import { useRouter } from "next/router";

const SprintRequirementList = ({ user }) => {
  const router = useRouter();
  const [sprintRequirements, setSprintRequirements] = useState([]);

  const getSprintRequirements = async () => {
    try {
      await axios
        .get(
          `http://localhost:8080/api/sprints/requirements/${router.query?.sprint}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log("reqs: ", res.data.data);
          setSprintRequirements(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("Error getting spring requirements: ", error);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      console.log(router.query);
      getSprintRequirements();
    }
  }, [router.isReady]);
  return (
    <div>
      <SprintRequirementListHeader user={user} />
      <div className="my-4">
        {sprintRequirements.map((requirement) => {
          return (
            <SprintRequirementCard requirement={requirement} user={user} />
          );
        })}
      </div>
    </div>
  );
};

export default SprintRequirementList;
