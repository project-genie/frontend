import CreateOrganizationCard from "@/pages/components/CreateOrganizationCard";
import MainLayout from "@/pages/components/layout/MainLayout";
import React from "react";

const CreateOrganization = () => {
  return (
    <MainLayout>
      <div className="flex justify-center items-center h-[70vh]">
        <CreateOrganizationCard />
      </div>
    </MainLayout>
  );
};

export default CreateOrganization;
