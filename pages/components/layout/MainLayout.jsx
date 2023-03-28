import React from "react";
import MainHeader from "./MainHeader";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = ({ children }) => {
  return (
    <div>
      <MainHeader />
      <div className="">{children}</div>
    </div>
  );
};

export default MainLayout;
