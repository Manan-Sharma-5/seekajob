import { NextRequest, NextResponse } from "next/server";
import db from "../../../db/databaseController";

interface Job {
  title: string;
  description: string;
  salary: number;
  location: string;
  detailedDescription: string;
  company: string;
  experience: string;
}

export default async function POST(request: NextRequest) {
  const reqBody = await request.json();

  const {
    jobID,
    title,
    description,
    salary,
    location,
    detailedDescription,
    company,
    experience,
  } = reqBody;

  try {
    await db.job.create({
      data: {
        description: description,
        detailedDescription: detailedDescription,
        experience: experience,
        id: jobID,
        location: location,
        salary: salary,
        title: title,
        recruiter: {
          connect: {
            id: company,
          },
        },
      },
    });

    return NextResponse.json({ message: "Job created successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
