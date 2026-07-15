import { protectedFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getCompanyJobs = async (companyId, status = 'active') => {
    const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`);
    return res.json();
}

export const getRecruiterPostJobByCompanyId = async (companyId, status = 'active') => {
    return protectedFetch(`/api/recruiter/post/jobs?companyId=${companyId}&status=${status}`);
}