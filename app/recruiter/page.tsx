"use client";
import React from "react";
import RecruiterHeader from "@/components/RecruiterHeader";
import axios from "axios";
import JobCardRecruiter from "@/components/JobCardRecruiter";

export default function RecruiterPage() {
  const [jobs, setJobs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const getJobs = async () => {
    try {
      const response = await axios.get("/api/getjobsbyrecruiter");
      console.log(response.data);
      setJobs(response.data);
    } catch (error) {
      setError(error.message);
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
