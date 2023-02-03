import axios from "axios";
import React, { useEffect, useState } from "react";
import useDebounce from "../../../hooks/debounce";
import useForm from "../../../hooks/form";
import { error } from "../../../pages/auth/signup";
import SearchBox from "../../utils/form/search-box";
import AddSkills from "./add-skills";

const myHeaders = new Headers();
myHeaders.append("apikey", process.env.NEXT_PUBLIC_API_KEY || "");

const requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};

export type job = {
  job_title: string;
  job_description: string;
  job_length: string;
  job_hourly_from: number;
  job_hourly_to: number;
  job_fixed_price?: number;
  job_level: string;
  skills?: string[];
};

type Skills = {
  skill_id: number;
};

export default function CreateForm({ token }: any) {
  const [hourly, setHourly] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<error[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<string>("");
  const [created, setCreated] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const debouncedSearch = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedSearch) {
      axios
        .get(`https://api.apilayer.com/skills?q=${query}`, {
          method: "GET",
          headers: {
            apikey: process.env.NEXT_PUBLIC_API_KEY,
          },
        })
        .then((response) => {
          setResults(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [debouncedSearch]);

  const submitAxios = async () => {
    try {
      setLoading(true);

      const createJob = await axios.post(
        `http://localhost:4000/clients/create-job`,
        {
          ...values,
          job_hourly_from: Number(values.job_hourly_from),
          job_hourly_to: Number(values.job_hourly_to),
          job_fixed_price: Number(values.job_fixed_price),
          skills,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (createJob) {
        setLoading(false);
        setCreated(true);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
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
  const initialValues: job = {
    job_title: "",
    job_description: "",
    job_length: "",
    job_hourly_from: 0,
    job_hourly_to: 0,
    job_fixed_price: 0,
    job_level: "entry",
  };

  const { values, handleChange, handleSubmit } = useForm(
    initialValues,
    submitAxios
  );

  return (
    //@ts-ignore

    <div className="flex flex-col ">
      {/*@ts-ignore */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
        <div className="flex flex-col w-full gap-y-2">
          <label className="font-semibold text-sm text-teal-700">Title</label>
          <input
            type="text"
            name="job_title"
            onChange={handleChange}
            value={values.job_title}
            placeholder="React Node Js developer needed"
            className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
          />
        </div>
        <div className="flex flex-col w-full gap-y-2">
          <label className="font-semibold text-sm text-teal-700">
            Description
          </label>
          <textarea
            name="job_description"
            onChange={handleChange}
            value={values.job_description}
            placeholder="enter description of your job"
            className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
          />
        </div>
        <div className="flex flex-col w-full gap-y-2">
          <label className="font-semibold text-sm text-teal-700">length</label>
          <input
            type="text"
            name="job_length"
            onChange={handleChange}
            value={values.job_length}
            placeholder="one month, two months..."
            className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
          />
        </div>
        <div className="flex flex-col w-full gap-y-2">
          <p className="font-semibold text-sm text-teal-700">paying rate as</p>
          <div className="flex gap-x-2 ">
            <div className="flex items-center justify-between gap-x-2">
              <input
                value="hourly"
                onChange={() => {
                  setHourly(true);
                  setFixed(false);
                }}
                name="role"
                type="radio"
                className="h-4 w-4 border-gray-300 text-teal-600 focus:ring-teal-200 "
              />
              <label
                htmlFor="push-everything"
                className=" text-sm font-bold  text-teal-700"
              >
                hourly
              </label>
            </div>
            <div className="flex items-center gap-x-2">
              <input
                onChange={() => {
                  setHourly(false);
                  setFixed(true);
                }}
                value="fixed"
                name="role"
                type="radio"
                className="h-4 w-4 border-gray-300 text-teal-600 focus:ring-teal-200"
              />
              <label
                htmlFor="push-everything"
                className=" text-sm font-bold  text-teal-700"
              >
                fixed
              </label>
            </div>
          </div>
        </div>
        {hourly && (
          <div className="flex flex-col w-full gap-y-2">
            <div className="flex flex-col w-full gap-y-2">
              <label className="font-semibold text-sm text-teal-700">
                paid hourly from
              </label>
              <input
                type="number"
                name="job_hourly_from"
                onChange={handleChange}
                value={values.job_hourly_from}
                className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
              />
            </div>
            <div className="flex flex-col w-full gap-y-2">
              <label className="font-semibold text-sm text-teal-700">
                paid hourly to
              </label>
              <input
                type="number"
                name="job_hourly_to"
                onChange={handleChange}
                value={values.job_hourly_to}
                className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
              />
            </div>
          </div>
        )}{" "}
        {fixed && (
          <div className="flex flex-col w-full gap-y-2">
            <label className="font-semibold text-sm text-teal-700">
              fixed price
            </label>
            <input
              type="number"
              name="job_fixed_price"
              onChange={handleChange}
              value={values.job_fixed_price}
              className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
            />
          </div>
        )}
        <div className="flex flex-col w-full gap-y-2">
          <label className="font-semibold text-sm text-teal-700">
            job level
          </label>
          <select
            id="job_level"
            name="job_level"
            onChange={handleChange}
            value={values.job_level}
            autoComplete="level"
            defaultValue="entry"
            className=" py-2 px-1 rounded bg-white  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
          >
            {["entry", "intermerdiate", "experienced"].map(
              (level: string, index: number) => (
                <option key={index}> {level} </option>
              )
            )}
          </select>
        </div>
        <Skills
          addLoading={addLoading}
          query={query}
          results={results}
          setQuery={setQuery}
          setAddLoading={setAddLoading}
          setSkills={setSkills}
          skills={skills}
        />
        {skills.length > 0 && (
          <code className=" py-2 relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 px-1 rounded bg-white  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 ">
            {skills.map((skill: string, index: number) => {
              return (
                <span
                  key={index}
                  className=" relative bg-green-200 text-green-900 rounded-full py-2 px-6 flex items-center justify-center font-semibold"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => {
                      setSkills(
                        skills.filter((filterSkill) => filterSkill === skill)
                      );
                    }}
                    className="p-1 w-6 h-6  rounded-full absolute top-2 bottom-0 right-2 bg-green-800 shadow focus:ring-1 focus:ring-green-600 ring-offset-2 shadow-green-800 focus:border border-green-600 outline-none inline-flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 text-white font-bold"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </span>
              );
            })}
          </code>
        )}
        {loading ? (
          <button
            type="button"
            disabled={true}
            className="mt-2 inline-flex items-center justify-center bg-opacity-70 gap-x-2 shadow shadow-teal-500 bg-teal-600 rounded  text-gray-100  focus:shadow-md focus:shadow-teal-400 p-2 w-full "
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
            disabled={skills.length < 1}
            className="mt-2 inline-flex disabled:bg-opacity-40 items-center justify-center shadow shadow-teal-500 bg-teal-600 rounded  text-gray-100  focus:shadow-md focus:shadow-teal-400 p-2 w-full "
          >
            create job
          </button>
        )}
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

type SkillsProp = {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  query: string;
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
  results: any;
  addLoading: boolean;
  setAddLoading: React.Dispatch<React.SetStateAction<boolean>>;
  skills: string[];
};
function Skills({
  setQuery,
  query,
  setSkills,
  results,
  addLoading,
  setAddLoading,
  skills,
}: SkillsProp) {
  return (
    <>
      <div className="flex flex-col w-full gap-y-4">
        <label className="font-semibold text-sm text-teal-700">add skill</label>
        <input
          type="text"
          name="query"
          placeholder="start typing to see availbale skills"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
        />
      </div>
      {query.length > 0 && (
        <div className="w-full relative flex flex-col gap-y-1 bg-white shadow border border-slate-300">
          {results.map((result: any, index: number) => {
            return (
              <div
                key={index}
                className="flex  group items-center hover:bg-teal-200  justify-between px-2 py-3 bg-slate-50  "
              >
                <span className="w-full text-sm font-semibold text-teal-700 ">
                  {addLoading ? "adding..." : result}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setAddLoading(true);
                    setSkills([...skills, result]);
                    setQuery("");
                    setTimeout(() => {
                      setAddLoading(false);
                    }, 1500);
                  }}
                  className="outline-none mr-4 inline-flex items-center justify-center w-9 h-9 p-2 rounded-full bg-slate-200/20 focus:bg-slate-200/60 group-hover:bg-teal-900/40 text-slate-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
