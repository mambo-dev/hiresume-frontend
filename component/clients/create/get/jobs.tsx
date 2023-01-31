import React from "react";

export default function Job({ job, user }: any) {
  return (
    <div className="w-full bg-white shadow-md rounded border py-2 px-2 flex flex-col gap-y-4 border border-slate-200">
      <div className="w-full h-1/4 flex items-center justify-between">
        <h1 className=" font-semibold text-slate-800"> {job.job_title} </h1>
        <span
          className={`p-1 px-2 rounded-full text-sm font-semibold  ${
            job.job_completion_status
              ? "bg-green-200 text-green-800"
              : "bg-red-300 text-red-900 "
          } `}
        >
          {job.job_completion_status ? "complete" : "incomplete"}
        </span>
      </div>
      <div className="flex h-1/4 justify-between items-center xs:flex-wrap sm:flex-nowrap">
        <p className="text-slate-800 font-medium">
          {" "}
          <strong className="font-bold text-slate-800">job length:</strong>{" "}
          {job.job_length}
        </p>
        <p className="text-slate-800 font-medium">
          {" "}
          <strong className="font-bold text-slate-800">job level:</strong>{" "}
          {job.job_level}
        </p>
      </div>
      <div className="font-bold h-1/4 text-slate-900">
        {job.job_hourly_to === 0 ? (
          <p>
            {" "}
            <strong className="font-bold text-slate-700">fixed price: </strong>$
            {job.job_fixed_price}
          </p>
        ) : (
          <span>
            <strong className="font-bold text-slate-700">from: </strong> $
            {job.job_hourly_from} -{" "}
            <strong className="font-bold text-slate-700"> to: </strong>$
            {job.job_hourly_to} {}
            per hour
          </span>
        )}
      </div>

      <div className="w-full h-1/4 flex items-center flex-wrap gap-y-2 justify-between">
        <button className=" bg-blue-200 focus:bg-blue-300 inline-flex items-center justify-center gap-x-2 py-2 px-3.5 rounded text-blue-700 font-semibold hover:bg-opacity-50 ">
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
        <button className=" bg-red-200 focus:bg-red-300  inline-flex items-center justify-center gap-x-2 py-2 px-3.5 rounded text-red-700  font-semibold hover:bg-opacity-80 ">
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
          delete
        </button>
      </div>
    </div>
  );
}
