import React, { useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import TextInput from "./TextInput";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const CreateOrganizationCard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
        toast.success("Organization created successfully.");
        setTimeout(() => {
          router.push("/organizations");
        }, 2000);
      } catch (error) {
        setLoading(false);
        toast.error(error.response?.data.message);
      }
    },
  });

  return (
    <div className="w-1/2 md:w-1/3 flex flex-col justify-center items-center">
      <div className="mb-6 flex flex-col items-center">
        <h2 className="font-bold text-secondary-900 text-lg uppercase mb-6">
          Create organization
        </h2>
        <p className="font-bold text-secondary-900 text-lg">
          <span className="bg-primary-600 rounded-md px-4 py-2 text-white">
            1
          </span>{" "}
          /{" "}
          <span className="bg-secondary-800 rounded-md px-4 py-2 text-white">
            1
          </span>
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="sm:w-1/2">
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
  );
};

export default CreateOrganizationCard;
