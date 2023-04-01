import React, { useEffect, useState } from "react";
import { Field, FormikProvider, useFormik } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";
import Button from "./Button";
import CreateModal from "./CreateModal";
import Spinner from "./Spinner";
import TextInput from "./TextInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TaskListHeader = () => {
  const [user, setUser] = useState({});
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateValue, setDateValue] = useState(() => {
    let today = new Date();
    today.setDate(today.getDate() + 1);
    return today;
  });
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
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      getPeople();
    }
  }, [router.isReady]);

  const formik = useFormik({
    initialValues: {
      createdBy: 0,
      projectId: 0,
      assigneeId: 0,
      name: "",
      description: "",
      priority: "",
      dueDate: "",
      difficulty: 3,
    },
    onSubmit: async (values) => {
      console.log("values user: ", user);
      formik.values.projectId = parseInt(router.query?.project);
      formik.values.dueDate = new Date(dateValue);
      formik.values.createdBy = user.id;
      formik.values.assigneeId = parseInt(values.assigneeId);

      try {
        setLoading(true);
        await axios.post("http://localhost:8080/api/tasks", values, {
          withCredentials: true,
        });
        setLoading(false);
        closeCreateTaskModal();
        toast.success("Task created successfully.");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        setLoading(false);

        toast.error(error.response.data.message);
      }
    },
  });

  const handleDateChange = (newValue) => {
    const today = new Date();
    if (newValue < today) {
      toast.error("Due date cannot be in the past.");
      return;
    }
    setDateValue(newValue);
  };

  return (
    <div className="flex justify-between items-center">
      <h1>Tasks</h1>
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

              <div className="mb-3">
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
                  <option key={1} value={1}>
                    1
                  </option>
                  <option key={2} value={2}>
                    2
                  </option>
                  <option key={3} value={3}>
                    3
                  </option>
                  <option key={4} value={4}>
                    4
                  </option>
                  <option key={5} value={5}>
                    5
                  </option>
                </Field>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="duedate"
                  className="block mb-1 text-sm font-medium text-neutral-800"
                >
                  Due Date*
                </label>
                <DatePicker
                  selected={dateValue}
                  onChange={(date) => handleDateChange(date)}
                  timeInputLabel="Time:"
                  dateFormat="MM/dd/yyyy h:mm aa"
                  showTimeInput
                />
              </div>
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
