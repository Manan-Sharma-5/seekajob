import { NextRequest, NextResponse } from "next/server";
import db from "../../../../db/databaseController";

type Params = {
  jobID: string;
};

export async function GET(request: Request, context: { params: Params }) {
  const jobID = context.params.jobID;
  const job = await db.job.findUnique({
    where: {
      id: jobID,
    },
  });
  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }
  const company = await db.company.findUnique({
    where: {
      id: job.companyID,
    },
  });

  if (!company) {
    return NextResponse.json({ error: "Company not found" }, { status: 404 });
  }

  job.companyID = company.name;

  return NextResponse.json(job);
}
