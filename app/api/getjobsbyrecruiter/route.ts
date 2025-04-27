import { NextRequest, NextResponse } from "next/server";
import db from "../../../db/databaseController";
import { getToken } from "next-auth/jwt";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const token = await getToken({ req: request });
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (token.role !== "recruiter") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    console.log(token);

    const jobs = await db.job.findMany({
      where: {
        recruiterId: token?.id || "",
      },
    });

    const jobsWithCompany = await Promise.all(
      jobs.map(async (job) => {
        const company = await db.company.findUnique({
          where: {
            id: job.companyID,
          },
        });
        return { ...job, company: company?.name };
      })
    );

    return NextResponse.json(jobsWithCompany, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
