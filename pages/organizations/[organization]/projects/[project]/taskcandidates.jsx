import TaskList from "@/pages/components/TaskList";
import ProjectLayout from "@/pages/components/layout/project/ProjectLayout";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import TaskCandidateList from "@/pages/components/TaskCandidateList";

const TaskCandidates = () => {
  const [user, setUser] = useState({});
  const router = useRouter();

  const getUser = async () => {
    await axios
      .get(
        `http://localhost:8080/api/projects/currentuserproject/${router.query?.project}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setUser(response.data.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  useEffect(() => {
    if (router.isReady) {
      getUser();
    }
  }, [router.isReady]);

  return (
    <ProjectLayout>
      <div className="flex flex-col justify-center items-center">
        <div className="w-[80%] bg-secondary-50 rounded-lg mt-10">
          <TaskCandidateList user={user} />
        </div>
        {user.role === "owner" && (
          <div className="w-[80%] bg-secondary-50 rounded-lg mt-10">
            <TaskCandidateList user={user} owner={true} />
          </div>
        )}
      </div>
    </ProjectLayout>
  );
};

export default TaskCandidates;
