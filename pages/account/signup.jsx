import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const { query, isReady, push } = useRouter();

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

  // useEffect(() => {
  //   if (isAuthenticated()) {
  //     router.push("/organizations");
  //   } else {
  //     router.push("/account/signup-candidate");
  //   }
  // }, []);

  // useEffect(() => {
  //   if (router.query?.email) {
  //     formik.values.email = router.query.email;
  //   }
  // }, [router.query]);

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
        formik.values.email = query.email;
        formik.values.secret = query.secret;
        console.log(values);
        setLoading(true);
        if (values.password !== values.confirmPassword) {
          setLoading(false);
          toast.error("Password and confirm password do not match.", {
            position: "bottom-right",
          });
          return;
        }

        const response = await axios.post(
          "http://localhost:8080/api/auth/signup",
          values,
          {
            withCredentials: true,
          }
        );
        setLoading(false);
        toast.success(
          "Registration is successful. You will be redirected to login page.",
          {
            position: "bottom-right",
          }
        );

        setTimeout(() => {
          push("/account/signin");
        }, 3000);
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message, {
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
          <Image
            src="/logo/logo_dark.svg"
            width={200}
            height={200}
            alt="Project Genie Logo"
          />
        </div>
        <div className="row-start-3 row-end-6 flex justify-center">
          <div className="w-[80%] block">
            <div className="mb-6">
              <h2 className="font-medium text-lg">Create your account.</h2>
            </div>
            {isReady && (
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3  ">
                  <label
                    htmlFor="email"
                    className="block mb-1 text-sm font-medium text-neutral-800"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-neutral-100 border border-neutral-800 text-neutral-800 text-sm rounded-lg  focus:ring-primary-500 focus:border-primary-500 outline-primary-500 block w-full p-2.5"
                    placeholder="example@provider.com"
                    onChange={formik.handleChange}
                    value={query.email}
                    disabled
                    required
                  />
                </div>

                <div className="mb-3  ">
                  <label
                    htmlFor="name"
                    className="block mb-1 text-sm font-medium text-neutral-800"
                  >
                    Name
                  </label>
                  <input
                    type="name"
                    id="name"
                    className="bg-transparent border border-neutral-800 text-neutral-800 text-sm rounded-lg  focus:ring-primary-500 focus:border-primary-500 outline-primary-500 block w-full p-2.5"
                    placeholder="John Doe"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    required
                  />
                </div>

                <div className="mb-3  ">
                  <label
                    htmlFor="password"
                    className="block mb-1 text-sm font-medium text-neutral-800"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="bg-transparent border border-neutral-800 text-neutral-800 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 outline-primary-500 block w-full p-2.5 "
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    required
                  />
                </div>

                <div className="mb-3  ">
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-1 text-sm font-medium text-neutral-800"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="bg-transparent border border-neutral-800 text-neutral-800 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 outline-primary-500 block w-full p-2.5 "
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="text-neutral-50 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  {loading ? <Spinner /> : <p>Sign Up</p>}
                </button>
              </form>
            )}
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
