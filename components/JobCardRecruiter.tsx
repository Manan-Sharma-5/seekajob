import Link from "next/link";
import { Button } from "./ui/button";
import { DeleteJobService } from "@/services/JobServices";

interface Job {
  id: number;
  title: string;
  description: string;
  salary: number;
  location: string;
  company: {
    id: number;
    name: string;
    description: string;
    location: string;
    logo: string;
  };
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
          Company:{" "}
          <span className="text-2xl font-normal">
            {" "}
            {job.company ? job.company.name : null}
          </span>
        </h2>
      </div>

      <div className="flex flex-row justify-between items-center">
        <Link href={`/recruiter/application-page/${job.id}`}>
          <Button variant={"outline"}>Check Status</Button>
        </Link>
        <Button
          variant={"outline"}
          onClick={async () => {
            await DeleteJobService(job.id.toString());
            window.location.reload();
          }}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}
