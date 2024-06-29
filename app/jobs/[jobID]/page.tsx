import prisma from "@/db/databaseController";
import buttonApply from "./ButtonApply";
import ButtonApply from "./ButtonApply";

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

async function getJob(jobID: string): Promise<JobDetails> {
  const job = await prisma.job.findUnique({
    where: {
      id: jobID,
    },
  });
  if (!job) {
    throw new Error("Job not found");
  }
  return job;
}

export default async function JobPage(props: { params: { jobID: string } }) {
  let job;
  try {
    const jobID = props.params.jobID;
    job = await getJob(jobID);
  } catch (e) {
    job = null;
  }

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
        <div className="p-4 bg-white shadow-md">
          <p className="mb-4">
            To process the application, please click on the Apply button below.
          </p>
          {job ? <ButtonApply params={props.params} /> : null}
        </div>
      </div>
    </div>
  );
}
