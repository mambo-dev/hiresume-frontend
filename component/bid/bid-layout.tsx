import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Contract from "../clients/contract";
import CreateContract from "../clients/create-contract";
import UpdateContract from "../clients/update-contract";
import Modal from "../utils/modal";

export default function BidLayout({ bid }: any) {
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  return (
    <div className="w-fit px-1 h-fit py-2  border border-slate-300 shadow rounded">
      <div className="w-full py-2 px-1 flex items-center justify-between text-slate-800">
        <span className="font-medium  group flex items-center gap-x-2 w-fit">
          <span className="relative w-10 h-10 rounded-full bg-white  border border-slate-300">
            <Image
              src={
                bid.profile.profile_image
                  ? `${bid.profile.profile_image}`
                  : "/images/avatar.png"
              }
              alt="profile image"
              fill
              sizes=""
              className="rounded-full w-10 h-10 "
            />
          </span>
          <Link href={`/explore/profile/${bid.freelancer.id}`} passHref>
            <p className="group-hover:underline text-blue-500">
              {" "}
              {bid?.profile.profile_firstname}
            </p>{" "}
          </Link>
          <Link href={`/explore/profile/${bid.freelancer.id}`} passHref>
            <p className="group-hover:underline text-blue-500">
              {" "}
              {bid?.profile.profile_secondname}
            </p>
          </Link>
        </span>

        <span className="rounded border border-slate-300 p-1">
          {bid.bid.bid_rate}$
        </span>
      </div>
      <div className="w-full py-1 px-1 flex items-center justify-between text-slate-800">
        <span className="font-medium">{bid?.user.user_email}</span>
        <span
          className={`ml-14 flex items-end justify-end font-medium  rounded ${
            bid.freelancer.freelancer_availablity
              ? "text-green-500"
              : "text-red-500"
          } `}
        >
          {bid.freelancer.freelancer_availablity ? "available " : " busy "}
        </span>
      </div>
      <div className="w-full py-1 px-1 flex items-center justify-between text-slate-800">
        <button
          onClick={() => setViewOpen(true)}
          className=" bg-blue-100 focus:ring-2 focus:ring-offset-1 focus:ring-blue-200 focus:bg-blue-300 inline-flex items-center justify-center gap-x-2 py-2 px-3.5 rounded text-blue-900 font-semibold hover:bg-opacity-50 "
        >
          view
        </button>
        <Modal isOpen={viewOpen} setIsOpen={setViewOpen}>
          <Contract contract={bid.contract} job={bid.job} bid={bid} />
        </Modal>
        <button
          onClick={() => setOpen(true)}
          className=" bg-teal-100 focus:ring-2 focus:ring-offset-1 focus:ring-teal-200 focus:bg-teal-300 inline-flex items-center justify-center gap-x-2 py-2 px-3.5 rounded text-teal-900 font-semibold hover:bg-opacity-50 "
        >
          {bid.contract ? "update contract" : "create contract"}
        </button>
        <Modal isOpen={open} setIsOpen={setOpen}>
          {bid.contract ? (
            <UpdateContract contract={bid.contract} />
          ) : (
            <CreateContract bid_id={bid.bid.id} job_id={bid?.bid.job_id} />
          )}
        </Modal>
      </div>
    </div>
  );
}
