import React from "react";
import MainLayout from "../components/layout/MainLayout";
import OrganizationList from "../components/OrganizationList";

const Organizations = () => {
  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center mt-10">
          <p className="text-sm uppercase font-bold text-secondary-900">
            Select an organization
          </p>
        </div>
        <div className="w-[80%] bg-secondary-50 rounded-lg mt-10">
          <OrganizationList />
        </div>
      </div>
    </MainLayout>
  );
};

export default Organizations;
