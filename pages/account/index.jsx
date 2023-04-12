import React from "react";
import MainLayout from "../components/layout/MainLayout";
import AccountUpdateForm from "../components/AccountUpdateForm";

const Account = () => {
  return (
    <MainLayout>
      {" "}
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center mt-10">
          <p className="text-base">Edit the account.</p>
        </div>
        <div className="w-[80%] bg-secondary-50 rounded-lg mt-10">
          <AccountUpdateForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default Account;
