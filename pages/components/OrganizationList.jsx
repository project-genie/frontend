import React from "react";
import OrganizationCard from "./OrganizationCard";
import OrganizationListHeader from "./OrganizationListHeader";

const OrganizationList = ({ organizations }) => {
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
