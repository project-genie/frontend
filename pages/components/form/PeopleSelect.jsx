import React from "react";
import PeopleSelectRow from "./PeopleSelectRow";

const PeopleSelect = ({ people }) => {
  return (
    <>
      <label
        for="assigneeId"
        class="block mb-1 text-sm font-medium text-neutral-800"
      >
        Assignee
      </label>
      <Field name="color" component="select">
        {people.map((person) => (
          <PeopleSelectRow key={person.id} person={person} />
        ))}
      </Field>
    </>
  );
};

export default PeopleSelect;
