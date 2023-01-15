import React, { useEffect, useState } from "react";

export default function Tag({
  title,
  data,
  selected,
  setSelected,
  button,
  setData,
}: any) {
  return (
    <span
      className={`h-10 truncate text-gray-700 gap-y-2 shadow border boder-gray-300 w-full rounded-full flex items-center justify-around p-2 bg-white  `}
    >
      {title}
      {button}
    </span>
  );
}
