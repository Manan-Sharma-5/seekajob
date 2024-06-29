import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default withAuth(
  async (req: NextRequest) => {
    // Authorization logic
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    if (
      token.role !== "recruiter" &&
      req.nextUrl.pathname.startsWith("/recruiter")
    ) {
      return NextResponse.redirect(new URL("/jobs", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Authorization logic
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/jobs", "/jobs/:id*", "/recruiter/:path*"],
};
