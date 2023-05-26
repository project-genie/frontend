import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import TextInput from "./TextInput";

const CreateSprintRequirementCard = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const CreateSprintRequirementSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Name is required."),
    description: Yup.string()
      .min(3, "Too Short!")
      .max(100, "Too Long!")
      .required("Description is required."),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: CreateSprintRequirementSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios
          .post(
            `http://localhost:8080/api/sprints/requirements/create/${router.query?.sprint}`,
            values,
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log("create sprint req res: ", res);
            toast.success("Sprint requirement created successfully.");
          })
          .catch((err) => {
            console.log(err);
          });
        setLoading(false);
        setTimeout(() => {
          router.push(
            `/organizations/${router.query?.organization}/projects/${router.query?.project}/sprints/${router.query?.sprint}`
          );
        }, 2000);
      } catch (error) {
        setLoading(false);
      }
    },
  });

  return (
    <div className="w-1/2 md:w-1/3 flex flex-col justify-center items-center">
      <div className="mb-6 flex flex-col items-center">
        <h2 className="font-bold text-secondary-900 text-lg uppercase mb-6">
          Create sprint requirement
        </h2>
        <p className="font-bold text-secondary-900 text-lg">
          <span className="bg-primary-600 rounded-md px-4 py-2 text-white">
            {step}
          </span>{" "}
          /{" "}
          <span className="bg-secondary-800 rounded-md px-4 py-2 text-white">
            1
          </span>
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="sm:w-1/2">
        {step === 1 && (
          <>
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
          </>
        )}

        <button
          type="submit"
          className="text-neutral-50 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          <p>Create</p>
        </button>
        {formik.errors.name && formik.touched.name ? (
          <div className="my-2 flex justify-center items-center text-primary-600">
            {formik.errors.name}
          </div>
        ) : null}
        {formik.errors.description && formik.touched.description ? (
          <div className="my-2 flex justify-center items-center text-primary-600">
            {formik.errors.description}
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default CreateSprintRequirementCard;
