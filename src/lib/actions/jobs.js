"use server";

import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const createJob = async (newJobData) => {
  const res = await fetch(`${baseUrl}/api/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newJobData),
  });

  return res.json();
};

export const getJobs = async () => {
  return serverFetch("/api/jobs");
};

export const getJobById = async (jobId) => {
  return serverFetch(`/api/jobs/${jobId}`);
};