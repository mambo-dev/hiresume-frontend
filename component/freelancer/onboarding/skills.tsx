import React, { useEffect, useState } from "react";
import Tag from "../../utils/tags";

export default function Skills({ token }: any) {
  const [selected, setSelected] = useState(0);
  const [skills, setSkills] = useState([
    {
      id: 1,
      title: "NodeJs",
    },
    {
      id: 2,
      title: "ReactJs",
    },
    {
      id: 3,
      title: "Social",
    },
    {
      id: 4,
      title: "GraphQl",
    },
  ]);
  const [removeSkill, setRemoveSkill] = useState(null);

  return (
    <div className="w-full h-full py-4 px-2">
      <div className="w-full flex flex-col gap-y-4 items-center justify-center">
        <span className="w-3/4 flex items-center justify-center  text-teal-600">
          lets add some of your skills to complete the profile
        </span>

        <div className=" grid w-full md:w-3/4 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 p-2 border rounded shadow-inner bg-slate-50  ">
          {skills.map((skill: any) => (
            <Tag
              key={skill.id}
              data={skills}
              title={skill.title}
              setData={setSkills}
              selected={selected}
              button={
                <button
                  className="w-5 h-5"
                  onClick={() => {
                    setSelected(() => {
                      setSkills(
                        skills.filter((skill) => skill.id !== selected)
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
      </div>
    </div>
  );
}
