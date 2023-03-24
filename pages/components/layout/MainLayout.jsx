import React from "react";
import MainHeader from "./MainHeader";

const MainLayout = ({ children }) => {
  return (
    <div>
      <MainHeader />
      <div className="">{children}</div>
    </div>
  );
};

export default MainLayout;
