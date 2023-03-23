import React from "react";
import axios from "axios";

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
    <div>
      <h1>PRIVATE ROUTE</h1>
      <div className="m-20">
        <button onClick={handleFetch}>Fetch Orgs</button>
      </div>
    </div>
  );
};

export default Organizations;
