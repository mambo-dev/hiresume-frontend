import { useRouter } from "next/router";
import { DecodedToken } from "../client";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useState } from "react";
import Modal from "../../component/utils/modal";
import Bid from "../../component/bid/bid";
import ApproveBid from "../../component/bid/approve-bid";
import Link from "next/link";

export default function Job({ data }: any) {
  const { user, job, error, token } = data;

  const [open, setOpen] = useState(false);
  const [openBid, setOpenBid] = useState(false);
  const router = useRouter();
  const submitAxios = async () => {
    try {
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
        router.replace("/client");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  if (error?.message.length > 0) {
    setTimeout(() => {
      router.replace("/auth/login");
    }, 3000);

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
    <div className="w-full min-h-screen py-5 px-2 ">
      <div className="w-full md:px-1 px-2 md:w-3/4 lg:w-1/2 m-auto flex flex-col gap-y-2 ">
        <div className="flex pr-2 items-center w-full justify-between">
          <h1 className="text-xl font-bold text-slate-800 first-letter:uppercase">
            {job.job_title}
          </h1>
          {user.user_role === "client" && (
            <button
              onClick={submitAxios}
              className="outline-none flex items-center justify-center "
            >
              {DeleteIcon}
            </button>
          )}
        </div>
        <p className=" font-medium text-slate-800 first-letter:text-2xl">
          {job.job_description}
        </p>
        <div className="flex h-1/4 justify-between items-center xs:flex-wrap sm:flex-nowrap">
          <p className="text-slate-800 font-medium">
            {" "}
            <strong className="font-bold text-slate-800">
              job length:
            </strong>{" "}
            {job?.job_length}
          </p>
          <p className="text-slate-800 font-medium">
            {" "}
            <strong className="font-bold text-slate-800">
              job level:
            </strong>{" "}
            {job?.job_level}
          </p>
        </div>
        <div className="font-bold h-1/4 text-slate-900">
          {job?.job_hourly_to === 0 ? (
            <div className="flex items-center justify-between gap-x-4">
              <p>
                {" "}
                <strong className="font-bold text-slate-700">
                  fixed price:{" "}
                </strong>
                ${job?.job_fixed_price}
              </p>
              <span className="flex ">
                <span className="flex items-center justify-center">
                  {MultipleIcon}
                </span>
                <strong className="font-bold text-slate-700">
                  total bids:{" "}
                </strong>
                <span className="flex">{job?.total_bids}</span>
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-x-4">
              <span>
                <strong className="font-bold text-slate-700">from: </strong> $
                {job?.job_hourly_from} -{" "}
                <strong className="font-bold text-slate-700"> to: </strong>$
                {job?.job_hourly_to} {}
                per hour
              </span>
              <span className="flex ">
                <span className="flex items-center justify-center">
                  {MultipleIcon}
                </span>
                <strong className="font-bold text-slate-700">
                  total bids:{" "}
                </strong>
                <span className="flex">{job?.total_bids}</span>
              </span>
            </div>
          )}
        </div>
        <div>
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
              <Modal isOpen={open} setIsOpen={setOpen}>
                <Bid job_id={job.id} token={token} />
              </Modal>
            </div>
          )}
        </div>
        {user.user_role === "client" && (
          <div className="ml-auto">
            <Link href={`/client/bids/accepted-bids/${job.id}`}>
              <span className="text-blue-500 font-semibold text-sm hover:underline">
                view accepted bids
              </span>
            </Link>
          </div>
        )}
        {user.user_role === "client" && job.job_bid.length > 0 && (
          <ul className="py-2 border border-slate-300 rounded shadow">
            {job.job_bid.map((bid: any) => {
              return (
                <>
                  <li key={bid.id} className="flex flex-col  py-2 px-1 gap-y-2">
                    {truncate(bid.bid_coverletter, 100)}
                    <button
                      onClick={() => setOpenBid(true)}
                      className="bg-white border border-slate-300 shadow rounded m-auto py-2 px-10  "
                    >
                      open bid
                    </button>
                    <Modal isOpen={openBid} setIsOpen={setOpenBid}>
                      <ApproveBid bid={bid} token={token} />
                    </Modal>
                  </li>
                  {job.job_bid.length > 1 && <hr className="text-gray-800" />}
                </>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
function truncate(str: string, maxLength: number) {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - 3) + "...";
}

export async function getServerSideProps<GetServerSideProps>(context: any) {
  try {
    const { req } = context;
    const { id } = context.query;

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

    const getJob = await axios.get(
      `http://localhost:4000/explores/get-job/${id}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${req.cookies.access_token}`,
        },
      }
    );

    return {
      props: {
        data: {
          job: getJob.data,
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
          job: null,
          token: null,
          error: {
            message: error.message,
          },
        },
      },
    };
  }
}

const MultipleIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
    />
  </svg>
);

const DeleteIcon = (
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
  </svg>
);
