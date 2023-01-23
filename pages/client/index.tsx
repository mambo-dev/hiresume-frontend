import axios from "axios";
import React, { ReactElement } from "react";
import ClientLayout from "../../component/layouts/client-layout";

export default function Client({ data }: any) {
  const { jobs, error } = data;

  if (error) {
    <div>{error.message}</div>;
  }

  return (
    <div className="w-full h-full">
      {jobs?.length <= 0 ? (
        <div className="w-full h-full  flex  items-center justify-center">
          <div className="w-full px-2 flex items-center flex-col gap-y-2">
            <p className="font-bold text-teal-900">
              you curently have no jobs start creating
            </p>
            <button className="m-auto bg-teal-500 inline-flex items-center justify-center gap-y-2 py-2 px-1 rounded text-white font-semibold">
              create job
            </button>
          </div>
        </div>
      ) : (
        <div>you have some jobs</div>
      )}
    </div>
  );
}

export async function getServerSideProps<GetServerSideProps>(context: any) {
  try {
    const { req } = context;

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
          error: null,
        },
      },
    };
  } catch (error: any) {
    return {
      props: {
        data: {
          jobs: null,
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
