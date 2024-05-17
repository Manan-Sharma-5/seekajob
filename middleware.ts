import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  (req: NextRequest) => {
    // Check for specific user roles if needed
    // if (session && session.user && session.user.role !== "recruiter") {
    //   // Redirect unauthorized users
    //   url.pathname = "/unauthorized";
    //   return NextResponse.redirect(url);
    // }
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
  matcher: ["/jobs", "/jobs/:id*"],
};
