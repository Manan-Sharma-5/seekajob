import Link from "next/link";
import { Button } from "./ui/button";

interface Job {
  id: number;
  title: string;
  description: string;
  salary: number;
  location: string;
  company: string;
  type: string;
}

export default function JobCardRecruiter({ job }: { job: Job }) {
  return (
    <div className="flex flex-col border-[0.3px] border-black p-8 gap-3 ">
      <div>
        <h2 className="text-2xl font-bold">
          Job ID: <span className="text-2xl font-normal">{job.id}</span>
        </h2>
      </div>
      <div>
        <h2 className="text-2xl font-bold">
          Job Title: <span className="text-2xl font-normal">{job.title}</span>
        </h2>
      </div>
      <div>
        <h2 className="text-2xl font-bold">
          Company: <span className="text-2xl font-normal">{job.company}</span>
        </h2>
      </div>

      <div className="flex flex-row justify-between items-center">
        <Link href={`/jobs/${job.id}`}>
          <Button variant={"outline"}>Check Status</Button>
        </Link>
        <Link href={`/jobs/${job.id}`}>
          <Button variant={"outline"}>Remove</Button>
        </Link>
      </div>
    </div>
  );
}
