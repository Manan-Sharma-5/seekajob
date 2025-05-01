"use client";
import { useEffect, useState } from "react";
import { ApplicantDetailsService } from "@/services/JobServices";
import { useRouter } from "next/navigation";

// src/types/application.ts

export interface Job {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  companyID: string;
  company: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  experience: string;
  location: string;
  salary: number;
  recruiterId: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  resume: string;
  is_candidate: boolean;
}

export interface ApplicationDetail {
  id: string;
  jobID: string;
  userID: string;
  job: Job;
  user: User;
  name: string;
  email: string;
  resume: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const ApplicationDetailPage = (props: { params: { applicantID: string } }) => {
  const { applicantID } = props.params;
  const [application, setApplication] = useState<ApplicationDetail | null>(
    null
  );

  const getApplicationDetail = async (applicationID: string) => {
    try {
      const response = await ApplicantDetailsService(applicationID);
      setApplication(response);
    } catch (error) {
      console.error("Error fetching application details:", error);
    }
  };

  useEffect(() => {
    if (applicantID) {
      getApplicationDetail(applicantID as string);
    }
  }, [applicantID]);

  if (!application) return <p>Loading application details...</p>;

  return (
    <div className="min-h-screen p-10 flex flex-row justify-between relative">
      <div className="p-10 flex flex-col gap-4 w-[40%]">
        {/* Job Details */}
        <h1 className="text-3xl font-bold">
          Job Title:{" "}
          <span className="font-normal">{application.job.title}</span>
        </h1>
        <p className="text-lg font-normal">
          {application.job.detailedDescription}
        </p>
        <h2 className="text-2xl font-bold">
          Company:{" "}
          <span className="font-normal">{application.job.company.name}</span>
        </h2>
        <h2 className="text-2xl font-bold">
          Location:{" "}
          <span className="font-normal">{application.job.location}</span>
        </h2>
        <h2 className="text-2xl font-bold">
          Salary: <span className="font-normal">${application.job.salary}</span>
        </h2>
        <h2 className="text-2xl font-bold">
          Experience Required:{" "}
          <span className="font-normal">{application.job.experience}</span>
        </h2>

        {/* Applicant Details */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold">Applicant Details:</h2>
          <p>
            <strong>Name:</strong> {application.user.name}
          </p>
          <p>
            <strong>Email:</strong> {application.user.email}
          </p>
          <p>
            <strong>Status:</strong> {application.status}
          </p>
          <p>
            <strong>Resume:</strong>{" "}
            {application.user.resume || "No resume uploaded"}
          </p>
        </div>
      </div>
      <div className="sticky top-0 ml-auto w-1/3">
        <div className="p-4 bg-white shadow-md">
          <h2 className="text-2xl font-bold mb-4">Application Info</h2>
          <p>
            <strong>Application Status:</strong> {application.status}
          </p>
          <p>
            <strong>Applied At:</strong>{" "}
            {new Date(application.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailPage;
