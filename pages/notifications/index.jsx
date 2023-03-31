import React from "react";
import MainLayout from "../components/layout/MainLayout";
import OrganizationList from "../components/OrganizationList";
import CurrentUserInviteList from "../components/CurrentUserInviteList";

const Notifications = () => {
  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center mt-10">
          <p className="text-base">Invites.</p>
        </div>
        <div className="w-[80%] bg-secondary-50 rounded-lg mt-10">
          <CurrentUserInviteList />
        </div>
      </div>
    </MainLayout>
  );
};

export default Notifications;
