import React, { useEffect, useState } from "react";
import useAxios from "../../../../hooks/axios";
import useForm from "../../../../hooks/form";
import { error } from "../../../../pages/auth/signup";

type ExperienceValue = {
  company: string;
  year_from: string;
  year_to: string;
  position: string;
  tag: string;
};

type ExperienceProps = {
  token: string;
  setOpen: any;
};

export default function AddExperience({ token, setOpen }: ExperienceProps) {
  const [errors, setErrors] = useState<error[]>([]);
  const initialValues = {
    company: "",
    year_from: "",
    year_to: "",
    position: "",
    tag: "remote",
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

  const { handleSubmitResponse, loading, response, success } = useAxios(
    "freelancers/experience",
    setErrors,
    errors,
    "post",
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const { handleChange, handleSubmit, values } = useForm(
    initialValues,
    handleSubmitResponse
  );

  useEffect(() => {
    if (success) {
      setOpen(false);
    }
  }, [success]);

  return (
    <div className="w-full h-full flex flex-col items-center py-3 px-2">
      <div className="w-1/2 magrin-auto text-gray-500 ">
        <p>expand your education history for potential clients</p>
      </div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-2">
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
            type="date"
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
            type="date"
            name="year_to"
            placeholder="to"
            value={values.year_to}
            onChange={handleChange}
            className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
          />
        </div>
        <div className="flex flex-col w-full">
          <label>position</label>
          <input
            type="text"
            name="position"
            value={values.position}
            onChange={handleChange}
            className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
          />
        </div>
        <div className="flex flex-col w-full">
          <label>work</label>
          <select
            id="tag"
            name="tag"
            onChange={handleChange}
            defaultValue="remote"
            value={values.tag}
            autoComplete="tag"
            className=" py-2 px-1 rounded bg-white  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
          >
            <option value="remote"> remote </option>
            <option value="full_time"> full time </option>
            <option value="part_time"> part time </option>
          </select>
        </div>

        <div className="w-full py-4">
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
