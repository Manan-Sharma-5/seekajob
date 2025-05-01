"use client";
import JobComponent from "@/components/JobComponent";
import { SearchJobService } from "@/services/JobServices";
import { useEffect, useState } from "react";

interface JobDetails {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  companyID: string;
  experience: string;
  location: string;
  salary: number;
  recruiterId: string;
  category: string;
  tags: string[];
  company?: {
    name: string;
  };
}

interface RecommendedJob {
  id: string;
  title: string;
  location: string;
  salary: number;
}

export default function JobPage(props: { params: { searchTerm: string } }) {
  const { searchTerm } = props.params;
  const [jobs, setJob] = useState<JobDetails[] | null>(null);
  const [salaryFilter, setSalaryFilter] = useState<string>("");
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [tagsFilter, setTagsFilter] = useState<string>("");

  const getJob = async () => {
    try {
      const jobData = await SearchJobService(
        searchTerm,
        salaryFilter,
        locationFilter,
        tagsFilter
      );
      setJob(jobData);
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  useEffect(() => {
    getJob();
  }, [searchTerm, salaryFilter, locationFilter, tagsFilter]);

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
}
