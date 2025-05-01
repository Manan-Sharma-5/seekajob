"use client";
import JobHeader from "@/components/JobHeader";
import { Button } from "@/components/ui/button";
import { GetUserDetailsService } from "@/services/AuthServices";
import { UploadResumeService } from "@/services/JobServices";
import { getProfile } from "@/utils/GetProfile";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Profile {
  name: string;
  email: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<Profile>({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState<any[]>([]);
  const [resume, setResume] = useState("");
  const [resumePreview, setResumePreview] = useState<string | null>(null);

  const initUpload = async () => {
    try {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".pdf";
      fileInput.click();
      fileInput.onchange = async () => {
        const file = fileInput.files?.[0];
        if (!file) {
          console.log("No file selected");
          return;
        }

        const formData = new FormData();
        formData.append("resume", file);

        const previewUrl = URL.createObjectURL(file);
        setResumePreview(previewUrl);

        try {
          await UploadResumeService(file).then(async (response) => {
            setResume(file.name);
          });
        } catch (err) {
          console.error("Upload failed", err);
          setError(err.message);
        }
      };
    } catch (error) {
      console.error("Error uploading resume", error);
      setError(error.message);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await GetUserDetailsService();
      setProfile(response);
      setAppliedJobs(response.appliedJobs);
      const resumePath = response.resume;
      // this will have address as resumes/<userId>.pdf
      if (resumePath) {
        const resumeUrl = `http://localhost:8080/api/${resumePath}`;
        setResume(resumeUrl);
      }
      setLoading(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <JobHeader />
      <div className="text-2xl font-bold text-gray-800 mt-4 ml-4">
        Your Profile
        <div>
          <div className="text-xl font-bold text-gray-800 mt-4 ml-4">
            Name: {profile.name}
          </div>
          <div className="text-xl font-bold text-gray-800 mt-4 ml-4">
            Email: {profile.email}
          </div>
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-800 mt-4 ml-4 justify-center flex flex-col">
        Your Resume
        <div className="mt-4 ml-4 flex flex-row w-[100%] items-center gap-10">
          {resume.length > 0 ? (
            <Button
              onClick={() => window.open(resume, "_blank")}
              variant={"secondary"}
              className="border-2 border-black p-6 text-2xl"
            >
              Resume.pdf
            </Button>
          ) : (
            <div className="">No resume uploaded</div>
          )}
          <Button onClick={initUpload} variant={"outline"}>
            Upload Resume
          </Button>
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-800 mt-4 ml-4">
        Applied Jobs
        {appliedJobs.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-4">
            {appliedJobs.map((job) => (
              <div key={job.id} className="border-2 border-black p-4">
                <div className="text-xl font-bold text-gray-800 mt-4 ml-4">
                  Title: {job.title}
                </div>
                <div className="text-xl font-bold text-gray-800 mt-4 ml-4">
                  Description: {job.description}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-xl font-bold text-gray-800 mt-4 ml-4">
            No jobs applied
          </div>
        )}
      </div>
    </>
  );
}
