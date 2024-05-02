import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "../../../../db/databaseController";
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "email", type: "text", placeholder: "" },
        password: { label: "password", type: "password", placeholder: "" },
        role: { label: "role", type: "text", placeholder: "" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        if (!credentials.username || !credentials.password) {
          return null;
        }
        if (
          credentials.role !== "recruiter" &&
          credentials.role !== "candidate"
        ) {
          return null;
        }
        const { username, password, role } = credentials;

        if (role === "recruiter") {
          try {
            const user = await db.recruiter.findFirst({
              where: { email: username },
            });
            if (user) {
              return {
                id: user.id,
                email: user.email,
                role: "recruiter",
              };
            }
          } catch (error) {
            console.error(error);
          }
        }
        if (role === "candidate") {
          try {
            const user = await db.candidate.findFirst({
              where: { email: username },
            });
            if (user) {
              return {
                id: user.id,
                email: user.email,
                role: "candidate",
              };
            }
          } catch (error) {
            console.error(error);
          }
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
});

export { handler as GET, handler as POST };
