"use server";

import { serverFetch, serverMutation } from "../core/server";


export const submitApplication = async (applicationData) => {
  return serverMutation("/api/applications", applicationData);
};

export const getApplicationById = async (userId) =>{
    return serverFetch(`/api/my/applications?applicantId=${userId}`);
};

export const getApplicationByIdAndJobId = async (userId, jobId) =>{
    return serverFetch(`/api/my/applications/jobId?applicantId=${userId}&jobId=${jobId}`);
};
