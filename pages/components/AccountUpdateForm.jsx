import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import TextInput from "./TextInput";

const AccountUpdateForm = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const getUser = async () => {
    await axios
      .get(`http://localhost:8080/api/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: [
      {
        name: user.name ? user.name : "",
        email: user.email ? user.email : "",
      },
    ],
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios.put(`http://localhost:8080/api/users/${user.id}`, values, {
          withCredentials: true,
        });
        setLoading(false);
        toast.success("Account updated successfully.");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        setLoading(false);
        toast.error(error.response?.data.message);
      }
    },
  });

  useEffect(() => {
    formik.setValues({
      name: user.name,
      email: user.email,
    });
  }, [user]);

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
          id="email"
          type="email"
          label="Email"
          placeholder="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
          disabled={true}
          required={true}
        />

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="text-neutral-50 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? <Spinner /> : <p>Update</p>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountUpdateForm;
