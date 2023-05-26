import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";
import Button from "./Button";
import * as Yup from "yup";
import TextInput from "./TextInput";

const CreateTaskCard = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [priority, setPriority] = useState("medium");
  const [projectMembers, setProjectMembers] = useState([]);
  const [isMembersOpen, setIsMembersOpen] = useState(false);
  const [isSprintsOpen, setIsSprintsOpen] = useState(false);
  const [isSprintRequirementsOpen, setIsSprintRequirementsOpen] =
    useState(false);
  const [assigneeId, setAssigneeId] = useState(null);
  const [sprints, setSprints] = useState([]);
  const [sprintId, setSprintId] = useState(null);
  const [sprintRequirements, setSprintRequirements] = useState([]);
  const [sprintRequirementId, setSprintRequirementId] = useState(null);

  const CreateTaskSchema = Yup.object().shape({
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
      priority: priority,
      difficulty: 5,
    },
    validationSchema: CreateTaskSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios
          .post(
            `http://localhost:8080/api/tasks/create`,
            {
              name: values.name,
              description: values.description,
              priority: values.priority,
              difficulty: parseInt(values.difficulty),
              projectId: parseInt(router.query?.project),
              assigneeId: parseInt(assigneeId),
              sprintId: parseInt(sprintId),
              sprintRequirementId: parseInt(sprintRequirementId),
            },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log("create task res: ", res);
            toast.success("Task created successfully.");
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.response?.data.message);
          });
        setLoading(false);
        //   setTimeout(() => {
        //     router.push(
        //       `/organizations/${router.query?.organization}/projects/${router.query?.project}`
        //     );
        //   }, 2000);
      } catch (error) {
        setLoading(false);
      }
    },
  });

  const getProjectMembers = async () => {
    try {
      await axios
        .get(
          `http://localhost:8080/api/projects/${router.query?.project}/members`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log("Members: ", res.data.data);
          setProjectMembers(res.data.data);
        });
    } catch (error) {
      console.log("Error getting project members: ", error);
    }
  };

  const getSprints = async () => {
    try {
      await axios
        .get(`http://localhost:8080/api/sprints/${router.query?.project}`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log("Sprints: ", res.data.data);
          setSprints(res.data.data);
        });
    } catch (error) {
      console.log("Error while getting project sprints: ", error);
    }
  };

  const getSprintRequirements = async (sprintId) => {
    try {
      await axios
        .get(`http://localhost:8080/api/sprints/requirements/${sprintId}`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log("Sprint requirements: ", res.data.data);
          setSprintRequirements(res.data.data);
        });
    } catch (error) {
      console.log("Error while getting sprint requirements: ", error);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      getProjectMembers();
      getSprints();
    }
  }, [router.isReady]);

  return (
    <div className="w-1/2 md:w-1/3 flex flex-col justify-center items-center">
      <div className="mb-6 flex flex-col items-center">
        <h2 className="font-bold text-secondary-900 text-lg uppercase mb-6">
          Create task
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

            <div className="my-4">
              <p className="block mb-1 text-sm font-medium text-secondary-900">
                Priority
              </p>
              <div className="flex justify-start items-center flex-wrap">
                <div
                  onClick={() => {
                    setPriority("low");
                  }}
                  className="px-4 py-2 rounded-md mr-2 hover:cursor-pointer text-white"
                  style={
                    priority === "low"
                      ? { backgroundColor: "#948A83" }
                      : { backgroundColor: "#B8AFA9" }
                  }
                >
                  Low
                </div>

                <div
                  onClick={() => {
                    setPriority("medium");
                  }}
                  className="px-4 py-2 rounded-md mr-2 hover:cursor-pointer text-white"
                  style={
                    priority === "medium"
                      ? { backgroundColor: "#948A83" }
                      : { backgroundColor: "#B8AFA9" }
                  }
                >
                  Medium
                </div>

                <div
                  onClick={() => {
                    setPriority("high");
                  }}
                  className="px-4 py-2 rounded-md mr-2 hover:cursor-pointer text-white"
                  style={
                    priority === "high"
                      ? { backgroundColor: "#948A83" }
                      : { backgroundColor: "#B8AFA9" }
                  }
                >
                  High
                </div>
              </div>
            </div>

            <div className="my-4">
              <p className="block mb-1 text-sm font-medium text-secondary-900">
                Difficulty
              </p>
              {/* Formik select component 1- 10 difficulty. */}
              <select
                id="difficulty"
                name="difficulty"
                onChange={formik.handleChange}
                value={formik.values.difficulty}
                className="block w-full px-4 py-2 rounded-md bg-secondary-400 border-transparent focus:border-neutral-500 focus:bg-white focus:ring-0"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

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
            <div className="my-4">
              <p className="block mb-1 text-sm font-medium text-secondary-900">
                Assignee
              </p>
              <div className="flex justify-start items-center flex-wrap relative">
                <div
                  className="px-4 py-2 rounded-md hover:cursor-pointer bg-secondary-200 text-secondary-900 w-full"
                  onClick={() => {
                    setIsMembersOpen(!isMembersOpen);
                  }}
                >
                  {assigneeId ? (
                    <>
                      {projectMembers.map((member) => {
                        if (member.userId === assigneeId) {
                          return member.user.name;
                        }
                      })}
                    </>
                  ) : (
                    "Select an Assignee"
                  )}
                </div>
                {isMembersOpen && (
                  <div className="absolute left-0 top-11 bg-secondary-200 w-full p-2 z-50">
                    {projectMembers.map((member) => (
                      <div
                        key={member.userId}
                        onClick={() => {
                          setAssigneeId(member.userId);
                          setIsMembersOpen(false);
                        }}
                        className="px-4 py-2 rounded-md hover:cursor-pointer text-white"
                        style={
                          assigneeId === member.userId
                            ? { backgroundColor: "#948A83" }
                            : { backgroundColor: "#B8AFA9" }
                        }
                      >
                        <p>
                          {member.user.name} - {member.user.level}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="my-4">
              <p className="block mb-1 text-sm font-medium text-secondary-900">
                Sprint
              </p>
              <div className="flex justify-start items-center flex-wrap relative">
                <div
                  className="px-4 py-2 rounded-md hover:cursor-pointer bg-secondary-200 text-secondary-900 w-full"
                  onClick={() => {
                    setIsSprintsOpen(!isSprintsOpen);
                  }}
                >
                  {sprintId ? (
                    <>
                      {sprints.map((sprint) => {
                        if (sprint.id === sprintId) {
                          return sprint.name;
                        }
                      })}
                    </>
                  ) : (
                    "Select a sprint"
                  )}
                </div>
                {isSprintsOpen && (
                  <div className="absolute left-0 top-11 bg-secondary-200 w-full p-2 z-40">
                    {sprints.map((sprint) => (
                      <div
                        key={sprint.id}
                        onClick={() => {
                          setSprintId(sprint.id);
                          setIsSprintsOpen(false);
                          getSprintRequirements(sprint.id);
                          setSprintRequirementId(null);
                        }}
                        className="px-4 py-2 rounded-md hover:cursor-pointer text-white my-2"
                        style={
                          sprintId === sprint.id
                            ? { backgroundColor: "#948A83" }
                            : { backgroundColor: "#B8AFA9" }
                        }
                      >
                        <p>{sprint.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="my-4">
              <p className="block mb-1 text-sm font-medium text-secondary-900">
                Sprint Requirement
              </p>
              <div className="flex justify-start items-center flex-wrap relative">
                <div
                  className="px-4 py-2 rounded-md hover:cursor-pointer bg-secondary-200 text-secondary-900 w-full"
                  onClick={() => {
                    setIsSprintRequirementsOpen(!isSprintRequirementsOpen);
                  }}
                >
                  {sprintRequirementId ? (
                    <>
                      {sprintRequirements.map((sprintRequirement) => {
                        if (sprintRequirement.id === sprintRequirementId) {
                          return sprintRequirement.name;
                        }
                      })}
                    </>
                  ) : (
                    "Select a sprint requirement"
                  )}
                </div>
                {isSprintRequirementsOpen && (
                  <div className="absolute left-0 top-11 bg-secondary-200 w-full p-2 z-30">
                    {sprintRequirements.map((sprintRequirement) => (
                      <div
                        key={sprintRequirement.id}
                        onClick={() => {
                          setSprintRequirementId(sprintRequirement.id);
                          setIsSprintRequirementsOpen(false);
                        }}
                        className="px-4 py-2 rounded-md hover:cursor-pointer text-white my-2"
                        style={
                          sprintId === sprintRequirement.id
                            ? { backgroundColor: "#948A83" }
                            : { backgroundColor: "#B8AFA9" }
                        }
                      >
                        <p>{sprintRequirement.name}</p>
                      </div>
                    ))}
                  </div>
                )}
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
          </>
        )}
      </form>
    </div>
  );
};

export default CreateTaskCard;
