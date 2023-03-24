import React from "react";
import axios from "axios";
import MainLayout from "../components/layout/MainLayout";

const Organizations = () => {
  const handleFetch = async () => {
    console.log("Fetch Orgs");
    await axios
      .get("http://localhost:8080/api/organizations", {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Response: ", response);
      })
      .catch((error) => {
        console.log("Error occured!: ", error);
      });
  };

  return (
    <MainLayout>
      <h1>PRIVATE ROUTE</h1>
      <div className="m-20">
        <button onClick={handleFetch}>Fetch Orgs</button>
      </div>
    </MainLayout>
  );
};

export default Organizations;
