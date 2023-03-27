import React, { useState } from "react";
import Button from "./Button";
import Spinner from "./Spinner";
import CreateModal from "./CreateModal";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";

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
      console.log("values: ", router.query);
      console.log(values);
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
        toast.success("Project is created successfully.", {
          position: "bottom-right",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message, {
          position: "bottom-right",
        });
      }
    },
  });

  return (
    <div className="flex justify-between items-center p-2 m-2 border-b border-secondary-700">
      <h1>Projects</h1>
      {user?.role === "owner" && (
        <Button
          text="Create Project"
          handle={() => {
            setIsCreateProjectModalOpen(true);
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
                value={formik.values.email}
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
                value={formik.values.password}
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

export default ProjectListHeader;
