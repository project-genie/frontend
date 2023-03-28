import React, { useState, useEffect } from "react";
import PeopleCard from "./PeopleCard";
import axios from "axios";
import PeopleListHeader from "./PeopleListHeader";
import { useRouter } from "next/router";
import PeopleInviteListHeader from "./PeopleInviteListHeader";

const PeopleList = ({ user }) => {
  const [people, setPeople] = useState([]);
  const router = useRouter();
  const getPeople = async () => {
    let url = `http://localhost:8080/api/organizations/${router.query.organization}/members`;
    await axios
      .get(url, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.data);
        setPeople(response.data.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (router.isReady) {
      getPeople();
    }
  }, [router.isReady]);

  return (
    <div>
      <div className="">
        <PeopleListHeader user={user} />
        {people.map((person) => (
          <PeopleCard key={person.id} user={user} person={person} />
        ))}
      </div>
    </div>
  );
};

export default PeopleList;
