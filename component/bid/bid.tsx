import axios from "axios";
import { useState } from "react";
import useForm from "../../hooks/form";
import { error } from "../../pages/auth/signup";

type BidProps = {
  job_id: number;
  token: string;
};
export default function Bid({ job_id, token }: BidProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<error[]>([]);

  const initialState = {
    bid_rate: 0,
    bid_coverletter: "",
  };

  const submitAxios = () => {
    setLoading(true);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_LINK}/freelancers/bid-job/${job_id}`,
        {
          ...values,
          bid_rate: Number(values.bid_rate),
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(true);
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setSuccess(false);

        setErrors([
          {
            message: error.response.data.message,
          },
        ]);
        setTimeout(() => {
          setErrors([]);
        }, 3000);
      });
  };

  const { values, handleChange, handleSubmit } = useForm(
    initialState,
    submitAxios
  );
  return (
    //@ts-ignore
    <form onSubmit={handleSubmit} className="w-full h-fit py-4 px-2">
      <div className="flex flex-col gap-y-2 ">
        <label htmlFor="bid_rate" className="text-sm font-bold text-teal-700">
          rate per hour
        </label>
        <input
          type="number"
          name="bid_rate"
          value={values.bid_rate}
          onChange={handleChange}
          id="bid_rate"
          className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
        />
      </div>
      <div className="flex flex-col gap-y-2 ">
        <label htmlFor="bid_rate" className="text-sm font-bold text-teal-700">
          cover letter
        </label>
        <textarea
          name="bid_coverletter"
          value={values.bid_coverletter}
          onChange={handleChange}
          className="py-2  px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
        />
      </div>
      <div className="w-full py-4">
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
            send bid
          </button>
        )}
      </div>
      {errors.length > 0 &&
        errors.map((error: error) => {
          return (
            <p className="font-bold text-sm text-red-500 m-auto mt-2">
              {error.message}
            </p>
          );
        })}
      {success && (
        <p className="font-bold text-sm text-green-500 m-auto mt-2">
          succesfully created bid
        </p>
      )}
    </form>
  );
}
