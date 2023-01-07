import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

import Toast from "../../component/utils/toast";
import useForm from "../../hooks/form";
import { login } from "../../state-mgt/auth.actions";
import { error, errorSvg, successSvg } from "./signup";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<error[]>([]);
  const [success, setSuccess] = useState(false);

  const router = useRouter();
  const intialValues = {
    email: "",
  };

  const handleForgotPassword = async (values: any) => {
    try {
      setLoading(true);
      const emailResponse = await axios.post(
        `http://localhost:4000/forgot-password`,
        {
          email: values.email,
        },
        {
          withCredentials: true,
        }
      );

      if (emailResponse) {
        setTimeout(() => {
          setLoading(false);
          setSuccess(true);
        }, 3000);

        setTimeout(() => {
          router.push("/auth/reset-password");
          setSuccess(false);
        }, 5000);
      }
    } catch (error) {
      console.log(error);
      setErrors((prevErrors) => [
        ...prevErrors,
        {
          message: "oops something went wrong",
        },
      ]);
      setLoading(false);
      setSuccess(false);
    }
  };

  const handleResetValidation = (values: any) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (values.email.trim() === "") {
      setErrors((prevErrors) => [
        ...prevErrors,
        {
          message: `please enter your email `,
        },
      ]);
    } else if (!regex.test(values.email)) {
      setErrors((prevErrors) => [
        ...prevErrors,
        {
          message: "please enter a valid email",
        },
      ]);
    }
  };
  const { values, handleChange, handleSubmit } = useForm(
    intialValues,
    handleForgotPassword
  );

  return (
    <div className="relative h-full w-full overflow-y-hidden flex gap-x-2 items-center">
      {errors.length > 0 && (
        <div className="h-screen w-1/2 absolute top-1 bottom-0 right-10 flex flex-col items-end justify-start gap-y-4">
          {errors.map((error) => (
            <Toast
              message={error?.message}
              className="border-l-8 border-l-red-600 text-gray-800"
              svg={errorSvg}
            />
          ))}
        </div>
      )}
      {success && (
        <div className="h-screen w-1/2 absolute top-1 bottom-0 right-10 flex flex-col items-end justify-start gap-y-4">
          <Toast
            message="if email exists code is sent"
            className="border-l-8 border-l-green-600 text-green-800 font-bold"
            svg={successSvg}
          />
        </div>
      )}

      {loading && (
        <div className="h-screen w-1/2 absolute top-1 bottom-0 right-10 flex flex-col items-end justify-start gap-y-4">
          <Toast
            className="border-l-8 border-l-teal-600 text-teal-800 font-bold"
            body={
              <div className="flex items-center justify-start w-full gap-x-4 text-teal-800">
                <div
                  className="animate-spin border-b-2 border-teal-800  border-l-2 inline-block w-5 h-5 border rounded-full"
                  role="status"
                >
                  <span className="hidden">Loading...</span>
                </div>
                <span>sending reset code</span>
              </div>
            }
          />
        </div>
      )}
      <div className="w-1/2 h-screen hidden md:flex  ">
        <img
          className="w-full h-full  rounded-tr-2xl "
          src="https://images.unsplash.com/photo-1660721858662-9ad9f37447f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        />
      </div>
      <div className=" w-full px-2 md:px-5  lg:w-1/2 h-screen py-28 md:py-28  lg:px-10 flex  flex-col gap-y-4">
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="text-teal-800 text-3xl font-semibold">
            Sorry to hear about this
          </h1>
          <p className="text-gray-700 font-semibold text-sm">
            kindly enter the email you signed up with
          </p>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleResetValidation(values);

              setTimeout(() => {
                setErrors([]);
              }, 3000);

              if (errors.length <= 0) {
                handleSubmit(e);
              }
            }}
            className="flex flex-col gap-y-2 w-full  h-full"
          >
            <div className="flex flex-col gap-y-2 items-center  px-2 md:px-20 justify-center text-gray-700 font-medium ">
              <div className="flex flex-col w-full">
                <label>email</label>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
                />
              </div>
            </div>
            <div className="px-2 md:px-20 py-2">
              {loading ? (
                <button
                  type="button"
                  disabled={true}
                  className="inline-flex items-center justify-center bg-opacity-70 gap-x-2 shadow shadow-teal-500 bg-teal-600 rounded  text-gray-100  focus:shadow-md focus:shadow-teal-400 p-2 w-full "
                >
                  <div
                    className="animate-spin border-b-2   border-l-2 inline-block w-5 h-5 border rounded-full"
                    role="status"
                  >
                    <span className="hidden">Loading...</span>
                  </div>
                  <span>loading...</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex items-center justify-center shadow shadow-teal-500 bg-teal-600 rounded  text-gray-100  focus:shadow-md focus:shadow-teal-400 p-2 w-full "
                >
                  send reset code
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
