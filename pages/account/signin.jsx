import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import { NextResponse } from "next/server";
import axios from "axios";
import Router, { useRouter } from "next/router";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const isAuthenticated = async () => {
    try {
      await axios.get(process.env.BACKEND_URL + "/api/organizations", {
        withCredentials: true,
      });
      return true;
    } catch (error) {
      return false;
    }
  };
  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/organizations");
    } else {
      router.push("/account/signin");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "mertuygur02@gmail.com",
      password: "Hachiko2k.pr",
    },
    onSubmit: async (values) => {
      console.log("values", values);
      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/signin",
          values,
          {
            withCredentials: true,
          }
        );
        console.log("Response: ", response);
        router.push("/organizations");
      } catch (error) {
        console.log("Error occured!: ", error);
      }
    },
  });

  return (
    <div className="grid grid-cols-12 min-h-screen">
      <div className="col-start-1 col-end-4">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="col-start-4 col-end-13"></div>
    </div>
  );
};

export default SignIn;
