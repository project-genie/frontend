import React, { useState, useEffect, useMemo } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Spinner from "./Spinner";
import TextInput from "./TextInput";

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

  const handleDeleteOrganization = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `http://localhost:8080/api/organizations/${router.query?.organization}`,
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      toast.success("Organization deleted successfully.");
      setTimeout(() => {
        router.push("/organizations");
      }, 2000);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
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
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="text-neutral-50 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? <Spinner /> : <p>Update</p>}
          </button>

          <button
            type="button"
            className="text-neutral-50 bg-error-300 hover:bg-error-400 focus:ring-4 focus:outline-none focus:ring-error-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            onClick={handleDeleteOrganization}
          >
            {loading ? <Spinner /> : <p>Delete Organization</p>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrganizationUpdateForm;
