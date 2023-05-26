import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Spinner from "./Spinner";
import TextInput from "./TextInput";

const TaskUpdateForm = () => {
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState({});
  const [priority, setPriority] = useState("medium");

  const [projectMembers, setProjectMembers] = useState([]);
  const [assigneeId, setAssigneeId] = useState(null);

  const [isMembersOpen, setIsMembersOpen] = useState(false);

  const router = useRouter();

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

  const getTask = async () => {
    await axios
      .get(`http://localhost:8080/api/tasks/${router.query?.task}`, {
        withCredentials: true,
      })
      .then((res) => {
        setTask(res.data.data);
        setAssigneeId(res.data.data.assigneeId);
        setPriority(res.data.data.priority);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    if (router.isReady) {
      getTask();
      getProjectMembers();
    }
  }, [router.isReady]);

  const handleDeleteTask = async () => {
    try {
      await axios
        .delete(`http://localhost:8080/api/tasks/${router.query?.task}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success("Task deleted successfully.");
          router.push(
            `/organizations/${router.query?.organization}/projects/${router.query?.project}`
          );
        });
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: [
      {
        name: task.name ? task.name : "",
        description: task.description ? task.description : "",
      },
    ],
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios
          .put(
            `http://localhost:8080/api/tasks/update/${router.query?.task}`,
            {
              name: values.name,
              description: values.description,
              projectId: parseInt(router.query?.project),
              assigneeId: parseInt(assigneeId),
              priority: priority,
              difficulty: values.difficulty,
            },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log("responded: ", res);
            setLoading(false);
            toast.success("Task updated successfully.");

            setTimeout(() => {
              window.location.reload();
            }, 2000);
          })
          .catch((err) => {
            toast.error(err.response?.data.message);
          });
      } catch (error) {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    formik.setValues({
      name: task.name,
      description: task.description,
      difficulty: task.difficulty,
    });
  }, [task]);

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
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
          </select>
        </div>

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
            onClick={handleDeleteTask}
          >
            {loading ? <Spinner /> : <p>Delete Task</p>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskUpdateForm;
