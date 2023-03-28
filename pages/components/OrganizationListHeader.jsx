import React, { useState } from "react";
import Button from "./Button";
import { useFormik } from "formik";
import axios from "axios";
import CreateModal from "./CreateModal";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

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
        toast.error(error.response.data.message);
      }
    },
  });

  return (
    <div className="flex justify-between items-center">
      <h1>Organizations</h1>
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
            <div className="mb-3">
              <label
                htmlFor="name"
                className="block mb-1 text-sm font-medium text-neutral-800"
              >
                Name*
              </label>
              <input
                type="text"
                id="name"
                className="bg-transparent border border-neutral-800 text-neutral-800 text-sm rounded-lg  focus:ring-primary-500 focus:border-primary-500 outline-primary-500 block w-full p-2.5 "
                placeholder="Squad"
                onChange={formik.handleChange}
                value={formik.values.name}
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="description"
                className="block mb-1 text-sm font-medium text-neutral-800"
              >
                Description*
              </label>
              <input
                type="text"
                id="description"
                className="bg-transparent border border-neutral-800 text-neutral-800 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 outline-primary-500 block w-full p-2.5 "
                onChange={formik.handleChange}
                value={formik.values.description}
              />
            </div>

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
