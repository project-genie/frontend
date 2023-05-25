import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import TextInput from "./TextInput";

const CreateSprintCard = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios
          .post(
            `http://localhost:8080/api/projects/sprints/${router.query?.project}`,
            {
              name: values.name,
              description: values.description,
              startDate: startDate,
              endDate: endDate,
            },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log("create sprint res: ", res);
          })
          .catch((err) => {
            console.log(err);
          });
        setLoading(false);
        toast.success("Sprint created successfully.");
        setTimeout(() => {
          router.push(
            `/organizations/${router.query?.organization}/projects/${router.query?.project}/sprints`
          );
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
          Create sprint
        </h2>
        <p className="font-bold text-secondary-900 text-lg">
          <span className="bg-primary-600 rounded-md px-4 py-2 text-white">
            {step}
          </span>{" "}
          /{" "}
          <span className="bg-secondary-800 rounded-md px-4 py-2 text-white">
            2
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

            <div className="flex justify-between flex-row-reverse">
              <button
                onClick={() => {
                  setStep(2);
                }}
                className="text-neutral-50 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                <p>Next Step</p>
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="my-2">
              <p>Start Date</p>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="my-2">
              <p>End Date</p>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="text-neutral-50 bg-secondary-900 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                <p>Previous Step</p>
              </button>
              <button
                type="submit"
                className="text-neutral-50 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                <p>Create</p>
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default CreateSprintCard;
