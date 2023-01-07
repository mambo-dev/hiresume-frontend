import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";

import Toast from "../../component/utils/toast";
import { Context } from "../../context/context";
import useForm from "../../hooks/form";
import { login } from "../../state-mgt/auth.actions";
import { error, errorSvg, successSvg } from "./signup";

export default function LogIn() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<error[]>([]);
  const [success, setSuccess] = useState(false);
  const { dispatch } = useContext(Context);

  const router = useRouter();
  const intialValues = {
    username: "",
    password: "",
  };

  const handleLoginAxios = async (values: any) => {
    try {
      setLoading(true);
      const loginResponse = await axios.post(
        `http://localhost:4000/auth/login`,
        {
          username: values.username,
          password: values.password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch({
        type: "LOGGED_IN_USER",
        payload: loginResponse.data,
      });

      if (loginResponse) {
        setTimeout(() => {
          setLoading(false);
          setSuccess(true);
        }, 3000);
      }

      if (loginResponse && loginResponse.data.user_role === "freelancer") {
        setTimeout(() => {
          router.push("/freelancer");
          setSuccess(false);
        }, 5000);
      } else if (loginResponse && loginResponse.data.user_role === "client") {
        setTimeout(() => {
          router.push("/client");
          setSuccess(false);
        }, 5000);
      } else {
        setTimeout(() => {
          router.push("/admin");
          setSuccess(false);
        }, 5000);
      }
    } catch (error) {
      console.log(error);
      setErrors((prevErrors) => [
        ...prevErrors,
        {
          message: "could not login into your account",
        },
      ]);
    }
  };

  const handleLoginValidation = (values: any) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    Object.keys(values).map((value) => {
      if (values[value].trim() === "") {
        setErrors((prevErrors) => [
          ...prevErrors,
          {
            message: `please enter your ${value} `,
          },
        ]);
      } else if (values[value] === "email" && !regex.test(values[value])) {
        setErrors((prevErrors) => [
          ...prevErrors,
          {
            message: "please enter a valid email",
          },
        ]);
      }
    });
  };
  const { values, handleChange, handleSubmit } = useForm(
    intialValues,
    handleLoginAxios
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
            message="succesfully logged in"
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
                <span>loggin in</span>
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
      <div className=" w-full px-2 md:px-5  lg:w-1/2 h-screen py-28 md:py-28  lg:px-10 flex  flex-col gap-y-2">
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="text-teal-800 text-3xl font-semibold">Welcome back</h1>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLoginValidation(values);

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
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
                />
              </div>
              <div className="flex flex-col w-full">
                <label>password</label>
                <input
                  type="password"
                  name="password"
                  value={values.password}
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
                  log in
                </button>
              )}
            </div>
            <div className="px-2 md:px-20 py-2 flex flex-col items-center justify-start text-blue-600">
              <div className="w-full flex items-center justify-start">
                <Link href="/auth/signup">
                  <p className="hover:underline-offset-1 hover:underline">
                    dont have an account? create one
                  </p>
                </Link>
              </div>

              <div className="w-full px-2 flex items-center justify-end">
                <Link href="/auth/forgot-password">
                  <p className="hover:underline">forgot password?</p>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
