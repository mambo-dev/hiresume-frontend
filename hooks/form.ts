import { useState } from "react";

export default function useForm(initialValues: any, axiosRequest: any) {
  const [values, setValues] = useState(initialValues);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    axiosRequest(values);
  }

  return {
    values,
    handleChange,
    handleSubmit,
  };
}
