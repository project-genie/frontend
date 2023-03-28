import React, { useState, useEffect, useMemo } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Spinner from "./Spinner";
import { Formik } from "formik";

const OrganizationUpdateForm = () => {
  const [loading, setLoading] = useState(false);
  const [organization, setOrganization] = useState({});
  const router = useRouter();
  const getOrganization = async () => {
    await axios
      .get(
        `http://localhost:8080/api/organizations/${router.query?.organization}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setOrganization(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    if (router.isReady) {
      getOrganization();
    }
  }, [router.isReady]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: [
      {
        name: organization.name ? organization.name : "",
        description: organization.description ? organization.description : "",
      },
    ],
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios.put(
          `http://localhost:8080/api/organizations/${router.query?.organization}`,
          values,
          {
            withCredentials: true,
          }
        );
        setLoading(false);
        toast.success("Organization updated successfully.");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message);
      }
    },
  });

  useEffect(() => {
    formik.setValues({
      name: organization.name,
      description: organization.description,
    });
  }, [organization]);

  return (
    <div>
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
            value={formik.values.name || ""}
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
            value={formik.values.description || ""}
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
  );
};

export default OrganizationUpdateForm;
