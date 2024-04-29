import { NextRequest, NextResponse } from "next/server";
import db from "../../../db/databaseController";

interface User {
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;
  console.log(email);

  if (!email || !password) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 400 }
    );
  }

  await db.candidate.create({
    data: {
      name: "Alice",
      email,
      password,
    },
  });

  return NextResponse.redirect("/auth/login");
}
