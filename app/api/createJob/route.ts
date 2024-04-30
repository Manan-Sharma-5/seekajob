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

  const job: Job = {
    title,
    description,
    salary,
    location,
    detailedDescription,
    company,
    experience,
  };

  try {
    return NextResponse.ok({ message: "Job created successfully" });
  } catch (error) {
    return NextResponse.error({ message: "Error creating job" });
  }
}
