import React, { useState } from "react";
import Button from "./Button";
import Spinner from "./Spinner";
import CreateModal from "./CreateModal";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";
import TextInput from "./TextInput";
import Image from "next/image";

const ProjectListHeader = ({ user }) => {
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const openCreateProjectModal = () => {
    setIsCreateProjectModalOpen(true);
  };

  const closeCreateProjectModal = () => {
    setIsCreateProjectModalOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      organizationId: "",
    },
    onSubmit: async (values) => {
      formik.values.organizationId = router.query.organization;
      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:8080/api/projects",
          values,
          {
            withCredentials: true,
          }
        );
        setLoading(false);
        closeCreateProjectModal();
        toast.success("Project created successfully.");
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
          src="/icons/folder.svg"
          alt="A folder"
          width={24}
          height={24}
        />
        <h1 className="font-bold uppercase text-neutral-800">Projects</h1>
      </div>
      {user?.role === "owner" && (
        <Button
          text="Create Project"
          handle={() => {
            openCreateProjectModal();
          }}
        />
      )}
      <CreateModal
        isOpen={isCreateProjectModalOpen}
        closeModal={() => setIsCreateProjectModalOpen(false)}
        contentLabel="Create Project"
      >
        <div className="w-full">
          <div className="mb-6">
            <h2 className="font-medium text-lg">Create project.</h2>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <TextInput
              id="name"
              type="text"
              label="Name"
              placeholder="Enter a name"
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

export default ProjectListHeader;
