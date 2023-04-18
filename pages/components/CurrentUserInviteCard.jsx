import React from "react";
import ButtonTertiary from "./ButtonTertiary";
import axios from "axios";
import { toast } from "react-toastify";

const CurrentUserInviteCard = ({ invite }) => {
  const handleAcceptInvitation = async () => {
    try {
      await axios.post(
        `http://localhost:8080/api/organizations/invite/accept`,
        {
          secret: invite.secret,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Invitation accepted successfully.");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  const handleRejectInvitation = async () => {
    try {
      await axios.post(
        `http://localhost:8080/api/organizations/invite/reject`,
        {
          secret: invite.secret,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Invitation rejected successfully.");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  return (
    <div className="flex md:flex-row flex-col justify-between items-center p-4 border border-secondary-300 rounded-lg my-2">
      <div className="flex md:flex-row flex-col justify-between items-center p-4 w-full">
        <div className="flex items-center justify-start">
          <p className="text-primary-500 mr-1">{invite.organization.name}</p>
          <span className="text-sm font-medium text-secondary-700">
            {invite.organization.id}
          </span>
        </div>
        <div className="flex justify-center items-center">
          <ButtonTertiary
            icon="check"
            text="accept"
            handle={handleAcceptInvitation}
          />

          <ButtonTertiary
            icon="close"
            text="reject"
            handle={handleRejectInvitation}
          />
        </div>
      </div>
    </div>
  );
};

export default CurrentUserInviteCard;
