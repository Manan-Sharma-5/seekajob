import { NextRequest, NextResponse } from "next/server";
import db from "../../../db/databaseController";

export async function GET(
  request: NextRequest,
  response: NextResponse,
  { id }: { id: string }
) {
  try {
    const job = await db.job.findUnique({
      where: {
        id: String(id),
      },
      include: {
        Company: true,
        recruiter: true,
      },
    });

    return NextResponse.json(job);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
