import React from "react";
import MainHeader from "./MainHeader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = ({ children }) => {
  return (
    <div>
      <ToastContainer />

      <MainHeader />
      <div className="">{children}</div>
    </div>
  );
};

export default MainLayout;
