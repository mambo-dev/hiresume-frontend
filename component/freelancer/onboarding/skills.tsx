import React, { useState } from "react";
import Tag from "../../utils/tags";

export default function Skills({ token }: any) {
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
              skills={skills}
              title={skill.title}
              setRemoveSkill={setRemoveSkill}
              removeSkill={skill.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
