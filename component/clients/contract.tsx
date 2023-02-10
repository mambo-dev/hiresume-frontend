import React from "react";
import { format } from "date-fns";

type Contract = {
  contract: any;
  job: any;
  bid: any;
};

export default function Contract({ contract, job, bid }: Contract) {
  return (
    <div className="w-full  bg-white max-h-fit h-[500px] ">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Contract Information
        </h3>
      </div>
      <div className="border-t border-gray-200 h-fit">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              client signed on
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {format(
                new Date(contract?.contract_date_signed),
                "eee cc LLL yyy"
              )}
            </dd>
          </div>

          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">contract for</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {job.job_title}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              freelancer signed on
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {contract.contract_freelancer_signed ? (
                format(
                  new Date(contract?.contract_freelancer_signed),
                  "eee cc LLL yyy"
                )
              ) : (
                <p className="text-red-500 font-medium text-sm">not signed</p>
              )}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              freelancer email address
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {bid.user.user_email}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">bid rate</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {bid.bid.bid_rate}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              contract start - contract end
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {format(new Date(contract?.contract_start), "cc LLL yyy")} to {""}
              {format(new Date(contract?.contract_end), "cc LLL yyy")}
            </dd>
          </div>
          <div className="   px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ">
            <dt className="  text-sm font-medium text-gray-500">details</dt>
            <dd className="mt-1  text-sm text-gray-900 sm:col-span-2 sm:mt-0  ">
              {contract.contract_details}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
