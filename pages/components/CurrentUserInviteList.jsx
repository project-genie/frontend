import React, { useState, useEffect } from "react";
import axios from "axios";
import CurrentUserInviteCard from "./CurrentUserInviteCard";

const CurrentUserInviteList = () => {
  const [invites, setInvites] = useState([]);

  const getInvites = async () => {
    await axios
      .get("http://localhost:8080/api/users/invites", {
        withCredentials: true,
      })
      .then((response) => {
        setInvites(response.data.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getInvites();
  }, []);
  return (
    <div>
      <div className="">
        {invites?.map((invite) => (
          <CurrentUserInviteCard key={invite.id} invite={invite} />
        ))}
      </div>
    </div>
  );
};

export default CurrentUserInviteList;
