import React, { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../components/layout/MainLayout";
import { useRouter } from "next/router";
import Button from "../components/Button";
import Modal from "react-modal";
import CreateModal from "../components/CreateModal";
import { useFormik } from "formik";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const Organizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [isCreateOrganizationModalOpen, setIsCreateOrganizationModalOpen] =
    useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const openCreateOrganizationModal = () => {
    setIsCreateOrganizationModalOpen(true);
  };

  const closeCreateOrganizationModal = () => {
    setIsCreateOrganizationModalOpen(false);
  };

  const handleFetch = async () => {
    console.log("Fetch Orgs");
    await axios
      .get("http://localhost:8080/api/organizations", {
        withCredentials: true,
      })
      .then((response) => {
        setOrganizations(response.data.data);
        console.log("Organizations: ", response);
      })
      .catch((error) => {
        console.log("Error occured!: ", error);
      });
  };

  useEffect(() => {
    handleFetch();
  }, []);

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
        toast.success("Organization is created successfully.", {
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
        console.log("Error occured!: ", error);
      }
    },
  });

  return (
    <MainLayout>
      <div className="m-20">
        <div className="w-full lg:w-[95%] flex flex-col items-start bg-secondary-100 rounded-lg">
          {/* HERO */}
          <div className="flex md:flex-row flex-col justify-between items-start p-4 w-full">
            <h1 className="text-xl font-medium underline">Organizations</h1>
            <Button
              text="Create Organization"
              handle={openCreateOrganizationModal}
            />
          </div>
          {/* SELECT COMPONENT WRAPPER*/}
          <div className="flex justify-center">
            {/* SELECT COMPONENT*/}
            <ul className="flex flex-wrap">
              {organizations?.map((organization) => (
                <li
                  key={organization.organization.id}
                  className="flex justify-center items-center p-4 m-4 bg-secondary-400 rounded-lg cursor-pointer hover:bg-secondary-500 w-[10rem] h-[10rem]"
                  onClick={() =>
                    router.push(
                      `/organizations/${organization.organization.id}`
                    )
                  }
                >
                  <h1 className="text-sm font-medium">
                    {organization.organization.name}
                  </h1>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
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
                value={formik.values.email}
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="description"
                className="block mb-1 text-sm font-medium text-neutral-800"
              >
                Description
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
    </MainLayout>
  );
};

export default Organizations;
