import axios from "axios";
import { BaseServiceURL } from "./BaseURL";

interface CreateJobRequest {
  title: string;
  description: string;
  detailedDescription: string;
  experience: string;
  location: string;
  salary: number;
  category: string;
  tags: string[];
  company: string;
}

export const JobsFetchService = async () => {
  try {
    const response = await BaseServiceURL.get("/job/");
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  } catch (error) {
    console.error("Error during sign up:", error);
    throw error;
  }
};

export const JobDetailsFetchService = async (jobID: string) => {
  try {
    const response = await BaseServiceURL.get(`/job/${jobID}`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  } catch (error) {
    console.error("Error during sign up:", error);
    throw error;
  }
};

export const JobDetailsApplyService = async (jobID: string) => {
  try {
    const response = await BaseServiceURL.post(`/apply/job`, {
      job_id: jobID,
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  } catch (error) {
    console.error("Error during sign up:", error);
    throw error;
  }
};

export const JobDetailsRecruiterService = async () => {
  try {
    const response = await BaseServiceURL.get(`/job/recruiter-jobs`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  } catch (error) {
    console.error("Error during sign up:", error);
    throw error;
  }
};

export const JobCreateService = async (data: CreateJobRequest) => {
  try {
    const response = await BaseServiceURL.post(`/job`, data, {
      validateStatus: (status) => status >= 200 && status < 400, // Accept 2xx and 3xx
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error during job creation:",
      error?.response?.data || error.message
    );
    throw error;
  }
};

export const AllApplicantsService = async (jobID: string) => {
  try {
    const response = await BaseServiceURL.get(`/job/applicants/${jobID}`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  } catch (error) {
    console.error("Error during sign up:", error);
    throw error;
  }
};

export const ApplicantDetailsService = async (applicationID: string) => {
  try {
    const response = await BaseServiceURL.get(
      `/job/applicant/${applicationID}`
    );
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  } catch (error) {
    console.error("Error during sign up:", error);
    throw error;
  }
};

export const DeleteJobService = async (jobID: string) => {
  try {
    const response = await BaseServiceURL.delete(`/job/${jobID}`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  } catch (error) {
    console.error("Error during sign up:", error);
    throw error;
  }
};

export const SearchJobService = async (
  query: string,
  salary?: string,
  location?: string,
  tags?: string
) => {
  try {
    let url = `/job/search?query=${encodeURIComponent(query)}`;

    if (salary) {
      url += `&salary=${encodeURIComponent(salary)}`;
    }
    if (location) {
      url += `&location=${encodeURIComponent(location)}`;
    }
    if (tags) {
      url += `&tags=${encodeURIComponent(tags)}`;
    }

    const response = await BaseServiceURL.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return null;
  }
};

export const UploadResumeService = (file: File) => {
  const formData = new FormData();
  formData.append("resume", file);

  return BaseServiceURL.post("auth/upload-resume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
