import React, { ReactElement, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import FreelancerLayout from "../../component/layouts/freelancer-layout";
import { useAuth } from "../../hooks/auth";
import { useRouter } from "next/router";
import Toast from "../../component/utils/toast";
import Image from "next/image";
import RequireAuth from "../../component/utils/require-auth";

export default function Profile<NextPageWithLayout>() {
  const { authenticated, reroute, loading } = useAuth();

  const router = useRouter();
  if (!authenticated) {
    setTimeout(() => {
      if (!loading) {
        router.replace("/auth/login");
      }
    }, 3000);

    return <RequireAuth reroute={reroute} loading={loading} />;
  }
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
      <div className="h-screen px-4 md:pr-32  py-8 bg-transparent w-full flex flex-col gap-y-4 items-start  md:w-3/5 ">
        <div className="flex flex-col gap-y-4 items-start justify-start ">
          <span className="text-2xl text-teal-900 font-bold">
            Professional Summary
          </span>
          <h1 className="text-xl text-teal-800 font-bold">
            Full Stack React developer
          </h1>
          <p className="text-gray-800 font-medium ">
            I am a highly motivated and experienced developer with a passion for
            building and maintaining high-quality software applications.
            Throughout my career, I have gained a strong understanding of
            various technologies, including programming languages such as Java
            and Python, as well as databases and frameworks like MySQL and
            React.
          </p>
        </div>
        <div className="flex flex-col gap-y-2 items-start justify-start w-full">
          <span className="text-2xl text-teal-900 font-bold">
            Work Experience
          </span>
          {[1].map((number) => (
            <>
              <div className="h-28  w-full border-b border-gray-200 flex items-center justify-between ">
                <div className="w-3/4 flex flex-col items-start justify-start  ">
                  <p className="text-teal-700 text-lg">Senior engineer React</p>
                  <p className="text-gray-700">2015 - 2022</p>
                  <p className="text-gray-500">Kenya</p>
                </div>
                <div className="w-1/4 flex items-center justify-end">
                  <span className="p-1 rounded-2xl px-2 bg-teal-100 text-teal-700 font-bold">
                    remote
                  </span>
                </div>
              </div>
            </>
          ))}
        </div>
        <div className="flex flex-col gap-y-2 items-start justify-start w-full">
          <span className="text-2xl text-teal-900 font-bold">Education</span>
          {[1].map((number) => (
            <div className="h-24  w-full border-b border-gray-200 flex items-center justify-between ">
              <div className="w-3/4 flex flex-col items-start justify-start  ">
                <p className="text-teal-700 text-lg">St Pauls University</p>

                <p className="text-gray-500">Kenya</p>
              </div>
              <div className="w-1/4 flex flex-col items-start justify-start ">
                <span className="invisible ">holder</span>
                <span className="w-full text-gray-700 text-sm ">
                  2015 - 2022
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-y-2 items-start justify-start w-full">
          <span className="text-2xl text-teal-900 font-bold">Files</span>
          {[1].map((number) => (
            <div className="h-24  text-blue-800 hover:underline w-full border-b border-gray-200">
              <Link href="https://hiresumefiles.s3.ap-northeast-1.amazonaws.com/7b3b5d60-ccb6-47f5-9be7-bb2b35722682-design-3.png?AWSAccessKeyId=AKIAUZRZESOPSM4RES74&Expires=1673004502&Signature=609w038WMnMAgICYUwKeYOMROGk%3D">
                <div className="flex items-center  gap-x-2">
                  <img src="/images/icons8-png-24.png" alt="file-icon" />
                  <p>design-3.png</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return <FreelancerLayout>{page}</FreelancerLayout>;
};
