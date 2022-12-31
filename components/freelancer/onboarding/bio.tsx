import React, { useState } from "react";

export default function Bio() {
  const bios = [1];
  const [loading, setLoading] = useState();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-10 px-2 bg-inherit">
      <div className="font-medium text-teal-800">
        <p>Describe who you are and what you do and can do for a client </p>
      </div>
      <form className="h-full w-full flex flex-col gap-y-4 sm:w-4/5 md:w-3/4 lg:w-1/2 ">
        <div className="flex flex-col w-full">
          <label>title</label>
          <input
            type="text"
            name="title"
            placeholder="React MongoDb Developer"
            className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
          />
        </div>
        <div className="flex flex-col w-full">
          <label>description</label>
          <textarea
            name="description"
            className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
          />
        </div>
        <div className="flex flex-col w-full">
          <label>hourly rate </label>
          <input
            type="number"
            name="hourly_rate"
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
              create account
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

{
  /* <button className="inline-flex items-center justify-center border-4  border-dashed rounded border-gray-200 py-2 px-2 w-48 h-48">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 text-gray-300 font-bold"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button> */
}
