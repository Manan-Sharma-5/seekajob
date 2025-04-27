"use client";
import AuthHOC from "@/components/hoc/AuthHOC";
import JobComponent from "@/components/JobComponent";
import { JobsFetchService } from "@/services/JobServices";
import { useEffect, useState } from "react";

const JobPage = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const fetchJobs = async () => {
    try {
      const response = await JobsFetchService();
      setJobs(response);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <div className="flex flex-row min-h-screen">
        <div className="w-[30%]"></div>
        <div className="w-[70%] p-12">
          <div className="flex flex-col gap-10">
            {jobs.map((job) => (
              <JobComponent key={job.id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthHOC(JobPage);
