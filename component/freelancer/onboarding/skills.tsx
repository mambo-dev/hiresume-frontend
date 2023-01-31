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
  const [selected, setSelected] = useState(0);
  const [openBox, setOpenBox] = useState(false);

  const [skills, setSkills] = useState<skill[]>([]);
  const [querySkills, setQuerySkills] = useState<skill[]>([]);
  const [query, setQuery] = useState("");
  const [selectedValue, setSelectedValues] = useState("");
  const [errors, setErrors] = useState<error[]>([]);

  const debouncedSearch = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedSearch) {
      axios
        .get(`http://localhost:4000/freelancers/getSkills?skill_name=${query}`)
        .then((response) => {
          setQuerySkills(response.data);
          setOpenBox(true);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [debouncedSearch]);

  const { handleSubmitResponse, loading, response, success } = useAxios(
    "freelancers/skills",
    setErrors,
    errors,
    "post",
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(skills);
  return (
    <div className="w-full h-full py-4 px-2">
      <div className="w-full  flex flex-col gap-y-4 items-center justify-center">
        <span className="w-3/4 flex items-center justify-center  text-teal-600">
          lets add some of your skills to complete the profile
        </span>

        <div className=" w-full md:w-1/2 relative  m-auto">
          <div className="flex flex-col w-full">
            <label>search skill</label>
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
            <div className="bg-white py-2 shadow-md rounded border border-gray-200 flex items-center flex-col rounded w-full absolute top-[110%] right-0 left-0 ">
              {querySkills.map((skill) => (
                <button
                  onClick={() => {
                    setOpenBox(false);
                    setSkills([...skills, skill]);
                    setQuery("");
                  }}
                  className="py-3 w-full px-2 inline-flex items-center justify-start hover:bg-teal-500  hover:text-white"
                >
                  {skill.skill_name}
                </button>
              ))}
            </div>
          )}
        </div>
        {skills.length > 0 && (
          <div className=" grid w-full md:w-3/4 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 p-2 border rounded shadow-inner bg-slate-50  ">
            {skills.map((skill: any) => (
              <Tag
                key={skill.id}
                data={skills}
                title={skill.skill_name}
                setData={setSkills}
                selected={selected}
                button={
                  <button
                    className="w-5 h-5"
                    onClick={() => {
                      setSelected(() => {
                        setSkills(
                          skills.filter((skill: any) => skill.id !== selected)
                        );
                        return skill.id;
                      });
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-gray-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                }
              />
            ))}
          </div>
        )}
        <div className="w-full flex items-center justify-center">
          {loading ? (
            <button
              type="button"
              disabled={true}
              className="inline-flex w-32 m-auto   items-center justify-center bg-opacity-70 gap-x-2 shadow shadow-teal-500 bg-teal-600 rounded  text-gray-100  focus:shadow-md focus:shadow-teal-400 p-2 "
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
              onClick={() => {
                setSkills([]);
                handleSubmitResponse({
                  skills: skills.map((skill) => {
                    return {
                      skill_id: skill.id,
                      skill_name: skill.skill_name,
                    };
                  }),
                });
              }}
              className="inline-flex w-32 items-center justify-center shadow shadow-teal-500 bg-teal-600 rounded  text-gray-100  focus:shadow-md focus:shadow-teal-400 p-2 "
            >
              add skills
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
