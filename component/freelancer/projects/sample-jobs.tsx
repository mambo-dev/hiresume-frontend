import React from "react";
import Job from "../../clients/create/get/jobs";

export default function SampleJobs({ sampleJobs, user }: any) {
  return (
    <div className=" w-full  m-auto grid grid-cols-1 gap-3 py-2 h-full ">
      {sampleJobs?.map((job: any) => (
        <Job key={job.id} job={job} user={user} />
      ))}
    </div>
  );
}
