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
  setOpenModal?: any,
  axiosOptions?: AxiosRequestConfig
) {
  const [response, setResponse] = useState({});

  const [loading, setLoading] = useState(false);

  async function handleSubmitResponse(submitValues: any) {
    try {
      setLoading(true);
      //@ts-ignore
      const success = await axios[axiosReqAction](
        `${process.env.NEXT_PUBLIC_SERVER_LINK}/${link}`,
        submitValues,

        axiosOptions
      );

      if (success) {
        setLoading(false);
        setResponse(success);
        setOpenModal(false);
      }
    } catch (error) {
      console.log(error);
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
  };
}
