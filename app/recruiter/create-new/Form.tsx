"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signIn } from "next-auth/react";
import axios from "axios";
import {
  JobCreateService,
  JobDetailsApplyService,
} from "@/services/JobServices";

interface Company {
  id: number;
  name: string;
}

interface Job {
  jobTitle: string;
  company: string;
  jobDescription: string;
  jobLongDescription: string;
  jobLocation: string;
  jobType: string;
  jobCategory: string;
  jobSalary: number;
  jobExperience: string;
}

export default function Form() {
  const companies = [
    {
      id: 1,
      name: "Company 1",
    },
    {
      id: 2,
      name: "Company 2",
    },
    {
      id: 3,
      name: "Company 3",
    },
    {
      id: 4,
      name: "Company 4",
    },
  ];

  const [companyInput, setCompanyInput] = React.useState("");
  const [filteredCompanies, setFilteredCompanies] = React.useState(companies);
  const [selectedCompany, setSelectedCompany] = React.useState({} as Company);

  const [job, setJob] = React.useState<Job>({
    jobTitle: "",
    company: "",
    jobDescription: "",
    jobLongDescription: "",
    jobLocation: "",
    jobType: "",
    jobCategory: "",
    jobSalary: 0,
    jobExperience: "",
  });

  const handleCompanyInputChange = (e: any) => {
    const value = e.target.value;
    setCompanyInput(value);
    const filtered = companies.filter((company) =>
      company.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCompanies(filtered);
    setJob({ ...job, company: value });
  };

  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company);
    setCompanyInput(company.name);
    setFilteredCompanies([]);
  };

  return (
    <div className="grid gap-4 w-[100%]">
      <div className="grid gap-2 w-[100%]">
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          name="company"
          type="text"
          placeholder="Enter the company name"
          value={companyInput}
          onChange={handleCompanyInputChange}
          required
          style={{
            borderColor: "#000",
          }}
        />
        {filteredCompanies.length > 0 && companyInput !== "" && (
          <div
            style={{
              border: "1px solid #000",
              borderRadius: "4px",
              marginTop: "8px",
              maxHeight: "150px",
              overflowY: "auto",
            }}
          >
            {filteredCompanies.map((company) => (
              <div
                key={company.id}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  backgroundColor:
                    selectedCompany && selectedCompany.id === company.id
                      ? "#e5e5e5"
                      : "#fff",
                }}
                onClick={() => handleCompanySelect(company)}
              >
                {company.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="grid gap-2 w-[100%]">
        <Label htmlFor="jobTitle">Job Title</Label>
        <Input
          id="jobTitle"
          name="jobTitle"
          type="text"
          placeholder="Enter the job title"
          required
          onChange={(e) => setJob({ ...job, jobTitle: e.target.value })}
          style={{
            borderColor: "#000",
          }}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="jobDescription">Job Description</Label>
        <Input
          id="jobDescription"
          name="jobDescription"
          type="text"
          placeholder="Enter the job description"
          required
          multiple
          style={{
            borderColor: "#000",
          }}
          onChange={(e) => setJob({ ...job, jobDescription: e.target.value })}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="jobLongDescription">Job Long Description</Label>
        <textarea
          id="jobLongDescription"
          name="jobLongDescription"
          required
          style={{
            borderWidth: "1px",
            borderColor: "#000",
            resize: "none",
            columns: 500,
            height: 200,
            padding: 10,
          }}
          onChange={(e) =>
            setJob({ ...job, jobLongDescription: e.target.value })
          }
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="jobLocation">Job Location</Label>
        <Input
          id="jobLocation"
          name="jobLocation"
          type="text"
          placeholder="Enter the job location"
          required
          style={{
            borderColor: "#000",
          }}
          onChange={(e) => setJob({ ...job, jobLocation: e.target.value })}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="jobType">Job Tags</Label>
        <Input
          id="jobType"
          name="jobType"
          type="text"
          placeholder="Enter the job tags"
          required
          onChange={(e) => setJob({ ...job, jobType: e.target.value })}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="jobCategory">Job Category</Label>
        <Input
          id="jobCategory"
          name="jobCategory"
          type="text"
          placeholder="Enter the job category"
          required
          onChange={(e) => setJob({ ...job, jobCategory: e.target.value })}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="jobSalary">Job Salary</Label>
        <Input
          id="jobSalary"
          name="jobSalary"
          type="text"
          placeholder="Enter the job salary"
          required
          onChange={(e) =>
            setJob({ ...job, jobSalary: Number(e.target.value) })
          }
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="jobExperience">Job Experience</Label>
        <Input
          id="jobExperience"
          name="jobExperience"
          type="text"
          placeholder="Enter the job experience"
          required
          onChange={(e) => setJob({ ...job, jobExperience: e.target.value })}
        />
      </div>

      <Button
        type="submit"
        variant={"outline"}
        className="w-full hover:bg-red-500 hover:text-white"
        onClick={async (e) => {
          e.preventDefault();
          await JobCreateService({
            title: job.jobTitle,
            company: job.company,
            description: job.jobDescription,
            detailedDescription: job.jobLongDescription,
            location: job.jobLocation,
            category: job.jobCategory,
            salary: job.jobSalary,
            experience: job.jobExperience,
            tags: [job.jobType],
          })
            .then((res) => {
              console.log(res);
              alert("Job posted successfully");
            })
            .catch((err) => {
              console.log(err);
              alert("Error posting the job");
            });
        }}
      >
        Create Job Posting
      </Button>
    </div>
  );
}
