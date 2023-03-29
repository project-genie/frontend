import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import TextInput from "../components/TextInput";

const SignUpCandidate = () => {
  const [loading, setLoading] = useState(false);
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
  // useEffect(() => {
  //   if (isAuthenticated()) {
  //     router.push("/organizations");
  //   } else {
  //     router.push("/account/signup-candidate");
  //   }
  // }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:8080/api/auth/signupcandidate",
          values,
          {
            withCredentials: true,
          }
        );
        setLoading(false);
        toast.success(
          "Please check your email to continue registering process.",
          {
            position: "bottom-right",
          }
        );
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

            <form onSubmit={formik.handleSubmit}>
              <TextInput
                id="email"
                type="email"
                label="Email"
                placeholder="Enter an email address"
                onChange={formik.handleChange}
                value={formik.values.email}
                required={true}
              />

              <div className="my-3">
                <p className="text-sm">
                  Already have an account?{" "}
                  <Link
                    href="/account/signin"
                    className="text-primary-500 underline
                  "
                  >
                    Sign In
                  </Link>{" "}
                  instead.
                </p>
              </div>

              <button
                type="submit"
                className="text-neutral-50 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                {loading ? <Spinner /> : <p>Continue</p>}
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

export default SignUpCandidate;
