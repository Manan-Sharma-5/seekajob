import { NextRequest, NextResponse } from "next/server";
import db from "../../../db/databaseController";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";

interface Job {
  title: string;
  description: string;
  salary: number;
  location: string;
  detailedDescription: string;
  company: string;
  experience: string;
}

export async function POST(request: NextRequest, response: NextResponse) {
  // Get the user session
  const session = await getToken({ req: request });
  console.log(session);

  // If user session doesn't exist or user is not authenticated, return unauthorized
  if (!session || !session.id || session.name !== "recruiter") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Extract user ID from the session

  // Get job data from the request body
  const reqBody = await request.json();

  const {
    title,
    description,
    salary,
    location,
    detailedDescription,
    company,
    experience,
  } = reqBody as Job;

  try {
    // Create the job and connect it to the recruiter using the user ID

    var companyID;

    const findCompany = await db.company.findFirst({
      where: {
        name: company,
      },
    });
    if (findCompany) {
      companyID = findCompany.id;
    }

    if (!findCompany) {
      const createCompany = await db.company.create({
        data: {
          name: company,
        },
      });
      companyID = createCompany.id;
    }

    if (
      !title ||
      !description ||
      !salary ||
      !location ||
      !detailedDescription ||
      !company ||
      !experience
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!companyID) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    await db.job.create({
      data: {
        description: description,
        detailedDescription: detailedDescription,
        experience: experience,
        location: location,
        salary: salary,
        title: title,
        companyID: companyID,
        recruiterId: session.id,
        category: "Engineering",
      },
    });

    return NextResponse.json({ message: "Job created successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
