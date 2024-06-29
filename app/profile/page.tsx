"use client";
import JobHeader from "@/components/JobHeader";
import { Button } from "@/components/ui/button";
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
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [resume, setResume] = useState("");
  const [resumePreview, setResumePreview] = useState<string | null>(null);

  const initUpload = async () => {
    try {
      const response = await axios.post("/api/resume");
      const uploadUrl = response.data.uploadUrl;
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".pdf";
      fileInput.click();
      fileInput.onchange = async () => {
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append("resume", file);

        // Create a preview URL
        const previewUrl = URL.createObjectURL(file);
        setResumePreview(previewUrl);

        await axios
          .put(uploadUrl, formData, {
            headers: {
              "Content-Type": "application/pdf",
            },
          })
          .then(async (response) => {
            setResume(file.name);
            await axios.post("/api/resume/update-profile", {
              resume,
            });
          });
      };
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get("/api/profile");
      setProfile(response.data.profile);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchResume = async () => {
    try {
      const response = await axios.get("/api/resume");
      setResume(response.data.downloadUrl);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchResume();
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
          <div>
            {appliedJobs.map((job) => (
              <div key={job.id}>
                <div className="text-xl font-bold text-gray-800 mt-4 ml-4">
                  {job.title}
                </div>
                <div className="text-xl font-bold text-gray-800 mt-4 ml-4">
                  {job.description}
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
