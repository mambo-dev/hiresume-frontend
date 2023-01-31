import React from "react";

type SearchBox = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  results: string[];
};

export default function SearchBox({
  query,
  setQuery,
  results,
  setValue,
}: SearchBox) {
  return (
    <div className="flex flex-col w-full gap-y-2 relative">
      <div className="flex flex-col w-full">
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
        <div className="bg-white py-2 shadow-md rounded border border-gray-200 flex items-center flex-col rounded w-full absolute top-[110%] right-0 left-0 ">
          {results.map((result) => (
            <button
              onClick={() => {
                setQuery("");
                setValue(result);
              }}
              className="py-3 w-full px-2 inline-flex items-center justify-start hover:bg-teal-500  hover:text-white"
            >
              {result}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
