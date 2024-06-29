import prisma from "@/db/databaseController";
import { cache } from "react";

export const getJobs = async () => {
  const jobs = await prisma.job.findMany();
  return jobs;
};
