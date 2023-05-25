import React, { useState } from "react";
import { useFormik } from "formik";
import TextInput from "./TextInput";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";

const CreateProjectCard = () => {
  const [loading, setLoading] = useState(false);
  const [projectType, setProjectType] = useState("waterfall");
  const [step, setStep] = useState(1);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      organizationId: "",
      type: projectType,
    },
    onSubmit: async (values) => {
      formik.values.organizationId = router.query.organization;
      try {
        setLoading(true);
        await axios.post(
          "http://localhost:8080/api/projects",
          {
            name: formik.values.name,
            description: formik.values.description,
            organizationId: formik.values.organizationId,
            type: projectType,
          },
          {
            withCredentials: true,
          }
        );
        setLoading(false);
        toast.success("Project created successfully.");
        setTimeout(() => {
          router.push(`/organizations/${router.query?.organization}/projects`);
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
          Create project
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

      <form onSubmit={formik.handleSubmit}>
        {step === 1 && (
          <>
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
            <div>
              <p className="">
                Please select the development process you will follow for this
                project.
              </p>
            </div>
            <div className="flex justify-center items-center w-full p-4 my-5">
              <div
                className="mx-2 flex flex-col justify-center items-center hover:cursor-pointer hover:-translate-y-2 transform transition-all"
                onClick={() => {
                  setProjectType("waterfall");
                }}
              >
                <div
                  style={
                    projectType === "waterfall"
                      ? { backgroundColor: "#D82F54" }
                      : { backgroundColor: "#CABFB9" }
                  }
                  className="p-4 rounded-md"
                >
                  <Image
                    src={"/icons/water.svg"}
                    width={80}
                    height={80}
                    alt="waterfall"
                  />
                </div>
                <p>Waterfall</p>
              </div>
              <div
                className="mx-2 flex flex-col justify-center items-center hover:cursor-pointer hover:-translate-y-2 transform transition-all"
                onClick={() => {
                  setProjectType("agile");
                }}
              >
                <div
                  style={
                    projectType === "agile"
                      ? { backgroundColor: "#D82F54" }
                      : { backgroundColor: "#CABFB9" }
                  }
                  className="p-4 rounded-md"
                >
                  <Image
                    src={"/icons/sprint.svg"}
                    width={80}
                    height={80}
                    alt="sprint"
                  />
                </div>

                <p>Agile</p>
              </div>
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

export default CreateProjectCard;
