import Link from "next/link";
import { Button } from "./ui/button";

interface Job {
  id: number;
  title: string;
  description: string;
  salary: number;
  location: string;
  type: string;
}

export default function JobComponent({ job }: { job: Job }) {
  return (
    <div className="flex flex-col border-[0.3px] border-black p-8 gap-3">
      <div>
        <h2 className="text-2xl font-bold">
          Job Title: <span className="text-2xl font-normal">{job.title}</span>
        </h2>
      </div>
      <div>
        <h2 className="text-2xl font-bold">
          Job Type: <span className="text-2xl font-normal">{job.type}</span>
        </h2>
      </div>
      <div>
        <h2 className="text-2xl font-bold">Job Description:</h2>
        <p>
          {job.description.length > 100
            ? job.description.substring(0, 100) + "..."
            : job.description}
        </p>
      </div>
      <div className="flex flex-row gap-10">
        <div>
          <h2 className="text-xl font-bold">
            Salary: <span className="text-xl font-normal">{job.salary}</span>
          </h2>
        </div>
        <div>
          <h2 className="text-xl font-bold">
            Location:{" "}
            <span className="text-xl font-normal">{job.location}</span>
          </h2>
        </div>
      </div>
      <div className="flex flex-row justify-end items-center">
        <Link href={`/jobs/${job.id}`}>
          <Button variant={"outline"}>Apply</Button>
        </Link>
      </div>
    </div>
  );
}
