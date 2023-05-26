import TaskUpdateForm from "@/pages/components/TaskUpdateForm";
import ProjectLayout from "@/pages/components/layout/project/ProjectLayout";
import React from "react";

const EditTask = () => {
  return (
    <ProjectLayout>
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center mt-10">
          <p className="text-base">Edit the task.</p>
        </div>
        <div className="w-[80%] bg-secondary-50 rounded-lg mt-10">
          <TaskUpdateForm />
        </div>
      </div>
    </ProjectLayout>
  );
};

export default EditTask;
