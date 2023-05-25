import React, { useEffect, useState } from "react";
import { Field, FormikProvider, useFormik } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";
import Button from "./Button";
import CreateModal from "./CreateModal";
import Spinner from "./Spinner";
import TextInput from "./TextInput";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";

const TaskListHeader = () => {
  const [user, setUser] = useState({});
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getUser = async () => {
    await axios
      .get(
        `http://localhost:8080/api/projects/currentuserproject/${router.query?.project}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setUser(response.data.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  useEffect(() => {
    if (router.isReady) {
      getUser();
    }
  }, [router.isReady]);

  const openCreateTaskModal = () => {
    setIsCreateTaskModalOpen(true);
  };

  const closeCreateTaskModal = () => {
    setIsCreateTaskModalOpen(false);
  };

  const getPeople = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/projects/${router.query?.project}/members`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data.data);
      setPeople(response.data.data);
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      getPeople();
    }
  }, [router.isReady]);

  const formik = useFormik({
    initialValues: {
      projectId: 0,
      name: "",
      description: "",
    },
    onSubmit: async (values) => {
      formik.values.projectId = parseInt(router.query?.project);
      try {
        setLoading(true);
        await axios.post("http://localhost:8080/api/tasks/candidate", values, {
          withCredentials: true,
        });
        setLoading(false);
        closeCreateTaskModal();
        toast.success(
          "Task candidate created successfully. Please go to the task candidates page to see it."
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

  return (
    <div className="flex justify-between items-center border-b border-b-secondary-400">
      <div className="flex justify-center items-center">
        <Image
          className="mr-1"
          src="/icons/brown_golf.svg"
          alt="Golf hole"
          width={20}
          height={20}
        />
        <h1 className="font-bold uppercase text-neutral-800">Tasks</h1>
      </div>
      <Button
        text="Create Task"
        handle={() => {
          openCreateTaskModal();
        }}
      />
      <CreateModal
        isOpen={isCreateTaskModalOpen}
        closeModal={() => setIsCreateTaskModalOpen(false)}
        contentLabel="Create Task"
      >
        <div className="w-full">
          <div className="mb-6">
            <h2 className="font-medium text-lg">Create task.</h2>
          </div>
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              <TextInput
                id="name"
                label="Name"
                onChange={formik.handleChange}
                value={formik.values.name}
                required={true}
                placeholder={"Enter task name"}
              />
              <TextInput
                id="description"
                label="Description"
                onChange={formik.handleChange}
                value={formik.values.description}
                required={true}
                placeholder={"Enter task description"}
              />

              {/* <div className="mb-3">
                <label
                  htmlFor="assigneeId"
                  className="block mb-1 text-sm font-medium text-neutral-800"
                >
                  Assignee*
                </label>
                <Field
                  name="assigneeId"
                  as="select"
                  className="bg-transparent border border-neutral-800 text-neutral-800 text-sm rounded-lg  focus:ring-primary-500 focus:border-primary-500 outline-primary-500 block p-2.5 w-full"
                >
                  <option key="default" value={0} disabled>
                    Select an assignee
                  </option>
                  {people.map((person) => (
                    <option key={person.user.id} value={person.user.id}>
                      {person.user.name}
                    </option>
                  ))}
                </Field>
              </div>

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
              </div> */}

              <button
                type="submit"
                className="text-neutral-50 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                {loading ? <Spinner /> : <p>Create</p>}
              </button>
            </form>
          </FormikProvider>
        </div>
      </CreateModal>
    </div>
  );
};

export default TaskListHeader;
