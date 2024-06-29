import JobComponent from "@/components/JobComponent";
import { getJobs } from "@/utils/GetJob";

export default async function Page() {
  const jobs = await getJobs();

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
