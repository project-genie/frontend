import React, { useState, useEffect } from "react";
import ProjectLayout from "@/pages/components/layout/project/ProjectLayout";
import SprintRequirementTaskList from "@/pages/components/SprintRequirementTaskList";
import SprintRequirementHeader from "@/pages/components/SprintRequirementHeader";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

const SprintRequirement = () => {
  const router = useRouter();
  const [sprintRequirement, setSprintRequirement] = useState({});
  const [user, setUser] = useState({});

  const getUser = async () => {
    await axios
      .get(`http://localhost:8080/api/users/me`, {
        withCredentials: true,
      })
      .then((result) => {
        setUser(result.data.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const getSprintRequirement = async () => {
    await axios
      .get(
        `http://localhost:8080/api/sprints/requirement/${router.query?.requirement}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setSprintRequirement(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    if (router.isReady) {
      getSprintRequirement();
    }
    getUser();
  }, [router.isReady]);

  return (
    <ProjectLayout>
      <div className="flex flex-col justify-center items-center ">
        <div className="flex flex-col justify-center items-center m-4 w-[50%]">
          <SprintRequirementHeader
            name={sprintRequirement.name}
            description={sprintRequirement.description}
            user={user}
          />
        </div>

        <div className="w-[80%] bg-secondary-50 rounded-lg mt-10">
          <SprintRequirementTaskList user={user} />
        </div>
      </div>
    </ProjectLayout>
  );
};

export default SprintRequirement;
