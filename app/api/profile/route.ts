import { NextRequest, NextResponse } from "next/server";
import db from "../../../db/databaseController";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });
    console.log("token", token);
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let profile;
    if (token.role === "recruiter") {
      profile = await db.recruiter.findFirst({
        where: {
          email: token.email || "",
        },
      });
    } else if (token.role === "candidate") {
      profile = await db.candidate.findFirst({
        where: {
          email: token.email || "",
        },
      });
    }
    if (profile) {
      return NextResponse.json({ profile });
    } else {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
