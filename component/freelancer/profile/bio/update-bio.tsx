import axios from "axios";
import React, { useState } from "react";
import useForm from "../../../../hooks/form";
import { error } from "../../../../pages/auth/signup";

type BioType = {
  bio_id: number;
  freelancer_id: number;
  current_bio_details: any;
  token: string;
};

export default function UpdateBio({
  bio_id,
  freelancer_id,
  current_bio_details,
  token,
}: BioType) {
  const type = "bio";
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<error[]>([]);
  console.log(bio_id);
  const updateBio = async (values: any) => {
    try {
      setLoading(true);

      const update = await axios.patch(
        `http://localhost:4000/freelancers/update-any/${freelancer_id}/${bio_id}`,
        {
          type,
          data: {
            ...values,
            bio_hourly_rate: Number(values.bio_hourly_rate),
          },
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (update) {
        setLoading(false);
        setSuccess(true);

        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      setError([
        {
          message: error.message,
        },
      ]);
    }
  };

  const { values, handleChange, handleSubmit } = useForm(
    {
      bio_title: current_bio_details.bio_title,
      bio_description: current_bio_details.bio_description,
      bio_hourly_rate: current_bio_details.bio_hourly_rate,
    },
    updateBio
  );

  return (
    <div className="w-full h-full py-3 px-2 flex flex-col gap-y-2  items-center justify-center ">
      <p className="text-teal-600 text-lg font-medium">update bio</p>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="w-full h-full flex gap-y-2 flex-col"
      >
        <div className="flex flex-col w-full">
          <label>title</label>
          <input
            type="text"
            name="bio_title"
            value={values.bio_title}
            onChange={handleChange}
            className="py-2 px-1 rounded placeholder-slate-700 border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
          />
        </div>
        <div className="flex flex-col w-full">
          <label>description</label>
          <textarea
            name="bio_description"
            value={values.bio_description}
            onChange={handleChange}
            className="py-2 px-1 rounded placeholder-slate-700 border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
          />
        </div>
        <div className="flex flex-col w-full">
          <label>hourly rate </label>
          <input
            type="number"
            name="bio_hourly_rate"
            value={values.bio_hourly_rate}
            onChange={handleChange}
            className="py-2 px-1 rounded  placeholder-slate-700 border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
          />
        </div>
        <div className="py-4">
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
              update
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
