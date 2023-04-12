import React from "react";

const TaskExtendedChunk = ({ description, text }) => {
  return (
    <div className="mt-2 pt-2">
      <p className="font-bold text-xs text-secondary-700">{description}</p>
      <p className="text-neutral-800 text-sm">{text}</p>
    </div>
  );
};

export default TaskExtendedChunk;
