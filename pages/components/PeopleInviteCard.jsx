import React from "react";
import ButtonError from "./ButtonError";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const PeopleInviteCard = ({ user, invite }) => {
  const router = useRouter();

  const handleRemoveInvitation = async () => {
    try {
      await axios.post(
        `http://localhost:8080/api/organizations/invites/${router.query?.organization}`,
        {
          userId: invite.userId,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Invitation removed successfully.");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="flex md:flex-row flex-col justify-between items-center p-4 border border-secondary-300 rounded-lg my-2">
      <div className="flex md:flex-row flex-col justify-between items-center p-4 w-full">
        <div className="flex items-center justify-start">
          <h2 className="text-primary-500 mr-1">{invite.email}</h2>
          <p className="text-sm font-medium text-secondary-700">
            {invite.status}
          </p>
        </div>
      </div>
      <div>
        {user.role === "owner" && invite.status === "pending" && (
          <ButtonError text="Remove" handle={handleRemoveInvitation} />
        )}
      </div>
    </div>
  );
};

export default PeopleInviteCard;
