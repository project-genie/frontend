import OrganizationUpdateForm from "@/pages/components/OrganizationUpdateForm";
import OrganizationLayout from "@/pages/components/layout/organization/OrganizationLayout";
import React from "react";

const Settings = () => {
  return (
    <OrganizationLayout>
      {" "}
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center mt-10">
          <p className="text-base">Edit the organization.</p>
        </div>
        <div className="w-[80%] bg-secondary-50 rounded-lg mt-10">
          <OrganizationUpdateForm />
        </div>
      </div>
    </OrganizationLayout>
  );
};

export default Settings;
