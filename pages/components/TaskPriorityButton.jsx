import React, { useEffect, useState } from "react";

const TaskPriorityButton = ({ priority }) => {
  const [color, setColor] = useState("");

  useEffect(() => {
    if (priority === "high") {
      setColor("bg-error-200");
    } else if (priority === "medium") {
      setColor("bg-warning-200");
    } else if (priority === "low") {
      setColor("bg-neutral-100");
    }
  }, [priority]);

  return (
    <div
      className={`${color} px-2 py-1 text-sm lowercase rounded-lg flex justify-center items-center`}
    >
      <p className="font-bold uppercase text-xs">{priority}</p>
    </div>
  );
};

export default TaskPriorityButton;
