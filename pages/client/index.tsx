import axios from "axios";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";

import Job from "../../component/clients/create/get/jobs";
import ClientLayout from "../../component/layouts/client-layout";
import jwt_decode from "jwt-decode";
import SidePanel from "../../component/clients/create/side-panel";

export default function Client({ data }: any) {
  const { jobs, error, token, user } = data;

  const [openCreateJob, setOpenCreateJob] = useState(false);

  const router = useRouter();
  if (error?.message.length > 0) {
    setTimeout(() => {
      router.replace("/auth/login");
    }, 5000);

    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-fit py-10 shadow px-4 border border-gray-200 rounded  flex items-center flex-col gap-y-2">
          <p className="font-bold text-red-500">
            Kindly log in to access resource if problem persists contact admin
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      {jobs?.length <= 0 ? (
        <div className="w-full h-full  flex  items-center justify-center">
          <div className="w-fit py-10 shadow px-4 border border-gray-200 rounded  flex items-center flex-col gap-y-2">
            <p className="font-bold text-teal-900">
              you curently have no jobs start creating
            </p>
            <button
              onClick={() => setOpenCreateJob(true)}
              className="m-auto bg-teal-500 inline-flex items-center justify-center gap-y-2 py-2 px-3.5 rounded text-white font-semibold"
            >
              create job
            </button>
          </div>
          <SidePanel
            open={openCreateJob}
            setOpen={setOpenCreateJob}
            token={token}
            action="create"
          />
        </div>
      ) : (
        <div className="w-full py-2 px-2 flex flex-col gap-y-2">
          <div className="w-full flex items-center justify-end sm:px-2 py-4  ">
            <button
              onClick={() => setOpenCreateJob(true)}
              className=" bg-teal-500 inline-flex items-center justify-center gap-y-2 py-2 px-3.5 rounded text-white font-semibold"
            >
              create job
            </button>
            <SidePanel
              open={openCreateJob}
              setOpen={setOpenCreateJob}
              token={token}
              action="create"
            />
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:px-2 py-4 gap-4 ">
            {jobs?.map((job: any) => (
              <Job
                key={job.id}
                job={job}
                user={user}
                open={openCreateJob}
                setOpen={setOpenCreateJob}
                token={token}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export type DecodedToken = {
  username: string;
  sub: string;
  iat: number;
  exp: number;
};

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

    if (user.user_role !== "client") {
      return {
        redirect: {
          permanent: false,
          destination: "/auth/login",
        },
      };
    }

    const loggedInClientJobs = await axios.get(
      `http://localhost:4000/clients/client-jobs`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${req.cookies.access_token}`,
        },
      }
    );

    console.log(loggedInClientJobs.data);

    return {
      props: {
        data: {
          jobs: loggedInClientJobs.data,
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

Client.getLayout = function getLayout(page: ReactElement) {
  return <ClientLayout>{page}</ClientLayout>;
};
