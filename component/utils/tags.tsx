import React from "react";

export default function Tag({ title, skills, removeSkillId }: any) {
  function handleRemove() {
    skills.filter((skill: any) => skill.id !== removeSkillId);
  }
  return (
    <span className="h-10 text-gray-700 gap-y-2 shadow border boder-gray-300 w-full rounded-full flex items-center justify-around p-2 bg-white">
      {title}
      <button className="w-5 h-5" onClick={handleRemove}>
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
    </span>
  );
}
