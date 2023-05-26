import CreateTaskCard from "@/pages/components/CreateTaskCard";
import MainLayout from "@/pages/components/layout/MainLayout";
import React from "react";

const CreateTask = () => {
  return (
    <MainLayout>
      <div className="flex justify-center items-center h-[70vh]">
        <CreateTaskCard />
      </div>
    </MainLayout>
  );
};

export default CreateTask;
