import { Combobox } from "@headlessui/react";
import React, { Fragment, useState } from "react";

type ComboBox = {
  selectedValue: any;
  setSelectedValues: any;
  displayValue: string;
  data: any;
  setQuery: any;
  filteredData: any;
};

export default function ComboBox({
  selectedValue,
  setSelectedValues,
  displayValue,
  data,
  setQuery,
  filteredData,
}: ComboBox) {
  return (
    <Combobox value={selectedValue} onChange={setSelectedValues}>
      <Combobox.Input
        onChange={(event) => setQuery(event.target.value)}
        displayValue={() => displayValue}
        className="py-2 px-1 rounded  border border-gray-300 
        
        focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 w-full"
      />
      <Combobox.Options>
        {filteredData.map((data: any, index: number) => (
          <Combobox.Option key={data.id} value={data} as={Fragment}>
            {({ active, selected }) => (
              <li
                className={`${
                  active ? "bg-blue-500 text-white" : "bg-white text-black"
                }`}
              >
                {selected && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                )}
                {data.type}
              </li>
            )}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}
