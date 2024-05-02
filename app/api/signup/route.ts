import { NextRequest, NextResponse } from "next/server";
import db from "../../../db/databaseController";

interface User {
  email: string;
  password: string;
  role: string;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password, role } = body;
  console.log(email);

  if (!email || !password) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 400 }
    );
  }

  if (role !== "recruiter" && role !== "candidate") {
    return NextResponse.json({ error: "Invalid Role" }, { status: 400 });
  }

  if (role === "recruiter") {
    try {
      if (await db.recruiter.findFirst({ where: { email: email } })) {
        return NextResponse.json(
          { error: "User already exists" },
          { status: 400 }
        );
      }

      await db.recruiter.create({
        data: {
          email: email,
          password: password,
          name: "Recruiter",
        },
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  if (role === "candidate") {
    try {
      if (await db.candidate.findFirst({ where: { email: email } })) {
        return NextResponse.json(
          { error: "User already exists" },
          { status: 400 }
        );
      }

      await db.candidate.create({
        data: {
          email: email,
          password: password,
          name: "Candidate",
        },
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ message: "User created successfully" });
}
