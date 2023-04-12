import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import TaskStatusButton from "./TaskStatusButton";
import TaskExtendedChunk from "./TaskExtendedChunk";
import ButtonTertiary from "./ButtonTertiary";
import CreateModal from "./CreateModal";
import Spinner from "./Spinner";
import TextInput from "./TextInput";
import { Field, FormikProvider, useFormik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";
import Image from "next/image";

const TaskCard = ({
  id,
  name,
  description,
  priority,
  status,
  assigneeId,
  createdAt,
  exception,
  difficulty,
  dueDate,
  user,
}) => {
  const [assignee, setAssignee] = useState({});
  const [showExtendedTaskView, setShowExtendedTaskView] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState([]);
  const [dateValue, setDateValue] = useState(new Date(dueDate));
  const router = useRouter();

  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/users/${assigneeId}`,
        {
          withCredentials: true,
        }
      );
      setAssignee(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleExtendedTaskView = () => {
    setShowExtendedTaskView(!showExtendedTaskView);
  };

  const openEditTaskModal = () => {
    console.log("en");
    setIsEditTaskModalOpen(true);
  };

  const closeEditTaskModal = () => {
    setIsEditTaskModalOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      name,
      description,
      priority,
      status,
      assigneeId,
      exception,
      difficulty,
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);

        await axios.put(`http://localhost:8080/api/tasks/${id}`, values, {
          withCredentials: true,
        });
        setLoading(false);
        closeEditTaskModal();
        toast.success("Task updated successfully.");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message);
      }
    },
  });

  useEffect(() => {
    formik.setValues({
      name,
      description,
      priority,
      status,
      assigneeId,
      exception,
      difficulty,
    });
  }, [isEditTaskModalOpen, name, description]);

  const getPeople = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/projects/${router.query?.project}/members`,
        {
          withCredentials: true,
        }
      );
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

  const handleUpdateTask = (status) => async () => {
    try {
      setLoading(true);
      await axios.put(
        `http://localhost:8080/api/tasks/${id}`,
        {
          status,
          assigneeId,
        },
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      toast.success("Task updated successfully.");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const handleCompleteTask = async () => {
    try {
      setLoading(true);
      await axios.post(
        `http://localhost:8080/api/tasks/${id}/complete`,
        {},
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      toast.success("Task completed successfully.");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleRemoveTask = async () => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8080/api/tasks/${id}`, {
        withCredentials: true,
      });
      setLoading(false);
      toast.success("Task removed successfully.");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="p-4 rounded-md bg-secondary-100 my-2">
      <div className="flex items-center justify-between">
        <div
          className="flex justify-center items-center"
          onClick={handleExtendedTaskView}
        >
          <Image
            className="mr-1"
            src="/icons/golf.svg"
            alt="golf hole"
            width={24}
            height={24}
          />
          <h2 className="text-neutral-800 underline hover:cursor-pointer">
            {name}
          </h2>
          {/* <p className="text-sm font-medium text-secondary-700 underline hover:cursor-pointer">
            {assignee?.name}
          </p> */}
        </div>
        <div>
          <TaskStatusButton
            id={id}
            status={status}
            assigneeId={assigneeId}
            user={user}
            taskId={id}
          />
        </div>
      </div>
      {showExtendedTaskView && (
        <div className="flex flex-col justify-start items-start p-4 rounded-lg my-2">
          <div className="flex justify-center">
            <ButtonTertiary
              icon="edit"
              text="Edit"
              handle={openEditTaskModal}
            />
            <ButtonTertiary
              icon="check"
              text="Done"
              handle={handleUpdateTask("done")}
            />
            <ButtonTertiary
              icon="in-progress"
              text="In Progress"
              handle={handleUpdateTask("in-progress")}
            />
            <ButtonTertiary
              icon="stop"
              text="Backlog"
              handle={handleUpdateTask("backlog")}
            />
            <ButtonTertiary
              icon="stop"
              text="Complete"
              handle={handleCompleteTask}
            />
            <ButtonTertiary
              icon="trash"
              text="Remove"
              handle={handleRemoveTask}
            />
          </div>
          <div className="flex justify-start items-start w-full">
            <div className="mr-10">
              <TaskExtendedChunk description="Assignee" text={assignee?.name} />
              <TaskExtendedChunk description="Created At" text={createdAt} />
              <TaskExtendedChunk description="Priority" text={priority} />
            </div>
            <div>
              <TaskExtendedChunk description="Difficulty" text={difficulty} />
              <TaskExtendedChunk description="Status" text={status} />
              <TaskExtendedChunk
                description="Exception"
                text={exception ? "Yes" : "No"}
              />
            </div>
          </div>
        </div>
      )}
      <CreateModal
        isOpen={isEditTaskModalOpen}
        closeModal={closeEditTaskModal}
        contentLabel="Edit Task"
      >
        <div className="w-full">
          <div className="mb-6">
            <h2 className="font-medium text-lg">Edit task.</h2>
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
                  <option key="default" value="" disabled>
                    Select an assignee
                  </option>
                  {people.map((person) => (
                    <option key={person.id} value={person.id}>
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
              </div>

              <button
                type="submit"
                className="text-neutral-50 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                {loading ? <Spinner /> : <p>Edit</p>}
              </button>
            </form>
          </FormikProvider>
        </div>
      </CreateModal>
    </div>
  );
};

export default TaskCard;
