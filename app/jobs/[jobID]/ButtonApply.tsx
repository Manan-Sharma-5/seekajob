"use client";

import axios from "axios";
import { Button } from "@/components/ui/button";

const applyJob = async (jobID: string) => {
  try {
    console.log("jobID", jobID);
    const res = await axios.post("/api/apply-job", {
      jobId: jobID,
    });
    alert("Applied for job successfully");
  } catch (e) {
    console.error("Error applying for job:", e);
    alert("Error applying for job");
  }
};

export default function ButtonApply(props: { params: { jobID: string } }) {
  return (
    <Button
      className="hover:bg-black hover:text-white bg-white text-black border-2 border-black w-full"
      onClick={async () => {
        await applyJob(props.params.jobID);
      }}
    >
      Apply
    </Button>
  );
}
