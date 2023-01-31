import axios from "axios";
import { useState } from "react";
import useForm from "../../../hooks/form";
import { error } from "../../../pages/auth/signup";
import { job } from "./create-form";

export default function UpdateForm({ token, job }: any) {
  const [hourly, setHourly] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<error[]>([]);

  const submitAxios = async () => {
    try {
      setLoading(true);
      const update = await axios.put(
        `http://localhost:4000/clients/update-job/${job.id}`,
        {
          ...values,
          job_hourly_from: Number(values.job_hourly_from),
          job_hourly_to: Number(values.job_hourly_to),
          job_fixed_price: Number(values.job_fixed_price),
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (update) {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    } catch (error: any) {
      setLoading(false);
      setErrors([
        {
          message: error.message,
        },
      ]);
      setTimeout(() => {
        setErrors([]);
      }, 3000);
    }
  };

  const initialValues: job = {
    job_title: job.job_title,
    job_description: job.job_description,
    job_length: job.job_length,
    job_hourly_from: job.job_hourly_from,
    job_hourly_to: job.job_hourly_to,
    job_fixed_price: job.job_fixed_price,
    job_level: job.job_level,
  };

  const { values, handleChange, handleSubmit } = useForm(
    initialValues,
    submitAxios
  );

  return (
    //@ts-ignore
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
        <label className="font-semibold text-sm text-teal-700">length</label>
        <input
          type="text"
          name="job_length"
          onChange={handleChange}
          value={values.job_length}
          placeholder="one month, two months..."
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
              name="job_hourly_from"
              onChange={handleChange}
              value={values.job_hourly_from}
              disabled={job.job_fixed_price > 0}
              className="py-2 px-1 rounded disabled:bg-opacity-50  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
            />
          </div>
          <div className="flex flex-col w-full gap-y-2">
            <label className="font-semibold text-sm text-teal-700">
              paid hourly to
            </label>
            <input
              type="number"
              name="job_hourly_to"
              onChange={handleChange}
              value={values.job_hourly_to}
              disabled={job.job_fixed_price > 0}
              className="py-2 px-1 rounded disabled:bg-opacity-50  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
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
            disabled={job.job_hourly_from > 0}
            className="py-2 px-1 rounded  disabled:bg-opacity-50 border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
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
      {loading ? (
        <button
          type="button"
          disabled={true}
          className="mt-2 inline-flex items-center justify-center bg-opacity-70 gap-x-2 shadow shadow-teal-500 bg-teal-600 rounded  text-gray-100  focus:shadow-md focus:shadow-teal-400 p-2 w-full "
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
          className="mt-2 inline-flex items-center justify-center shadow shadow-teal-500 bg-teal-600 rounded  text-gray-100  focus:shadow-md focus:shadow-teal-400 p-2 w-full "
        >
          update job
        </button>
      )}
      {errors.length > 0 &&
        errors.map((error: error) => {
          <p className="font-bold text-sm text-red-500 m-auto mt-2">
            {error.message}
          </p>;
        })}
      {success && (
        <p className="font-bold text-sm text-green-500 m-auto mt-2">
          succesfully updated job
        </p>
      )}
    </form>
  );
}
