import axios from "axios";
import React, { useEffect, useState } from "react";
import { job } from "../../clients/create/create-form";
import Job from "../../clients/create/get/jobs";

export default function RecommendJob({ user, token }: any) {
  const [jobs, setJobs] = useState<job[]>([]);

  const fetchJobs = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_SERVER_LINK}/explores/freelancer-job-recommendations/1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setJobs(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className=" w-full  m-auto grid grid-cols-1 gap-3 py-2 h-full ">
      {jobs.map((job: any) => (
        <Job job={job} user={user} token={token} />
      ))}
    </div>
  );
}
