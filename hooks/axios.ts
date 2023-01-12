import axios, {
  AxiosInterceptorOptions,
  AxiosRequestConfig,
  AxiosStatic,
} from "axios";
import { useState } from "react";
import { error } from "../pages/auth/signup";

export enum axiosRequestActions {
  post = "post",
  put = "put",
  patch = "patch",
  delete = "delete",
  get = "get",
}

export default function useAxios(
  link: string,
  setErrors: any,
  errors: any,
  axiosReqAction: string,
  axiosOptions?: AxiosRequestConfig,
  setOpenModal?: any
) {
  console.log(axiosOptions);
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmitResponse(submitValues: any) {
    try {
      setLoading(true);
      let success;
      switch (axiosReqAction) {
        case "post":
          success = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_LINK}/${link}`,
            submitValues,
            axiosOptions
          );
          break;
        case "patch":
          success = await axios.patch(
            `${process.env.NEXT_PUBLIC_SERVER_LINK}/${link}`,
            submitValues,
            axiosOptions
          );
          break;
        case "put":
          success = await axios.put(
            `${process.env.NEXT_PUBLIC_SERVER_LINK}/${link}`,
            submitValues,
            axiosOptions
          );
          break;
        case "delete":
          success = await axios.delete(
            `${process.env.NEXT_PUBLIC_SERVER_LINK}/${link}`,
            axiosOptions
          );
          break;
      }

      if (success) {
        setSuccess(true);
        setLoading(false);
        setResponse(success);
        setOpenModal(false);
      }
    } catch (error) {
      console.log(error);
      setSuccess(false);
      setLoading(false);
      setResponse({});
      setErrors((prevErrors: any) => [
        ...prevErrors,
        {
          message: "could not submit request",
        },
      ]);
    }
  }

  return {
    handleSubmitResponse,
    response,
    loading,
    errors,
    success,
  };
}
