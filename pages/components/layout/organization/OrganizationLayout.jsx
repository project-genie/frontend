import React from "react";
import { ToastContainer } from "react-toastify";
import OrganizationSidebar from "./OrganizationSidebar";
import MainHeader from "../MainHeader";

const OrganizationLayout = ({ children }) => {
  return (
    <div className="flex flex-col w-full">
      <MainHeader />
      <div className="grid grid-cols-12 grid-rows-12 min-h-screen">
        <OrganizationSidebar />
        <div className="col-start-1 col-end-13 lg:col-start-3 lg:col-end-13 row-start-2 row-end-13 lg:row-start-1 lg:row-end-13">
          {children}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default OrganizationLayout;
