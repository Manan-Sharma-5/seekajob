"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import JobHeader from "@/components/JobHeader";
import { useSession } from "next-auth/react";
import RecruiterHeader from "@/components/RecruiterHeader";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isUserCandidate = localStorage.getItem("user");
  const userJSON = JSON.parse(isUserCandidate || "{}");
  const router = useRouter();
  console.log("userJSON", userJSON);

  if (userJSON.is_candidate) {
    router.push("/");
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <RecruiterHeader />
        {children}
      </body>
    </html>
  );
}
