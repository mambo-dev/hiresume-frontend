import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { error } from "../../../../pages/auth/signup";
import SidePanel from "../side-panel";

function truncate(str: string, maxLength: number) {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - 3) + "...";
}

export default function Job({ job, user, token }: any) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<error[]>([]);
  const submitAxios = async () => {
    try {
      setLoading(true);
      const deleteJob = await axios.delete(
        `http://localhost:4000/clients/delete-job/${job?.id}`,

        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (deleteJob) {
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
  return (
    <div className="w-full bg-white  rounded border py-2 px-2 flex flex-col gap-y-4 shadow border border-slate-300">
      <div className="w-full h-1/4 flex items-center justify-between">
        <h1 className=" font-semibold text-slate-800 first-letter:uppercase">
          {" "}
          {job?.job_title}{" "}
        </h1>
        {user.user_role === "client" ? (
          <span
            className={`p-1 px-2 rounded-full text-sm font-semibold  ${
              job?.job_completion_status
                ? "bg-green-200 text-green-800"
                : "bg-red-300 text-red-900 "
            } `}
          >
            {job?.job_completion_status ? "complete" : "incomplete"}
          </span>
        ) : (
          <span className="p-1 px-4 rounded-full text-sm font-semibold  bg-teal-300 text-white font-semibold first-letter:uppercase">
            full time
          </span>
        )}
      </div>
      <div className="flex h-1/4 justify-between items-center xs:flex-wrap sm:flex-nowrap">
        <p className="text-slate-800 font-medium">
          {" "}
          <strong className="font-bold text-slate-800">job length:</strong>{" "}
          {job?.job_length}
        </p>
        <p className="text-slate-800 font-medium">
          {" "}
          <strong className="font-bold text-slate-800">job level:</strong>{" "}
          {job?.job_level}
        </p>
      </div>
      {user.user_role === "freelancer" && (
        <div className="flex h-1/4 justify-between items-center xs:flex-wrap sm:flex-nowrap">
          <p className="font-medium text-slate-800 first-letter:uppercase truncate">
            {job.job_description}
            <Link href={`/job/${job.id}`}>
              <p className="text-blue-500 font-bold text-sm hover:underline">
                more
              </p>
            </Link>
          </p>
        </div>
      )}
      <div className="font-bold h-1/4 text-slate-900">
        {job?.job_hourly_to === 0 ? (
          <p>
            {" "}
            <strong className="font-bold text-slate-700">fixed price: </strong>$
            {job?.job_fixed_price}
          </p>
        ) : (
          <span>
            <strong className="font-bold text-slate-700">from: </strong> $
            {job?.job_hourly_from} -{" "}
            <strong className="font-bold text-slate-700"> to: </strong>$
            {job?.job_hourly_to} {}
            per hour
          </span>
        )}
      </div>
      {user.user_role === "client" && (
        <div className="w-full h-1/4 flex items-center flex-wrap gap-y-2 justify-between">
          <button
            onClick={() => setOpen(true)}
            className=" bg-blue-200 focus:bg-blue-300 inline-flex items-center justify-center gap-x-2 py-2 px-3.5 rounded text-blue-700 font-semibold hover:bg-opacity-50 "
          >
            <SidePanel
              open={open}
              setOpen={setOpen}
              token={token}
              action="update"
              data={job}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-blue-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            edit
          </button>
          <button
            onClick={submitAxios}
            className=" bg-red-200 focus:bg-red-300  inline-flex items-center justify-center gap-x-2 py-2 px-3.5 rounded text-red-700  font-semibold hover:bg-opacity-80 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-red-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>{" "}
            {loading ? "deleting..." : success ? "deleted" : "delete"}
          </button>
        </div>
      )}

      {user.user_role === "freelancer" && (
        <div className="w-full h-1/4 flex items-center flex-wrap gap-y-2 justify-end">
          <button
            onClick={() => setOpen(true)}
            className=" bg-teal-100 focus:ring-2 focus:ring-offset-1 focus:ring-teal-200 focus:bg-teal-300 inline-flex items-center justify-center gap-x-2 py-2 px-3.5 rounded text-teal-900 font-semibold hover:bg-opacity-50 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-teal-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            apply
          </button>
        </div>
      )}
    </div>
  );
}
