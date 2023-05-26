import CreateSprintRequirementCard from "@/pages/components/CreateSprintRequirementCard";
import MainLayout from "@/pages/components/layout/MainLayout";
import React from "react";

const CreateRequirement = () => {
  return (
    <MainLayout>
      <div className="flex justify-center items-center h-[70vh]">
        <CreateSprintRequirementCard />
      </div>
    </MainLayout>
  );
};

export default CreateRequirement;
