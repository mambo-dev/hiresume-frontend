import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../hooks/auth";
import useForm from "../../hooks/form";
import { error } from "../../pages/auth/signup";

export default function CreateContract() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<error[]>([]);
  const initialValues = {
    details: "",
    client_signed: "",
    date_signed: "",
    end: "",
    start: "",
  };
  const submitAxios = async () => {
    try {
      setLoading(true);

      const createContract = await axios.post(
        `http://localhost:4000/clients/create-job`,
        {
          ...values,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (createContract) {
        setLoading(false);

        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 1500);
      }
    } catch (error: any) {
      setLoading(false);
      setErrors([
        {
          message: error.message,
        },
      ]);
      setTimeout(() => {
        setErrors([]);
      }, 3000);
    }
  };
  const { handleSubmit, handleChange, values } = useForm(
    initialValues,
    submitAxios
  );
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center md:px-0 px-1">
      <div className="text-teal-300 text-xl font-semibold">
        <h1>Create Contract</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className=" w-full md:w-1/2 flex flex-col gap-y-2"
      >
        <div className="flex flex-col w-full gap-y-2">
          <label className="text-teal-500 text-sm font-medium">details</label>
          <input
            type="email"
            name="details"
            onChange={handleChange}
            value={values.details}
            className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2  focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
          />
        </div>
        <div className="flex flex-col w-full gap-y-2">
          <label className="text-teal-500 text-sm font-medium">
            client signature
          </label>
          <input
            type="text"
            name="client_signed"
            placeholder="use your name for this"
            onChange={handleChange}
            value={values.client_signed}
            className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2  focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
          />
        </div>
        <div className="flex flex-col w-full gap-y-2">
          <label className="text-teal-500 text-sm font-medium">
            contract signed on
          </label>
          <input
            type="date"
            name="date_signed"
            onChange={handleChange}
            value={values.date_signed}
            className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2  focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
          />
        </div>
        <div className="flex flex-col w-full gap-y-2">
          <label className="text-teal-500 text-sm font-medium">
            contract start on
          </label>
          <input
            type="date"
            name="start"
            onChange={handleChange}
            value={values.start}
            className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2  focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
          />
        </div>
        <div className="flex flex-col w-full gap-y-2">
          <label className="text-teal-500 text-sm font-medium">
            contract end on
          </label>
          <input
            type="date"
            name="end"
            onChange={handleChange}
            value={values.end}
            className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2  focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full disabled:bg-opacity-70 mt-2 font-bold text-white bg-teal-400 rounded shadow shadow-teal-200 py-2 px-1"
        >
          {loading ? "loading..." : "create contract"}
        </button>
        {errors.length > 0 &&
          errors.map((error: error) => {
            <p className="font-bold text-sm text-red-500 m-auto mt-2">
              {error.message}
            </p>;
          })}
        {success && (
          <p className="font-bold text-sm text-green-500 m-auto mt-2">
            succesfully created job
          </p>
        )}
      </form>
    </div>
  );
}
