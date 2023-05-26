import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";
import Button from "./Button";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";

const TaskListHeader = () => {
  const [user, setUser] = useState({});
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
      {user?.role === "owner" && (
        <Button
          text="Create Task"
          handle={() => {
            router.push(
              `/organizations/${router.query?.organization}/projects/${router.query?.project}/tasks/create`
            );
          }}
        />
      )}
    </div>
  );
};

export default TaskListHeader;
