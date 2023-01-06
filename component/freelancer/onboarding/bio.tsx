import React, { useState } from "react";
import useForm from "../../../hooks/form";
import Dropzone from "../../utils/dropzone";
import { error, errorSvg, successSvg } from "../../../pages/auth/signup";
import axios from "axios";
import Toast from "../../utils/toast";

type acceptedFiles = {
  path?: string;
  name?: string;
  type?: string;
  size?: number;
};

const Files = ({ acceptedFiles }: any) => {
  return acceptedFiles.map((file: acceptedFiles) => (
    <li className="text-teal-800 list-none" key={file.path}>
      {file.name}
    </li>
  ));
};

export default function Bio({ token }: any) {
  const [loading, setLoading] = useState(false);
  const [acceptedImage, setAcceptedImage] = useState<acceptedFiles[]>([]);
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState(false);
  const [errors, setErrors] = useState<error[]>([]);
  const initialValues = {
    title: "",
    description: "",
    hourly_rate: "",
  };

  const handleBioValidation = (values: any) => {
    Object.keys(values).map((value) => {
      if (values[value].trim() === "") {
        setErrors((prevErrors) => [
          ...prevErrors,
          {
            message: `please enter your ${value} `,
          },
        ]);
      }
    });
  };

  const handleBioAxios = async (values: any) => {
    try {
      setLoading(true);
      const formData = new FormData();
      //@ts-ignore
      formData.append("image", acceptedImage[0]);
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("hourly_rate", values.hourly_rate);

      const submitBio = await axios.post(
        `http://localhost:4000/freelancers/bio`,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (submitBio) {
        setSuccess(true);
        setLoading(false);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErrors((prevErrors) => [
        ...prevErrors,
        {
          message: "could not create bio",
        },
      ]);
    }
  };

  const { values, handleChange, handleSubmit } = useForm(
    initialValues,
    handleBioAxios
  );

  return (
    <div className="w-full  h-full flex flex-col items-center justify-center py-10 px-2 bg-inherit">
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
            message="successfully created bio"
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
                <span>creating your bio</span>
              </div>
            }
          />
        </div>
      )}
      <div className="font-medium text-teal-800">
        <p>Describe who you are and what you do and can do for a client </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleBioValidation(values);
          setToast(true);
          setTimeout(() => {
            setToast(false);
            setErrors([]);
          }, 3000);

          if (errors.length <= 0) {
            handleSubmit(e);
          }
        }}
        className="h-full w-full flex flex-col gap-y-4 sm:w-4/5 md:w-3/4 lg:w-1/2 "
      >
        <div className="flex flex-col w-full items-center justify-center py-4 ">
          <Dropzone setAcceptedImage={setAcceptedImage} />
          <Files acceptedFiles={acceptedImage} />
        </div>
        <div className="flex flex-col w-full">
          <label>title</label>
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
            placeholder="React MongoDb Developer"
            className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
          />
        </div>
        <div className="flex flex-col w-full">
          <label>description</label>
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
          />
        </div>
        <div className="flex flex-col w-full">
          <label>hourly rate </label>
          <input
            type="number"
            name="hourly_rate"
            value={values.hourly_rate}
            onChange={handleChange}
            className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
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
              create bio
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

{
  /* <button className="inline-flex items-center justify-center border-4  border-dashed rounded border-gray-200 py-2 px-2 w-48 h-48">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 text-gray-300 font-bold"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button> */
}
