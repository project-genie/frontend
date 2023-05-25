import SprintUpdateForm from "@/pages/components/SprintUpdateForm";
import ProjectLayout from "@/pages/components/layout/project/ProjectLayout";
import React from "react";

const EditSprint = () => {
  return (
    <ProjectLayout>
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center mt-10">
          <p className="text-base">Edit the sprint.</p>
        </div>
        <div className="w-[80%] bg-secondary-50 rounded-lg mt-10">
          <SprintUpdateForm />
        </div>
      </div>
    </ProjectLayout>
  );
};

export default EditSprint;
