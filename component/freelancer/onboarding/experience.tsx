import axios from "axios";
import React, { useState } from "react";
import useForm from "../../../hooks/form";
import { error, errorSvg, successSvg } from "../../../pages/auth/signup";
import Toast from "../../utils/toast";

type ExperienceValues = {
  company: string;
  year_From: string;
  year_to: string;
};
export default function Experience() {
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState(false);
  const [errors, setErrors] = useState<error[]>([]);
  const initialValues = {
    company: "",
    year_from: "",
    year_to: "",
  };

  const handleEducationValidation = (values: any) => {
    Object.keys(values).map((value) => {
      if (values[value].trim() === "") {
        setErrors((prevErrors) => [
          ...prevErrors,
          {
            message: `please enter ${value} `,
          },
        ]);
      }
    });
  };

  const handleEducationAxios = async (values: ExperienceValues) => {
    try {
      setLoading(true);
      const submitEducation = await axios.post(
        `http://localhost:4000/freelancers/experience`,
        {
          ...values,
        },
        {
          withCredentials: true,
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvcGl4ODE4NjFAY2hubG9nLmNvbSIsInN1YiI6IjU1ODljNGRiLTY3NGQtNDUyNS05OTc4LWNhYjFmNTgzMTNmZiIsImlhdCI6MTY3MjkwMjk4MCwiZXhwIjoxNjcyOTA2NTgwfQ.L4zAjwzQ5xb8E9gtIuKy67a-L-xKochFz93CS-RpXoo",
          },
        }
      );

      if (submitEducation) {
        setTimeout(() => {
          setLoading(false);
        }, 2000);

        setTimeout(() => {
          setSuccess(true);
        }, 4000);

        setTimeout(() => {
          setSuccess(false);
        }, 6000);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErrors((prevErrors) => [
        ...prevErrors,
        {
          message: "could not create education ",
        },
      ]);
    }
  };

  const { values, handleChange, handleSubmit } = useForm(
    initialValues,
    handleEducationAxios
  );
  return (
    <div className="w-full  h-full flex flex-col items-center gap-y-4 justify-center py-16 px-2 bg-inherit">
      {errors.length > 0 && toast && (
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
            message="successfully created education"
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
                <span>creating your education</span>
              </div>
            }
          />
        </div>
      )}
      <div className="font-medium text-teal-800">
        <p>
          brief overview of your past experience ps you can create{" "}
          <strong>multiple</strong> values after submitting
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEducationValidation(values);
          setToast(true);
          setTimeout(() => {
            setToast(false);
            setErrors([]);
          }, 3000);

          if (errors.length <= 0) {
            handleSubmit(e);
          }
        }}
        className="h-full w-full flex flex-col gap-y-4 sm:w-4/5 md:w-3/4 lg:w-1/2 "
      >
        <div className="flex flex-col w-full">
          <label>company</label>
          <input
            type="text"
            name="company"
            value={values.company}
            onChange={handleChange}
            className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
          />
        </div>
        <div className="flex flex-col w-full">
          <label>year started</label>
          <input
            type="text"
            name="year_from"
            value={values.year_from}
            placeholder="from"
            onChange={handleChange}
            className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
          />
        </div>
        <div className="flex flex-col w-full">
          <label>year ended</label>
          <input
            type="text"
            name="year_to"
            placeholder="to"
            value={values.year_to}
            onChange={handleChange}
            className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
          />
        </div>

        <div className=" w-full">
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
              create experience
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
