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

    const { resume } = body;

    if (!resume) {
      return NextResponse.json(
        { error: "Resume is required" },
        { status: 400 }
      );
    }

    const userId = session.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.role === "recruiter") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.candidate.findFirst({
      where: {
        id: userId || -1,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.candidate.update({
      where: {
        //@ts-ignore
        id: session.id,
      },
      data: {
        resume: resume,
      },
    });

    return NextResponse.json({ resume });
  } catch (error) {
    console.error("Error updating resume:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
