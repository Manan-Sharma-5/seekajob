import { useRouter } from "next/router";

interface JobDetails {
  jobID: string;
  title: string;
  description: string;
  salary: number;
  location: string;
  detailedDescription: string;
  company: string;
  experience: string;
}

const jobs: JobDetails = {
  jobID: "1",
  title: "Software Engineer",
  description:
    "We are looking for a passionate Software Engineer to design, develop and install software solutions. The successful candidate will be able to build high-quality, innovative and fully performing software in compliance with coding standards and technical design.",
  salary: 100000,
  location: "San Francisco",
  detailedDescription: "Software Engineer",
  company: "Google",
  experience: "5 years",
};

export default function JobPage(props: { params: string }) {
  const jobID = props.params;
  return (
    <div className="min-h-screen p-10">
      <div className="p-10 flex flex-col gap-4 w-[40%]">
        <h1 className="text-3xl font-bold">
          Company Name: <span className="font-normal">{jobs.company}</span>
        </h1>
        <h2 className="text-2xl font-bold">
          Job Title: <span className="font-normal">{jobs.title}</span>
        </h2>
        <p className="text-lg font-normal">{jobs.description}</p>
        <h2 className="text-2xl font-bold">
          Salary: <span className="font-normal">${jobs.salary}</span>
        </h2>
        <h2 className="text-2xl font-bold">
          Location: <span className="font-normal">{jobs.location}</span>
        </h2>
        <h2 className="text-2xl font-bold">
          Experience: <span className="font-normal">{jobs.experience}</span>
        </h2>
      </div>
    </div>
  );
}
