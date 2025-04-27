"use client";
import {
  AllApplicantsService,
  JobDetailsFetchService,
} from "@/services/JobServices";
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
}

interface Applicant {
  id: string;
  jobID: string;
  userID: string;
  name: string;
  email: string;
  resume: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function JobPage(props: { params: { jobID: string } }) {
  const { jobID } = props.params;
  const [job, setJob] = useState<JobDetails | null>(null);
  const [applicants, setApplicants] = useState<Applicant[]>([]);

  const setApplicantsList = async (jobID: string) => {
    try {
      const response = await AllApplicantsService(jobID);
      setApplicants(response);
    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };

  useEffect(() => {
    const fetchApplicants = async () => {
      await setApplicantsList(jobID);
    };
    fetchApplicants();
  }, [jobID]);

  const getJob = async (jobID: string): Promise<JobDetails | null> => {
    try {
      const job = await JobDetailsFetchService(jobID);
      if (job) {
        setJob(job);
        return job;
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
      const jobDetails = await getJob(jobID);
      if (jobDetails) {
        setJob(jobDetails);
      }
    };
    fetchJob();
  }, [jobID]);

  return (
    <div className="min-h-screen p-10 flex flex-row justify-between relative">
      <div className="p-10 flex flex-col gap-4 w-[40%]">
        {job ? (
          <>
            <h1 className="text-3xl font-bold">
              Company Name: <span className="font-normal">{job.companyID}</span>
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
              Experience: <span className="font-normal">{job.experience}</span>
            </h2>
          </>
        ) : (
          <h1 className="text-3xl font-bold">Job not found</h1>
        )}
      </div>
      <div className="sticky top-0 ml-auto w-1/3">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Applicants:</h2>
          {applicants.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {applicants.map((applicant) => (
                <li
                  key={applicant.id}
                  className="p-2 border rounded-md shadow-sm"
                >
                  <p>
                    <span className="font-semibold">Name:</span>{" "}
                    {applicant.name}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {applicant.email}
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    {applicant.status}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No applicants yet for this job.</p>
          )}
        </div>
      </div>
    </div>
  );
}
