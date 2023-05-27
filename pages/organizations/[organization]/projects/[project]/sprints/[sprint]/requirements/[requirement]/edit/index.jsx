import SprintRequirementUpdateForm from "@/pages/components/SprintRequirementUpdateForm";
import ProjectLayout from "@/pages/components/layout/project/ProjectLayout";
import React from "react";

const EditSprintRequirement = () => {
  return (
    <ProjectLayout>
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center mt-10">
          <p className="text-base">Edit the sprint requirement.</p>
        </div>
        <div className="w-[80%] bg-secondary-50 rounded-lg mt-10">
          <SprintRequirementUpdateForm />
        </div>
      </div>
    </ProjectLayout>
  );
};

export default EditSprintRequirement;
