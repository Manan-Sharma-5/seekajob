import JobComponent from "@/components/JobComponent";

export default function Jobs() {
  const jobs = [
    {
      id: 1,
      title: "Software Engineer",
      description:
        "We are looking for a passionate Software Engineer to design, develop and install software solutions. The successful candidate will be able to build high-quality, innovative and fully performing software in compliance with coding standards and technical design.",
      salary: 100000,
      location: "Remote",
      type: "Full-time",
    },
    {
      id: 2,
      title: "Frontend Developer",
      description:
        "We are looking for a passionate Frontend Developer to design, develop and install software solutions. The successful candidate will be able to build high-quality, innovative and fully performing software in compliance with coding standards and technical design.",
      salary: 100000,
      location: "Remote",
      type: "Full-time",
    },
    {
      id: 3,
      title: "Backend Developer",
      description:
        "We are looking for a passionate Backend Developer to design, develop and install software solutions. The successful candidate will be able to build high-quality, innovative and fully performing software in compliance with coding standards and technical design.",
      salary: 100000,
      location: "Remote",
      type: "Full-time",
    },
  ];

  return (
    <div>
      <div className="flex flex-row min-h-screen">
        <div className="w-[30%]"></div>
        <div className="w-[70%] p-12">
          <div className="flex flex-col gap-10">
            {jobs.map((job) => (
              <JobComponent key={job.id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
