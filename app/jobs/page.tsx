"use client";
import AuthHOC from "@/components/hoc/AuthHOC";
import JobComponent from "@/components/JobComponent";
import { JobsFetchService, SearchJobService } from "@/services/JobServices";
import { useEffect, useState } from "react";

const JobPage = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [salaryFilter, setSalaryFilter] = useState<string>("");
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [tagsFilter, setTagsFilter] = useState<string>("");
  const fetchJobs = async () => {
    try {
      const response = await JobsFetchService();
      setJobs(response);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const getJob = async () => {
    try {
      const jobData = await SearchJobService(
        "",
        salaryFilter,
        locationFilter,
        tagsFilter
      );
      setJobs(jobData);
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  useEffect(() => {
    if (salaryFilter || locationFilter || tagsFilter) {
      getJob();
    } else {
      fetchJobs();
    }
  }, [salaryFilter, locationFilter, tagsFilter]);

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <div className="flex flex-row min-h-screen">
        {/* Left-hand side filter section */}
        <div className="w-[30%] p-8 bg-gray-100">
          <h2 className="text-2xl font-bold mb-6">Filter Jobs</h2>
          <div className="flex flex-col gap-6">
            <div>
              <label className="block font-semibold mb-2">Salary</label>
              <input
                type="text"
                placeholder="Enter minimum salary"
                value={salaryFilter}
                onChange={(e) => setSalaryFilter(e.target.value)}
                className="p-2 w-full border rounded"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Location</label>
              <input
                type="text"
                placeholder="Enter location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="p-2 w-full border rounded"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Tags</label>
              <input
                type="text"
                placeholder="Enter tags separated by commas"
                value={tagsFilter}
                onChange={(e) => setTagsFilter(e.target.value)}
                className="p-2 w-full border rounded"
              />
            </div>
          </div>
        </div>

        {/* Jobs Section */}
        <div className="w-[70%] p-12">
          <div className="flex flex-col gap-10">
            {jobs && jobs.map((job) => <JobComponent key={job.id} job={job} />)}
            {!jobs && (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No jobs found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthHOC(JobPage);
