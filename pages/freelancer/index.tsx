import axios from "axios";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import FreelancerLayout from "../../component/layouts/freelancer-layout";
import RequireAuth from "../../component/utils/require-auth";
import jwt_decode from "jwt-decode";

import { useAuth } from "../../hooks/auth";
import { DecodedToken } from "../client";
import Job from "../../component/clients/create/get/jobs";
import Tabs from "../../component/utils/tab";
import RecommendJob from "../../component/freelancer/projects/recommend-job";
import SampleJobs from "../../component/freelancer/projects/sample-jobs";
import SearchJobs from "../../component/freelancer/projects/search-job";

export default function Freelancer<NextPageWithLayout>({ data }: any) {
  let { authenticated, reroute, loading, token } = useAuth();

  const router = useRouter();

  if (!authenticated) {
    setTimeout(() => {
      if (!loading) {
        router.replace("/auth/login");
      }
    }, 3000);

    return <RequireAuth reroute={reroute} loading={loading} />;
  }

  const { jobs, user } = data;

  const tabs = {
    recommended: {
      component: <RecommendJob user={user} token={token} />,
    },
    all: {
      component: <SampleJobs sampleJobs={jobs} user={user} />,
    },
    search: {
      component: <SearchJobs user={user} token={token} />,
    },
  };
  return (
    <div className="w-full flex items-center justify-center py-4">
      <div className="w-full md:w-[70%] mr-auto px-10 ">
        <Tabs tabs={tabs} />
      </div>
      <div className="hidden md:flex h-full w-[30%] ">
        <div className="flex flex-col gap-y-2 fixed rounded px-3 items-start text-gray-700 font-medium bg-white border border-slate-300 shadow h-fit">
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
                  d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                />
              </svg>
            </span>{" "}
            <p>{user?.profile.profile_firstname}</p>{" "}
            <p>{user?.profile.profile_secondname}</p>
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
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </span>{" "}
            <p>{user.user_email}</p>
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
            <p>{user?.user_country}</p>
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
            <p>
              {user?.Freelancer.freelancer_availability
                ? "available for work "
                : "busy at the moment"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps<GetServerSideProps>(context: any) {
  try {
    const { req } = context;

    const user = JSON.parse(req.cookies.user);
    if (!req.cookies.access_token) {
      return {
        redirect: {
          permanent: false,
          destination: "/auth/login",
        },
      };
    }

    const decodedToken: DecodedToken = jwt_decode(req.cookies.access_token);

    if (decodedToken.exp < Date.now() / 1000) {
      return {
        redirect: {
          permanent: false,
          destination: "/auth/login",
        },
      };
    }

    if (user.user_role !== "freelancer") {
      return {
        redirect: {
          permanent: false,
          destination: "/auth/login",
        },
      };
    }

    const getJobs = await axios.get(
      `http://localhost:4000/explores/job-samples`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${req.cookies.access_token}`,
        },
      }
    );

    console.log(getJobs.data);

    return {
      props: {
        data: {
          jobs: getJobs.data,
          token: req.cookies.access_token,
          error: null,
          user: user,
        },
      },
    };
  } catch (error: any) {
    return {
      props: {
        data: {
          user: null,
          jobs: null,
          token: null,
          error: {
            message: error.message,
          },
        },
      },
    };
  }
}

Freelancer.getLayout = function getLayout(page: ReactElement) {
  return <FreelancerLayout>{page}</FreelancerLayout>;
};
