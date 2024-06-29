import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "../../../../db/databaseController";
import bcrypt from "bcrypt";

// Define the NextAuth options
const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "" },
        password: { label: "Password", type: "password", placeholder: "" },
        role: { label: "Role", type: "text", placeholder: "" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const { username, password, role } = credentials;

        if (
          !username ||
          !password ||
          (role !== "recruiter" && role !== "candidate")
        ) {
          console.log("Invalid credentials", credentials);
          return null;
        }

        try {
          const user = await (role === "recruiter"
            ? db.recruiter.findFirst({ where: { email: username } })
            : db.candidate.findFirst({ where: { email: username } }));

          console.log(user);
          if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
              return null;
            }
            console.log("User found", user);
            return {
              role,
              userID: user.id,
              email: user.email,
            };
          }
        } catch (error) {
          console.error(error);
          return null;
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        console.log("User found", user);
        // Add role and ID to the JWT token
        token.role = user.role;
        token.id = user.userID;
        token.name = user.name;
      }
      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      user: token,
    }),
    async redirect({ url, baseUrl }) {
      // Redirect to the /jobs page after successful sign-in
      // Allow relative callback URLs
      if (url.startsWith("/")) {
        return url;
      }
      return baseUrl;
    },
  },
};

// Export the handlers for GET and POST requests
export const GET = NextAuth(options);
export const POST = NextAuth(options);
