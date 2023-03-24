import React from "react";
import MainHeader from "./MainHeader";

const MainLayout = ({ children }) => {
  return (
    <div>
      <MainHeader />
      <div>{children}</div>
    </div>
  );
};

export default MainLayout;
