import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import useForm from "../../hooks/form";
import { login, signup } from "../../state-mgt/auth.actions";
import { motion } from "framer-motion";

export type error = {
  message?: String;
};
export default function SignUp() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<error[]>([]);
  const [toast, setToast] = useState(false);
  const [success, setSuccess] = useState(false);

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    role: "",
    firstName: "",
    lastName: "",
  };

  async function handleSignup(values: any) {
    try {
      setLoading(true);
      const signupResponse = await axios.post(
        `http://localhost:4000/auth/signup`,
        values
      );

      if (signupResponse) {
        setSuccess(true);
        dispatch(signup(signupResponse.data));
      }

      const loginResponse = await axios.post(
        `http://localhost:4000/auth/login`,
        {
          username: values.email,
          password: values.password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(login(loginResponse.data));

      if (loginResponse && signupResponse.data.user_role === "freelancer") {
        setLoading(false);
        setTimeout(() => {
          router.push("/freelancer");
          setSuccess(false);
        }, 3000);
      } else {
        setTimeout(() => {
          router.push("/client");
          setSuccess(false);
        }, 3000);

        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleSignUpValidation(values: any) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    Object.keys(values).map((value) => {
      if (values[value].trim() === "") {
        setErrors((prevErrors) => [
          ...prevErrors,
          {
            message: `please enter your ${value} `,
          },
        ]);
      } else if (values[value] === "email" && !regex.test(values[value])) {
        setErrors((prevErrors) => [
          ...prevErrors,
          {
            message: "please enter a valid email",
          },
        ]);
      }
    });
    if (values.password !== values.confirmPassword) {
      setErrors((prevErrors) => [
        ...prevErrors,
        {
          message: "passwords must match",
        },
      ]);
    }
  }

  const { values, handleChange, handleSubmit } = useForm(
    initialValues,
    handleSignup
  );

  return (
    <div className="relative h-full w-full overflow-y-hidden flex gap-x-2 items-center">
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
            message="successfully created account, loggin in"
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
                <span>creating your account</span>
              </div>
            }
          />
        </div>
      )}

      <div className="w-1/2 h-screen hidden md:flex  ">
        <img
          className="w-full h-full  rounded-tr-2xl "
          src="https://images.unsplash.com/photo-1660721858662-9ad9f37447f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        />
      </div>
      <div className=" w-full px-2 md:px-5  lg:w-1/2 h-screen py-2 md:py-4  lg:px-10 flex  flex-col gap-y-2">
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="text-teal-800 text-3xl font-semibold">
            Join us at Hiresume
          </h1>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignUpValidation(values);
              setToast(true);
              setTimeout(() => {
                setToast(false);
                setErrors([]);
              }, 3000);

              if (errors.length <= 0) {
                handleSubmit(e);
              }
            }}
            className="flex flex-col gap-y-2 w-full  h-full"
          >
            <div className="flex flex-col gap-y-2 md:flex-row md:gap-x-6 items-center justify-between px-2 md:px-20 text-gray-700 font-medium">
              <div className="flex flex-col w-full md:w-1/2 ">
                <label>first name</label>
                <input
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  value={values.firstName}
                  className={`py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 `}
                />
              </div>
              <div className="flex flex-col w-full md:w-1/2">
                <label>second name</label>
                <input
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  value={values.lastName}
                  className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-2 items-center  px-2 md:px-20 justify-center text-gray-700 font-medium ">
              <div className="flex flex-col w-full">
                <label>email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
                />
              </div>
              <div className="flex flex-col w-full">
                <label>password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                  className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
                />
              </div>
              <div className="flex flex-col w-full">
                <label>confirm password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  value={values.confirmPassword}
                  className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
                />
              </div>
              <div className="flex flex-col w-full">
                <label>country</label>
                <select
                  id="country"
                  name="country"
                  onChange={handleChange}
                  value={values.country}
                  autoComplete="country-name"
                  className=" py-2 px-1 rounded bg-white  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
                >
                  {country_list.map((country: string, index: number) => (
                    <option key={index}> {country} </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col py-1 gap-y-2 px-2 md:px-20">
              <p className="text-gray-700 font-bold">Join us as </p>
              <div className="flex gap-x-2 ">
                <div className="flex items-center justify-between gap-x-2">
                  <input
                    value="client"
                    onChange={handleChange}
                    checked={values.role === "client"}
                    name="role"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-teal-600 focus:ring-teal-200 "
                  />
                  <label
                    htmlFor="push-everything"
                    className=" text-sm font-bold  text-gray-700"
                  >
                    client
                  </label>
                </div>
                <div className="flex items-center gap-x-2">
                  <input
                    onChange={handleChange}
                    value="freelancer"
                    checked={values.role === "freelancer"}
                    name="role"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-teal-600 focus:ring-teal-200"
                  />
                  <label
                    htmlFor="push-everything"
                    className=" text-sm font-bold  text-gray-700"
                  >
                    freelancer
                  </label>
                </div>
              </div>
            </div>
            <div className="px-2 md:px-20 py-2">
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
                  create account
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export function Toast({ message, className, svg, body }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`bg-white w-72 truncate  px-2 p-2  font-medium shadow border  h-14 flex items-center justify-center gap-x-2  rounded ${className}`}
    >
      {message && message.length > 0 && (
        <div className="w-full flex items-center gap-x-3 justify-start overflow-x-hidden">
          {svg}
          <p className="truncate"> {message}</p>
        </div>
      )}
      {body}
    </motion.div>
  );
}

export const errorSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 text-red-800"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
    />
  </svg>
);

export const successSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 text-green-600"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
    />
  </svg>
);

var country_list = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua &amp; Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia &amp; Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Cape Verde",
  "Cayman Islands",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cruise Ship",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyz Republic",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre &amp; Miquelon",
  "Samoa",
  "San Marino",
  "Satellite",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "St Kitts &amp; Nevis",
  "St Lucia",
  "St Vincent",
  "St. Lucia",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Trinidad &amp; Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks &amp; Caicos",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];
