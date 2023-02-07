import axios from "axios";
import { useState } from "react";
import useForm from "../../hooks/form";
import { error } from "../../pages/auth/signup";

type BidProps = {
  token: string;
  bid: any;
};
export default function ApproveBid({ token, bid }: BidProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<error[]>([]);

  const submitAxios = () => {
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_LINK}/approve-bid/${bid.bid_id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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

  return (
    //@ts-ignore
    <div className="w-full h-fit py-4 px-2">
      <div className="w-full py-4">
        <div>
          <p>{bid.bid_rate}</p>
          <p>{bid.bid_coverletter}</p>
        </div>
        {loading ? (
          <button
            type="button"
            disabled={true}
            className="inline-flex items-center justify-center bg-opacity-70 gap-x-2 shadowshadow-green-500 bg-green-600  rounded  text-gray-100  focus:shadow-md focus:shadow-green-400 p-2 w-full "
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
            type="button"
            onClick={submitAxios}
            className="inline-flex items-center justify-center shadow shadow-green-500 bg-green-600 rounded  text-gray-100  focus:shadow-md focus:shadow-green-400 p-2 w-full "
          >
            Approve Bid
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
          succesfully approved bid
        </p>
      )}
    </div>
  );
}
