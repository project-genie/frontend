import React, { useState } from "react";
import Button from "./Button";
import { useFormik } from "formik";
import axios from "axios";
import CreateModal from "./CreateModal";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import TextInput from "./TextInput";
import Image from "next/image";

const OrganizationListHeader = () => {
  const [isCreateOrganizationModalOpen, setIsCreateOrganizationModalOpen] =
    useState(false);
  const [loading, setLoading] = useState(false);

  const openCreateOrganizationModal = () => {
    setIsCreateOrganizationModalOpen(true);
  };

  const closeCreateOrganizationModal = () => {
    setIsCreateOrganizationModalOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:8080/api/organizations",
          values,
          {
            withCredentials: true,
          }
        );
        setLoading(false);
        closeCreateOrganizationModal();
        toast.success("Organization created successfully.");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        setLoading(false);
        toast.error(error.response?.data.message);
      }
    },
  });

  return (
    <div className="flex justify-between items-center border-b border-b-secondary-400">
      <div className="flex justify-center items-center">
        <Image
          className="mr-1"
          src="/icons/corporation.svg"
          alt="Corporation building"
          width={24}
          height={24}
        />
        <h1 className="font-bold uppercase text-neutral-800">Organizations</h1>
      </div>
      <Button
        handle={() => openCreateOrganizationModal()}
        text="Create Organization"
      />
      <CreateModal
        isOpen={isCreateOrganizationModalOpen}
        closeModal={() => setIsCreateOrganizationModalOpen(false)}
        contentLabel="Create Organization"
      >
        <div className="w-full">
          <div className="mb-6">
            <h2 className="font-medium text-lg">Create organization.</h2>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <TextInput
              id="name"
              type="text"
              label="Name"
              placeholder="Enter name"
              onChange={formik.handleChange}
              value={formik.values.name}
              required={true}
            />

            <TextInput
              id="description"
              type="text"
              label="Description"
              placeholder="Enter a description"
              onChange={formik.handleChange}
              value={formik.values.description}
              required={true}
            />

            <button
              type="submit"
              className="text-neutral-50 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {loading ? <Spinner /> : <p>Create</p>}
            </button>
          </form>
        </div>
      </CreateModal>
    </div>
  );
};

export default OrganizationListHeader;
