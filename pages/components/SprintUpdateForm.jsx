import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Spinner from "./Spinner";
import TextInput from "./TextInput";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const SprintUpdateForm = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPhase, setCurrentPhase] = useState("");
  const [sprint, setSprint] = useState({});
  const router = useRouter();

  const getSprint = async () => {
    await axios
      .get(
        `http://localhost:8080/api/projects/sprint/${router.query?.sprint}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setSprint(res.data.data);
        setStartDate(new Date(res.data.data.startDate));
        setEndDate(new Date(res.data.data.endDate));
        setCurrentPhase(res.data.data.phase);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    if (router.isReady) {
      getSprint();
    }
  }, [router.isReady]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: [
      {
        name: sprint.name ? sprint.name : "",
        description: sprint.description ? sprint.description : "",
        phase: sprint.phase ? sprint.phase : "",
      },
    ],
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios.put(
          `http://localhost:8080/api/projects/sprints/update/${router.query?.sprint}`,
          {
            name: values.name,
            description: values.description,
            phase: currentPhase,
            projectId: router.query?.project,
            startDate,
            endDate,
          },
          {
            withCredentials: true,
          }
        );
        setLoading(false);
        toast.success("Sprint updated successfully.");
        setTimeout(() => {
          router.push(
            `/organizations/${router.query?.organization}/projects/${router.query?.project}/sprints/${router.query?.sprint}`
          );
        }, 2000);
      } catch (error) {
        setLoading(false);
        toast.error(error.response?.data.message);
      }
    },
  });

  useEffect(() => {
    formik.setValues({
      name: sprint.name,
      description: sprint.description,
      phase: sprint.phase,
    });
  }, [sprint]);

  const handleDeleteSprint = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `http://localhost:8080/api/projects/sprints/delete/${router.query?.sprint}`,
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      toast.success("Sprint deleted successfully.");
      setTimeout(() => {
        router.push(
          `/organizations/${router.query?.organization}/projects/${router.query?.project}`
        );
      }, 2000);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data.message);
    }
  };

  const phases = [
    "requirements",
    "development",
    "testing",
    "demo",
    "retrospective",
  ];

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

        <div>
          <p className="block mb-1 text-sm font-medium text-secondary-900">
            Start Date
          </p>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div>
          <p className="block mb-1 text-sm font-medium text-secondary-900">
            End Date
          </p>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </div>

        <div className="my-4">
          <p className="block mb-1 text-sm font-medium text-secondary-900">
            Phase
          </p>
          <div className="flex justify-start items-center flex-wrap">
            <div
              onClick={() => {
                setCurrentPhase("not started");
              }}
              className="px-4 py-2 rounded-md mr-2 hover:cursor-pointer text-white"
              style={
                currentPhase === "not started"
                  ? { backgroundColor: "#948A83" }
                  : { backgroundColor: "#B8AFA9" }
              }
            >
              Not Started
            </div>

            <div
              onClick={() => {
                setCurrentPhase("requirements");
              }}
              className="px-4 py-2 rounded-md mr-2 hover:cursor-pointer text-white"
              style={
                currentPhase === "requirements"
                  ? { backgroundColor: "#948A83" }
                  : { backgroundColor: "#B8AFA9" }
              }
            >
              Requirements
            </div>

            <div
              onClick={() => {
                setCurrentPhase("implementation");
              }}
              className="px-4 py-2 rounded-md mr-2 hover:cursor-pointer text-white"
              style={
                currentPhase === "implementation"
                  ? { backgroundColor: "#948A83" }
                  : { backgroundColor: "#B8AFA9" }
              }
            >
              Implementation
            </div>

            <div
              onClick={() => {
                setCurrentPhase("testing");
              }}
              className="px-4 py-2 rounded-md mr-2 hover:cursor-pointer text-white"
              style={
                currentPhase === "testing"
                  ? { backgroundColor: "#948A83" }
                  : { backgroundColor: "#B8AFA9" }
              }
            >
              Testing
            </div>

            <div
              onClick={() => {
                setCurrentPhase("demo");
              }}
              className="px-4 py-2 rounded-md mr-2 hover:cursor-pointer text-white"
              style={
                currentPhase === "demo"
                  ? { backgroundColor: "#948A83" }
                  : { backgroundColor: "#B8AFA9" }
              }
            >
              Demo
            </div>

            <div
              onClick={() => {
                setCurrentPhase("retrospective");
              }}
              className="px-4 py-2 rounded-md mr-2 hover:cursor-pointer text-white"
              style={
                currentPhase === "retrospective"
                  ? { backgroundColor: "#948A83" }
                  : { backgroundColor: "#B8AFA9" }
              }
            >
              Retrospective
            </div>
          </div>
        </div>

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
            onClick={handleDeleteSprint}
          >
            {loading ? <Spinner /> : <p>Delete Sprint</p>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SprintUpdateForm;
