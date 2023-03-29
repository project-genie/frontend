import React, { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";
import Button from "./Button";
import CreateModal from "./CreateModal";
import Spinner from "./Spinner";
import TextInput from "./TextInput";

const TaskListHeader = ({ user }) => {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const openCreateTaskModal = () => {
    setIsCreateTaskModalOpen(true);
  };

  const closeCreateTaskModal = () => {
    setIsCreateTaskModalOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      createdBy: user.id,
      projectId: null,
      assigneeId: null,
      name: "",
      description: "",
      status: "",
      priority: "",
      dueDate: "",
      difficulty: "",
    },
    onSubmit: async (values) => {
      formik.values.projectId = router.query?.project;
      console.log(values);

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

            <button
              type="submit"
              className="text-neutral-50 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {loading ? <Spinner /> : <p>Create</p>}
            </button>
          </form>
        </div>
      </CreateModal>
    </div>
  );
};

export default TaskListHeader;
