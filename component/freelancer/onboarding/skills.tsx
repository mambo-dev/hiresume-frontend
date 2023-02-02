import axios from "axios";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import useAxios from "../../../hooks/axios";
import useDebounce from "../../../hooks/debounce";
import { error } from "../../../pages/auth/signup";
import ComboBox from "../../utils/combo-box";
import Tag from "../../utils/tags";

type skill = {
  id: number;
  skill_name: string;
};

export default function Skills({ token, data }: any) {
  const [selectedSkill, setSelectedSkill] = useState<string>("");
  const [created, setCreated] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [addLoading, setAddLoading] = useState(false);
  const [loading, setLoading] = useState(false);
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

  function addSkills() {
    setLoading(true);
  }

  return (
    <div className="w-full h-full py-4 px-2">
      <div className="w-full md:w-3/4 m-auto flex flex-col gap-y-4 items-center justify-center">
        <span className="w-3/4 flex items-center justify-center  text-teal-600">
          lets add some of your skills to complete the profile
        </span>

        <QuerySkills
          addLoading={addLoading}
          query={query}
          results={results}
          setQuery={setQuery}
          setAddLoading={setAddLoading}
          setSkills={setSkills}
          skills={skills}
        />

        {skills.length > 0 && (
          <code className="w-full  py-2 relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 px-1 rounded bg-white  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 ">
            {skills.map((skill: string, index: number) => {
              return (
                <span
                  key={index}
                  className=" relative focus:ring-1 ring-offset-1 ring-green-700 bg-green-200 text-green-900 rounded-full py-2 px-6 flex items-center justify-center font-semibold"
                >
                  {skill}

                  <button
                    type="button"
                    onClick={() => {
                      setSkills(
                        skills.filter((filterSkill) => filterSkill !== skill)
                      );
                      setSelectedSkill("");
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
            onClick={addSkills}
            className="mt-2 inline-flex disabled:bg-opacity-20 items-center justify-center shadow shadow-teal-500 bg-teal-600 rounded  text-gray-100  focus:shadow-md focus:shadow-teal-400 p-2 w-full "
          >
            add skills
          </button>
        )}
      </div>
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
function QuerySkills({
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
