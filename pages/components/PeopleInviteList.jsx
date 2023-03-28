import React, { useState, useEffect } from "react";
import PeopleInviteListHeader from "./PeopleInviteListHeader";
import PeopleInviteCard from "./PeopleInviteCard";
import { useRouter } from "next/router";
import axios from "axios";

const PeopleInviteList = ({ user }) => {
  const [invites, setInvites] = useState([]);

  const router = useRouter();

  const getInvites = async () => {
    let url = `http://localhost:8080/api/organizations/invites/${router.query?.organization}`;
    await axios
      .get(url, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("invites: ", response.data.data);
        setInvites(response.data.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (router.isReady) {
      getInvites();
    }
  }, [router.isReady]);

  return (
    <div>
      <div className="">
        <PeopleInviteListHeader user={user} />
        {invites.map((invite) => (
          <PeopleInviteCard key={invite.id} user={user} invite={invite} />
        ))}
      </div>
    </div>
  );
};

export default PeopleInviteList;
