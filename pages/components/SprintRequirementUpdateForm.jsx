import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import TextInput from "./TextInput";
import Spinner from "./Spinner";

const SprintRequirementUpdateForm = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [sprintRequirement, setSprintRequirement] = useState({});

  const getSprintRequirement = async () => {
    await axios
      .get(
        `http://localhost:8080/api/sprints/requirement/${router.query?.requirement}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setSprintRequirement(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: [
      {
        name: sprintRequirement.name ? sprintRequirement.name : "",
        description: sprintRequirement.description
          ? sprintRequirement.description
          : "",
      },
    ],
    onSubmit: async (values) => {
      setLoading(true);
      await axios
        .put(
          `http://localhost:8080/api/sprints/requirements/update/${router.query?.sprint}`,
          {
            name: values.name,
            description: values.description,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setLoading(false);
          toast.success("Sprint updated successfully.");
          setTimeout(() => {
            router.push(
              `/organizations/${router.query?.organization}/projects/${router.query?.project}/sprints/${router.query?.sprint}`
            );
          }, 2000);
        })
        .catch((err) => {
          setLoading(false);
        });
    },
  });

  const handleDeleteSprintRequirement = async () => {
    await axios
      .delete(
        `http://localhost:8080/api/sprints/requirements/delete/${router.query?.requirement}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success("Sprint requirement deleted successfully.");
        setTimeout(() => {
          router.push(
            `/organizations/${router.query?.organization}/projects/${router.query?.project}/sprints/${router.query?.sprint}`
          );
        }, 2000);
      });
  };

  useEffect(() => {
    formik.setValues({
      name: sprintRequirement.name,
      description: sprintRequirement.description,
    });
  }, [sprintRequirement]);

  useEffect(() => {
    if (router.isReady) {
      getSprintRequirement();
    }
  }, [router.isReady]);
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
            onClick={handleDeleteSprintRequirement}
          >
            {loading ? <Spinner /> : <p>Delete Sprint Requirement</p>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SprintRequirementUpdateForm;
