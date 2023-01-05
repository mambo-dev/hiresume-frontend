import React, { ReactElement, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import FreelancerLayout from "../../component/layouts/freelancer-layout";

export default function Profile<NextPageWithLayout>() {
  return (
    <div className="flex flex-col md:flex-row ">
      <div className="h-screen w-full flex flex-col py-8 gap-y-4 items-center bg-gradient-to-r from-slate-200 via-slate-50 md:w-2/5 ">
        <img
          className="w-40 h-40 rounded-full border"
          src="https://images.unsplash.com/photo-1672888560227-aaf9b90d480a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
        />
        <div className="flex flex-col gap-y-4 items-start text-gray-700 font-medium">
          <div className="flex items-center justify-center gap-x-2 py-3 px-1 ">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </span>{" "}
            <p>mambo.michael.22@gmail.com</p>
          </div>
          <div className="flex items-center justify-center gap-x-2 py-3 px-1 ">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
            </span>{" "}
            <p>Kenya</p>
          </div>
          <div className="flex items-center justify-center gap-x-2  py-3 px-1 ">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                />
              </svg>
            </span>{" "}
            <p>Full time</p>
          </div>
          <div className="flex items-center justify-center w-full  py-4  ">
            <button className="inline-flex items-center justify-center shadow shadow-teal-500 bg-teal-600 rounded  text-gray-100  focus:shadow-md focus:shadow-teal-400 p-2 w-full ">
              update availability
            </button>
          </div>
        </div>
      </div>
      <div className="h-screen py-8 bg-transparent w-full flex flex-col gap-y-4 items-start  md:w-3/5 ">
        something different
      </div>
    </div>
  );
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return <FreelancerLayout>{page}</FreelancerLayout>;
};
