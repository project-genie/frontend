import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import CreateModal from "./CreateModal";
import { Field, FormikProvider } from "formik";
import TextInput from "./TextInput";
import Spinner from "./Spinner";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import ButtonError from "./ButtonError";

const TaskCandidateCard = ({
  id,
  name,
  description,
  assigneeId,
  createdAt,
  user,
  owner,
}) => {
  const [loading, setLoading] = useState(false);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [assignee, setAssignee] = useState({});

  const acceptTaskCandidate = async () => {
    try {
    } catch (error) {}
  };

  const rejectTaskCandidate = async () => {
    try {
    } catch (error) {}
  };

  const formik = useFormik({
    initialValues: {
      name,
      description,
      priority: "medium",
      difficulty: 5,
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios.post(
          `http://localhost:8080/api/tasks/candidate/${id}/accept`,
          values,
          {
            withCredentials: true,
          }
        );
        setLoading(false);
        setIsCreateTaskModalOpen(false);
        toast.success(
          "Task accepted successfully. Now it can be seen in the task list."
        );
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        setLoading(false);

        toast.error(error.response?.data.message);
      }
    },
  });

  const getAssignee = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/users/${assigneeId}`,
        {
          withCredentials: true,
        }
      );
      setAssignee(response.data.data);
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    getAssignee();
  }, [assigneeId]);

  return (
    <div className="flex justify-between p-4 rounded.md bg-secondary-100 my-2">
      <div className="flex-col justify-start items-start">
        <div className="flex justify-start items-center">
          <Image
            className="mr-1"
            src="/icons/golf.svg"
            alt="golf hole"
            width={20}
            height={20}
          />
          <h2 className="text-neutral-800 underline hover:cursor-pointer text-sm">
            {name}
          </h2>
        </div>
        <div>
          <p>{description}</p>
        </div>
      </div>
      {owner && (
        <div>
          <Button
            text={"Accept"}
            handle={() => {
              setIsCreateTaskModalOpen(true);
            }}
          />
          <ButtonError text={"Reject"} handle={rejectTaskCandidate} />
        </div>
      )}

      <CreateModal
        isOpen={isCreateTaskModalOpen}
        closeModal={() => setIsCreateTaskModalOpen(false)}
        contentLabel="Accept Task"
      >
        <div className="w-full">
          <div className="mb-6">
            <h2 className="font-medium text-lg">Accept task.</h2>
          </div>
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              <div className="text-sm py-2">
                <p>
                  Assignee: <b>{assignee?.name}</b> - Level:{" "}
                  <b>{assignee?.level}</b>
                </p>
              </div>
              <TextInput
                disabled={true}
                id="name"
                label="Name"
                onChange={formik.handleChange}
                value={formik.values.name}
                required={true}
                placeholder={"Enter task name"}
              />
              <TextInput
                disabled={true}
                id="description"
                label="Description"
                onChange={formik.handleChange}
                value={formik.values.description}
                required={true}
                placeholder={"Enter task description"}
              />

              <div className="mb-3">
                <label
                  htmlFor="priority"
                  className="block mb-1 text-sm font-medium text-neutral-800"
                >
                  Priority*
                </label>
                <Field
                  name="priority"
                  as="select"
                  className="bg-transparent border border-neutral-800 text-neutral-800 text-sm rounded-lg  focus:ring-primary-500 focus:border-primary-500 outline-primary-500 block p-2.5 w-full"
                >
                  <option key="default" value="" disabled>
                    Select priority
                  </option>
                  <option key="low" value="low">
                    Low
                  </option>
                  <option key="medium" value="medium">
                    Medium
                  </option>
                  <option key="high" value="high">
                    High
                  </option>
                </Field>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="difficulty"
                  className="block mb-1 text-sm font-medium text-neutral-800"
                >
                  Difficulty*
                </label>
                <Field
                  name="difficulty"
                  as="select"
                  className="bg-transparent border border-neutral-800 text-neutral-800 text-sm rounded-lg  focus:ring-primary-500 focus:border-primary-500 outline-primary-500 block p-2.5 w-full"
                >
                  <option key="default" value="" disabled>
                    Select difficulty
                  </option>
                  {[...Array(10)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </Field>
              </div>

              <button
                type="submit"
                className="text-neutral-50 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                {loading ? <Spinner /> : <p>Accept</p>}
              </button>
            </form>
          </FormikProvider>
        </div>
      </CreateModal>
    </div>
  );
};

export default TaskCandidateCard;
