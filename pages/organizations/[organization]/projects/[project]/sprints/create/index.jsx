import CreateSprintCard from "@/pages/components/CreateSprintCard";
import MainLayout from "@/pages/components/layout/MainLayout";
import React from "react";

const CreateSprint = () => {
  return (
    <MainLayout>
      <div className="flex justify-center items-center h-[70vh]">
        <CreateSprintCard />
      </div>
    </MainLayout>
  );
};

export default CreateSprint;
