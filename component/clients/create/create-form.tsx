import React, { useState } from "react";
import useForm from "../../../hooks/form";

type job = {
  job_title: string;
  job_description: string;
  job_length: string;
  job_hourly_from: number;
  job_hourly_to: number;
  job_fixed_price?: number;
  job_level: string;
  skills_required: Skills[];
};

type Skills = {
  skill_id: number;
};

export default function CreateForm() {
  const [hourly, setHourly] = useState(false);
  const [fixed, setFixed] = useState(false);
  const submitAxios = () => {};
  const initialValues: job = {
    job_title: "",
    job_description: "",
    job_length: "",
    job_hourly_from: 0,
    job_hourly_to: 0,
    job_fixed_price: 0,
    job_level: "",
    skills_required: [],
  };

  const { values, handleChange, handleSubmit } = useForm(
    initialValues,
    submitAxios
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
      <div className="flex flex-col w-full gap-y-2">
        <label className="font-semibold text-sm text-teal-700">Title</label>
        <input
          type="text"
          name="job_title"
          onChange={handleChange}
          value={values.job_title}
          placeholder="React Node Js developer needed"
          className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
        />
      </div>
      <div className="flex flex-col w-full gap-y-2">
        <label className="font-semibold text-sm text-teal-700">
          Description
        </label>
        <textarea
          name="job_description"
          onChange={handleChange}
          value={values.job_description}
          placeholder="enter description of your job"
          className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
        />
      </div>
      <div className="flex flex-col w-full gap-y-2">
        <p className="font-semibold text-sm text-teal-700">paying rate as</p>
        <div className="flex gap-x-2 ">
          <div className="flex items-center justify-between gap-x-2">
            <input
              value="hourly"
              onChange={() => {
                setHourly(true);
                setFixed(false);
              }}
              name="role"
              type="radio"
              className="h-4 w-4 border-gray-300 text-teal-600 focus:ring-teal-200 "
            />
            <label
              htmlFor="push-everything"
              className=" text-sm font-bold  text-teal-700"
            >
              hourly
            </label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              onChange={() => {
                setHourly(false);
                setFixed(true);
              }}
              value="fixed"
              name="role"
              type="radio"
              className="h-4 w-4 border-gray-300 text-teal-600 focus:ring-teal-200"
            />
            <label
              htmlFor="push-everything"
              className=" text-sm font-bold  text-teal-700"
            >
              fixed
            </label>
          </div>
        </div>
      </div>
      {hourly && (
        <div className="flex flex-col w-full gap-y-2">
          <div className="flex flex-col w-full gap-y-2">
            <label className="font-semibold text-sm text-teal-700">
              paid hourly from
            </label>
            <input
              type="number"
              name="job_length"
              onChange={handleChange}
              value={values.job_hourly_from}
              placeholder="one month, two months"
              className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
            />
          </div>
          <div className="flex flex-col w-full gap-y-2">
            <label className="font-semibold text-sm text-teal-700">
              paid hourly to
            </label>
            <input
              type="number"
              name="job_length"
              onChange={handleChange}
              value={values.job_hourly_to}
              placeholder="one month, two months"
              className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
            />
          </div>
        </div>
      )}{" "}
      {fixed && (
        <div className="flex flex-col w-full gap-y-2">
          <label className="font-semibold text-sm text-teal-700">
            fixed price
          </label>
          <input
            type="number"
            name="job_fixed_price"
            onChange={handleChange}
            value={values.job_fixed_price}
            placeholder="one month, two months"
            className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
          />
        </div>
      )}
      <div className="flex flex-col w-full gap-y-2">
        <label className="font-semibold text-sm text-teal-700">job level</label>
        <select
          id="job_level"
          name="job_level"
          onChange={handleChange}
          value={values.job_level}
          autoComplete="level"
          defaultValue="entry"
          className=" py-2 px-1 rounded bg-white  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
        >
          {["entry", "intermerdiate", "experienced"].map(
            (level: string, index: number) => (
              <option key={index}> {level} </option>
            )
          )}
        </select>
      </div>
    </form>
  );
}
