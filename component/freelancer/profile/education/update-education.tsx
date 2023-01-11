import React, { useState } from "react";
import useAxios from "../../../../hooks/axios";
import useForm from "../../../../hooks/form";
import { error, errorSvg, successSvg } from "../../../../pages/auth/signup";
import Toast from "../../../utils/toast";

type Update = {
  freelancer_id: number;
  education_id: number | null | undefined;
  type: string;
  token: string;
  currentEducationDetails: any;
};

export default function UpdateEducation({
  education_id,
  freelancer_id,
  type,
  token,
  currentEducationDetails,
}: Update) {
  const [errors, setErrors] = useState<error[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [toast, setToast] = useState(false);
  const [success, setSuccess] = useState(false);

  const { handleSubmitResponse, loading, response } = useAxios(
    `freelancers/update-any/${freelancer_id}/${education_id}`,
    setErrors,
    errors,
    "patch",
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    setOpenModal
  );

  const initialValues = {
    education_school: currentEducationDetails.education_school,
    education_year_from: currentEducationDetails.education_year_from,
    education_year_to: currentEducationDetails.education_year_to,
  };

  const { handleChange, handleSubmit, values } = useForm(
    initialValues,
    handleSubmitResponse,
    "education"
  );
  return (
    <div className="w-full  h-full flex flex-col items-center justify-center gap-y-4  py-16 px-2 bg-inherit">
      {errors.length > 0 && toast && (
        <div className="h-screen w-1/2 absolute top-1 bottom-0 right-10 flex flex-col items-end justify-start gap-y-4">
          {errors.map((error) => (
            <Toast
              message={error?.message}
              className="border-l-8 border-l-red-600 text-gray-800"
              svg={errorSvg}
            />
          ))}
        </div>
      )}
      {success && (
        <div className="h-screen w-1/2 absolute top-1 bottom-0 right-10 flex flex-col items-end justify-start gap-y-4">
          <Toast
            message="successfully updated education"
            className="border-l-8 border-l-green-600 text-green-800 font-bold"
            svg={successSvg}
          />
        </div>
      )}

      {loading && (
        <div className="h-screen w-1/2 absolute top-1 bottom-0 right-10 flex flex-col items-end justify-start gap-y-4">
          <Toast
            className="border-l-8 border-l-teal-600 text-teal-800 font-bold"
            body={
              <div className="flex items-center justify-start w-full gap-x-4 text-teal-800">
                <div
                  className="animate-spin border-b-2 border-teal-800  border-l-2 inline-block w-5 h-5 border rounded-full"
                  role="status"
                >
                  <span className="hidden">Loading...</span>
                </div>
                <span>updating your education</span>
              </div>
            }
          />
        </div>
      )}
      <div className="font-medium text-teal-800">
        <p>update education background</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          setToast(true);
          setTimeout(() => {
            setToast(false);
            setErrors([]);
          }, 3000);

          if (errors.length <= 0) {
            handleSubmit(e);
          }
        }}
        className="h-full w-full flex flex-col gap-y-6 "
      >
        <div className="flex flex-col w-full">
          <label>school</label>
          <input
            type="text"
            name="education_school"
            value={values.education_school}
            onChange={handleChange}
            className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
          />
        </div>
        <div className="flex flex-col w-full">
          <label>year started</label>
          <input
            type="date"
            name="education_year_from"
            value={values.education_year_from}
            placeholder="from"
            onChange={handleChange}
            className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
          />
        </div>
        <div className="flex flex-col w-full">
          <label>year ended</label>
          <input
            type="date"
            name="education_year_to"
            placeholder="to"
            value={values.education_year_to}
            onChange={handleChange}
            className="py-2 px-1   rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
          />
        </div>

        <div className=" w-full">
          {loading ? (
            <button
              type="button"
              disabled={true}
              className="inline-flex items-center justify-center bg-opacity-70 gap-x-2 shadow shadow-teal-500 bg-teal-600 rounded  text-gray-100  focus:shadow-md focus:shadow-teal-400 p-2 w-full "
            >
              <div
                className="animate-spin border-b-2   border-l-2 inline-block w-5 h-5 border rounded-full"
                role="status"
              >
                <span className="hidden">Loading...</span>
              </div>
              <span>loading...</span>
            </button>
          ) : (
            <button
              type="submit"
              className="inline-flex items-center justify-center shadow shadow-teal-500 bg-teal-600 rounded  text-gray-100  focus:shadow-md focus:shadow-teal-400 p-2 w-full "
            >
              update education
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
