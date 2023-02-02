import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/auth";
import useDebounce from "../../../hooks/debounce";
import { error } from "../../../pages/auth/signup";
import SearchBox from "../../utils/form/search-box";

type AddSkills = {
  job_id: number;
};

export default function AddSkills({ job_id }: AddSkills) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [skill, setSkill] = useState("");
  const [errors, setErrors] = useState<error[]>([]);
  const { token } = useAuth();

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
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [debouncedSearch]);
  const addSkill = (skill_name: string) => {
    try {
      setLoading(true);
      axios
        .get(
          `http://localhost:4000/clients/add-or-attach-skill/${job_id}/${skill_name}`,
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
          console.log(response.data);
        })
        .catch((error) => {
          setLoading(false);
          setSuccess(false);

          setErrors([
            {
              message: error.message,
            },
          ]);
          setTimeout(() => {
            setErrors([]);
          }, 3000);
        });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  return (
    //@ts-ignore
    <div className="flex flex-col gap-y-2">
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
                  {loading ? "adding..." : result}
                </span>
                <button
                  onClick={() => {
                    addSkill(result);
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
    </div>
  );
}
