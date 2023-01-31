import axios from "axios";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import FreelancerLayout from "../../component/layouts/freelancer-layout";
import RequireAuth from "../../component/utils/require-auth";
import jwt_decode from "jwt-decode";

import { useAuth } from "../../hooks/auth";
import { DecodedToken } from "../client";
import Job from "../../component/clients/create/get/jobs";

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
  console.log(jobs);
  return (
    <div>
      <div></div>
      <div className=" w-full px-1 sm:px-2 md:w-1/2 m-auto grid grid-cols-1 gap-3 py-2">
        {jobs.map((job: any) => (
          <Job job={job} user={user} />
        ))}
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
