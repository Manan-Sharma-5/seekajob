"use client";
import ButtonApply from "./ButtonApply";
import { JobDetailsFetchService } from "@/services/JobServices";
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

export default function JobPage(props: { params: { jobID: string } }) {
  const { jobID } = props.params;
  const [job, setJob] = useState<JobDetails | null>(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [recommendedJobs, setRecommendedJobs] = useState<RecommendedJob[]>([]);

  const getJob = async (jobID: string): Promise<JobDetails | null> => {
    try {
      const jobData = await JobDetailsFetchService(jobID);
      if (jobData) {
        setJob(jobData.jobs);
        setHasApplied(jobData.hasApplied);
        setRecommendedJobs(jobData.recomjob || []);
        return jobData.jobs;
      } else {
        console.error("Job not found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching job details:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      await getJob(jobID);
    };
    fetchJob();
  }, [jobID]);

  return (
    <div className="min-h-screen p-10 flex flex-col gap-10">
      {/* Job Details Section */}
      <div className="flex flex-row justify-between">
        <div className="p-10 flex flex-col gap-4 w-[60%]">
          {job ? (
            <>
              <h1 className="text-3xl font-bold">
                Company Name:{" "}
                <span className="font-normal">
                  {job.company ? job.company.name : "N/A"}
                </span>
              </h1>
              <h2 className="text-2xl font-bold">
                Job Title: <span className="font-normal">{job.title}</span>
              </h2>
              <p className="text-lg font-normal">{job.detailedDescription}</p>
              <h2 className="text-2xl font-bold">
                Salary: <span className="font-normal">${job.salary}</span>
              </h2>
              <h2 className="text-2xl font-bold">
                Location: <span className="font-normal">{job.location}</span>
              </h2>
              <h2 className="text-2xl font-bold">
                Experience:{" "}
                <span className="font-normal">{job.experience}</span>
              </h2>
            </>
          ) : (
            <h1 className="text-3xl font-bold">Job not found</h1>
          )}
        </div>

        {/* Apply Button Section */}
        <div className="sticky top-0 ml-auto w-1/3">
          <div className="p-4 bg-white shadow-md">
            <p className="mb-4">
              To process the application, please click on the Apply button
              below.
            </p>
            {job ? (
              hasApplied ? (
                <p className="text-green-500 font-bold">
                  You have already applied for this job.
                </p>
              ) : (
                <ButtonApply params={props.params} />
              )
            ) : null}
          </div>
        </div>
      </div>

      {/* Recommended Jobs Section */}
      {recommendedJobs.length > 0 && (
        <div className="p-6 bg-gray-100 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Recommended Jobs for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedJobs.map((recJob) => (
              <div
                key={recJob.id}
                className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
                onClick={() => {
                  window.location.href = `/jobs/${recJob.id}`;
                }}
              >
                <h3 className="text-xl font-semibold">{recJob.title}</h3>
                <p className="text-gray-600">{recJob.location}</p>
                <p className="text-gray-800 font-bold">${recJob.salary}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
