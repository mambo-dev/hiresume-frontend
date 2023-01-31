import axios from "axios";
import React, { useEffect, useState } from "react";
import useDebounce from "../../../hooks/debounce";
import SearchBox from "../../utils/form/search-box";

export default function AddSkills() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [value, setValue] = useState("");
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
      <SearchBox
        query={query}
        setQuery={setQuery}
        results={results}
        setValue={setValue}
      />
    </div>
  );
}
