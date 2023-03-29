import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useRouter } from "next/router";
import Button from "./Button";
import Spinner from "./Spinner";
import CreateModal from "./CreateModal";
import { toast } from "react-toastify";
import TextInput from "./TextInput";

const PeopleListHeader = ({ user }) => {
  const [isInviteUserModalOpen, setIsInviteUserModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const openInviteUserModal = () => {
    setIsInviteUserModalOpen(true);
  };

  const closeInviteUserModal = () => {
    setIsInviteUserModalOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post(
          `http://localhost:8080/api/organizations/invite/${router.query?.organization}`,
          values,
          {
            withCredentials: true,
          }
        );
        setLoading(false);
        closeInviteUserModal();
        toast.success("Invitation sent successfully.");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message);
      }
    },
  });
  return (
    <div className="flex justify-between items-center">
      <h1>People</h1>
      {user?.role === "owner" && (
        <Button
          text="Invite People"
          handle={() => {
            openInviteUserModal();
          }}
        />
      )}
      <CreateModal
        isOpen={isInviteUserModalOpen}
        closeModal={() => setIsInviteUserModalOpen(false)}
        contentLabel="Invite People"
      >
        <div className="w-full">
          <div className="mb-6">
            <h2 className="font-medium text-lg">Invite People</h2>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <TextInput
              id="email"
              type="email"
              label="Email"
              placeholder="Enter an email address"
              onChange={formik.handleChange}
              value={formik.values.email}
              required={true}
            />

            <button
              type="submit"
              className="text-neutral-50 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {loading ? <Spinner /> : <p>Invite</p>}
            </button>
          </form>
        </div>
      </CreateModal>
    </div>
  );
};

export default PeopleListHeader;
