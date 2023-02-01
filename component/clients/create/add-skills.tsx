import axios from "axios";
import React, { useEffect, useState } from "react";
import useDebounce from "../../../hooks/debounce";
import SearchBox from "../../utils/form/search-box";

export default function AddSkills() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [value, setValue] = useState("");
  const [skill, setSkill] = useState("");

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
  const addSkill = async () => {
    try {
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  return (
    <div className="flex flex-col gap-y-2">
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
        <div className="w-full flex flex-col gap-y-1 bg-white shadow border border-slate-300">
          {results.map((result: any) => {
            return (
              <span
                onClick={() => {
                  setQuery("");
                  setSkill(result);
                }}
                className="w-full hover:bg-teal-200 bg-slate-50 py-3 px-2 text-sm font-semibold text-teal-700 "
              >
                {result}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
