import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/db/databaseController";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const session = await getToken({ req, secret: process.env.JWT_SECRET });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { jobId } = body;
    if (!jobId) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }
    const userId = session.id;
    var user;
    if (session.role === "recruiter") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } else if (session.role === "candidate") {
      user = await prisma.candidate.findFirst({
        where: {
          id: userId,
        },
      });
      if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    //jobarray might be empty

    // const applied = await prisma.jobApplicant.findFirst({
    //   where: {
    //     jobID: jobId,
    //     userID: user.id,
    //   },
    // });

    // if (applied) {
    //   return NextResponse.json(
    //     { error: "You have already applied for this job" },
    //     { status: 400 }
    //   );
    // }

    await prisma.jobApplicant.create({
      data: {
        jobID: jobId,
        email: user.email,
        name: user.name,
        resume: user.resume,
        status: "applied",
        userID: user.id,
      },
    });

    return NextResponse.json({ success: "Applied for job successfully" });
  } catch (error) {
    console.error("Error applying for job:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
