import React from "react";
import TaskListHeader from "./TaskListHeader";

const TaskList = ({ user }) => {
  return (
    <div>
      <TaskListHeader user={user} />
      <div></div>
    </div>
  );
};

export default TaskList;
