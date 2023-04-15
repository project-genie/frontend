import React, { useEffect, useState } from "react";

const TaskStatusButton = ({ status, assigneeId, user, taskId }) => {
  const [color, setColor] = useState("");

  useEffect(() => {
    if (status === "in-progress") {
      setColor("bg-warning-100");
    } else if (status === "done") {
      setColor("bg-success-200");
    } else if (status === "backlog") {
      setColor("bg-neutral-100");
    } else if (status === "todo") {
      setColor("bg-neutral-100");
    }
  }, [status]);

  return (
    <div
      className={`${color} px-2 py-1 text-sm lowercase rounded-lg flex justify-center items-center`}
    >
      <p className="font-bold uppercase text-xs">{status}</p>
    </div>
  );
};

export default TaskStatusButton;
