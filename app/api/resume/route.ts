import { NextRequest, NextResponse } from "next/server";
import { s3 } from "../../../utils/AwsConfig";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Generate a pre-signed URL for upload with a 15-minute expiration
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: token.id + "/resume.pdf",
      Expires: 900, // 15 minutes (in seconds)
    };

    const uploadUrl = await s3.getSignedUrlPromise("putObject", params);

    return NextResponse.json({ uploadUrl });
  } catch (error) {
    console.error("Error generating pre-signed URL:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Generate a pre-signed URL for download with a 15-minute expiration
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: token.id + "/resume.pdf",
      Expires: 900, // 15 minutes (in seconds)
    };

    const downloadUrl = await s3.getSignedUrlPromise("getObject", params);

    return NextResponse.json({ downloadUrl });
  } catch (error) {
    console.error("Error generating pre-signed URL:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
