import React from "react";

const TaskCandidateListHeader = ({ owner }) => {
  return (
    <div className="flex justify-between items-center border-b border-b-secondary-400">
      <h1>{owner ? "All" : "Your"} Task Candidates</h1>
    </div>
  );
};

export default TaskCandidateListHeader;
