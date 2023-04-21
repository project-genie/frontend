import { useState, useEffect } from "react";
import TaskCandidateCard from "./TaskCandidateCard";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import TaskCandidateListHeader from "./TaskCandidateListHeader";

const TaskCandidateList = ({ user, owner }) => {
  const router = useRouter();
  const [taskCandidates, setTaskCandidates] = useState([]);
  const [allTaskCandidates, setAllTaskCandidates] = useState([]);

  const getTaskCandidates = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/tasks/candidate`,
        {
          withCredentials: true,
        }
      );

      setTaskCandidates(response.data.data);
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  const getAllTaskCandidates = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/tasks/candidate/${router.query.project}/all`,
        {
          withCredentials: true,
        }
      );

      setAllTaskCandidates(response.data.data);
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      getTaskCandidates();
      if (owner) {
        getAllTaskCandidates();
      }
    }
  }, [router.isReady]);

  return (
    <div>
      <TaskCandidateListHeader owner={owner} />
      <div className="">
        {taskCandidates.map((taskCandidate) => (
          <TaskCandidateCard
            key={taskCandidate.id}
            id={taskCandidate.id}
            name={taskCandidate.name}
            assigneeId={taskCandidate.assigneeId}
            description={taskCandidate.description}
            createdAt={taskCandidate.created_date}
            user={user}
            owner={owner}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskCandidateList;
