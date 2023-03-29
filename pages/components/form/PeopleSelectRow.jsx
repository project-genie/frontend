import React from "react";

const PeopleSelectRow = ({ person }) => {
  return (
    <option key={person.id} value={person.id}>
      {person.user.name}
    </option>
  );
};

export default PeopleSelectRow;
