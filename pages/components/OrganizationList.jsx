import React, { useState, useEffect } from "react";
import OrganizationCard from "./OrganizationCard";
import OrganizationListHeader from "./OrganizationListHeader";
import axios from "axios";

const OrganizationList = () => {
  const [organizations, setOrganizations] = useState([]);

  const getOrganizations = async () => {
    await axios
      .get("http://localhost:8080/api/organizations", {
        withCredentials: true,
      })
      .then((response) => {
        setOrganizations(response.data.data);
      })
      .catch((error) => {
        console.log("Error occured!: ", error);
      });
  };

  useEffect(() => {
    getOrganizations();
  }, []);
  return (
    <div>
      <OrganizationListHeader />
      <div>
        {organizations.map((organization) => (
          <OrganizationCard key={organization.id} organization={organization} />
        ))}
      </div>
    </div>
  );
};

export default OrganizationList;
