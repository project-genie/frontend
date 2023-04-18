import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextInput from "../components/TextInput";
import Link from "next/link";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      secret: "",
    },
    onSubmit: async (values) => {
      try {
        formik.values.email = router.query.email;
        formik.values.secret = router.query.secret;
        setLoading(true);
        if (values.password !== values.confirmPassword) {
          setLoading(false);
          toast.error("Password and confirm password do not match.", {
            position: "bottom-right",
          });
          return;
        }

        console.log(values);

        await axios.post("http://localhost:8080/api/auth/signup", values, {
          withCredentials: true,
        });
        setLoading(false);
        toast.success(
          "Registration is successful. You will be redirected to login page.",
          {
            position: "bottom-right",
          }
        );

        setTimeout(() => {
          router.push("/account/signin");
        }, 3000);
      } catch (error) {
        setLoading(false);
        toast.error(error.response?.data.message, {
          position: "bottom-right",
        });
        console.log("Error occured!: ", error);
      }
    },
  });

  return (
    <div className="grid grid-cols-6 grid-rows-6 min-h-screen">
      <div className="grid lg:col-start-5 lg:col-end-7 lg:row-start-1 lg:row-end-7 row-start-1 row-end-4 col-start-1 col-end-7 py-5 bg-secondary-100">
        <div className="row-start-1 row-end-3 flex justify-center items-center">
          <Link href="/account/signin">
            <Image
              src="/logo/logo_dark.svg"
              width={200}
              height={200}
              alt="Project Genie Logo"
            />
          </Link>
        </div>
        <div className="row-start-3 row-end-6 flex justify-center">
          <div className="w-[80%] block">
            <div className="mb-6">
              <h2 className="font-medium text-lg">Create your account.</h2>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <TextInput
                id="email"
                type="email"
                label="Email"
                placeholder="Enter an email address"
                onChange={formik.handleChange}
                value={router.query?.email}
                required={true}
                disabled={true}
              />

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
                id="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                onChange={formik.handleChange}
                value={formik.values.password}
                required={true}
              />

              <TextInput
                id="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="Enter your password again"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                required={true}
              />

              <button
                type="submit"
                className="text-neutral-50 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                {loading ? <Spinner /> : <p>Sign Up</p>}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-neutral-900 lg:col-start-1 lg:col-end-5 lg:row-start-1 lg:row-end-7 row-start-4 row-end-7 col-start-1 col-end-7">
        <div className="flex justify-center items-center h-full">
          <Image
            src="/logo/logo_light.svg"
            width={400}
            height={400}
            alt="Project Genie Logo"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
