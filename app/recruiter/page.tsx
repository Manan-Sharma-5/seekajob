"use client";
import React from "react";
import RecruiterHeader from "@/components/RecruiterHeader";
import axios from "axios";
import JobCardRecruiter from "@/components/JobCardRecruiter";
import { JobDetailsRecruiterService } from "@/services/JobServices";

export default function RecruiterPage() {
  const [jobs, setJobs] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string>();

  const getJobs = async () => {
    try {
      const response = await JobDetailsRecruiterService();
      console.log(response);
      setJobs(response);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setError("Failed to fetch jobs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getJobs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <RecruiterHeader />
      <div className="items-center justify-center w-[100%] mt-10">
        {jobs.length > 0 ? (
          <div className="grid grid-cols-3 gap-10 w-[100%] px-10">
            {jobs.map((job) => (
              <JobCardRecruiter key={job.id} job={job} />
            ))}
          </div>
        ) : (
          "You have no jobs posted yet."
        )}
      </div>
    </div>
  );
}
