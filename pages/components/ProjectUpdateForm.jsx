import React, { useState, useEffect, useMemo } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Spinner from "./Spinner";
import TextInput from "./TextInput";

const ProjectUpdateForm = () => {
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState({});
  const router = useRouter();
  const getProject = async () => {
    await axios
      .get(`http://localhost:8080/api/projects/${router.query?.project}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.data);
        setProject(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    if (router.isReady) {
      getProject();
    }
  }, [router.isReady]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: [
      {
        name: project.name ? project.name : "",
        description: project.description ? project.description : "",
      },
    ],
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios.put(
          `http://localhost:8080/api/projects/${router.query?.project}`,
          values,
          {
            withCredentials: true,
          }
        );
        setLoading(false);
        toast.success("Project updated successfully.");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        setLoading(false);
        toast.error(error.response?.data.message);
      }
    },
  });

  useEffect(() => {
    formik.setValues({
      name: project.name,
      description: project.description,
    });
  }, [project]);

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

        <button
          type="submit"
          className="text-neutral-50 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          {loading ? <Spinner /> : <p>Update</p>}
        </button>
      </form>
    </div>
  );
};

export default ProjectUpdateForm;
