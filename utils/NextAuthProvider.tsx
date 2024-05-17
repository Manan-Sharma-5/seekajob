"use client";
import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function NextAuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div>
        <p>You need to sign in to view this page.</p>
      </div>
    );
  }
  return <SessionProvider>{children}</SessionProvider>;
}
