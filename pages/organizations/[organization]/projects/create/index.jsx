import CreateProjectCard from "@/pages/components/CreateProjectCard";
import MainLayout from "@/pages/components/layout/MainLayout";
import React from "react";

const CreateProject = () => {
  return (
    <MainLayout>
      <div className="flex justify-center items-center h-[70vh]">
        <CreateProjectCard />
      </div>
    </MainLayout>
  );
};

export default CreateProject;
