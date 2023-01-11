import React, { useState } from "react";
import useAxios from "../../../../hooks/axios";
import useForm from "../../../../hooks/form";
import { error } from "../../../../pages/auth/signup";
import { freelancer_education } from "../../../../pages/freelancer/types";

type DeleteType = {
  currentEducationDetails: freelancer_education | undefined | null;
  setOpen: any;
  freelancer_id: number;
  type: string;
  token: string;
};
export default function DeleteEducation({
  setOpen,
  currentEducationDetails,
  freelancer_id,
  type,
  token,
}: DeleteType) {
  console.log(currentEducationDetails);
  const [deleteErrors, setDeleteErrors] = useState<error[]>([]);
  const { handleSubmitResponse, errors, loading, response } = useAxios(
    "freelancers/delete-any",
    setDeleteErrors,
    deleteErrors,
    "delete",
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const initialValues = {
    freelancer_id,
    type,
    idOfEntity: currentEducationDetails?.id,
  };

  const handleDeleteEducation = () => {
    setOpen(false);
    handleSubmitResponse(initialValues);
  };

  return (
    <div className="w-full h-full py-4">
      <div className="bg-white w-full h-1/2  px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className=" flex items-center justify-center flex-col sm:flex-row sm:flex h-full py-4  sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-red-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              delete education
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete your education background? All
                of your data will be permanently removed. You will have to re
                add your education status.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 h-1/4 w-full flex items-center flex-col sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none   sm:ml-3 sm:w-auto sm:text-sm"
          onClick={handleDeleteEducation}
        >
          delete
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded bg-white px-4 py-2 text-base font-medium text-blue-900 shadow border border-gray-800 hover:bg-gray-50 focus:outline-none  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
