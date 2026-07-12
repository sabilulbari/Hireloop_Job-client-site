import { getUserSession } from "@/lib/core/session";
import { ShieldExclamation } from "@gravity-ui/icons";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import JobApply from "./JobApply";
import { getJobById } from "@/lib/actions/jobs";
import { getApplicationById } from "@/lib/actions/application";
import { getApplicationByIdAndJobId } from "@/lib/actions/application";
import AlreadyApplyPage from "@/components/applications/AlreadyApplyPage";
import { getPlanById } from "@/lib/api/plans";

const JobApplyPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();

  console.log(user?.plan, "user plan data");

  if (user?.role != "seeker") {
    return (
      <div className="w-full min-h-[80vh] flex flex-col justify-center items-center text-white p-6">
        <div className="max-w-md w-full text-center p-8 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl">
          <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldExclamation className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Access Restricted</h3>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">Only job seekers can apply for positions. Please sign in with a seeker account to proceed.</p>
          <Link href="/auth/signin" className="inline-block w-full px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-sm font-medium transition">
            Switch Account
          </Link>
        </div>
      </div>
    );
  }
  if (!user) {
    redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
  }

  const job = await getJobById(id);

  const applicanData = await getApplicationById(user?.id);
  const applicationDataJobIdUserId = await getApplicationByIdAndJobId(user?.id, id);

  const plan = await getPlanById(user?.plan);

  console.log(plan, "plan data");

  if (applicanData.length >= plan.maxApplications) {
    return (
      <div className="w-full min-h-[80vh] flex flex-col justify-center items-center text-white p-6">
        <div className="max-w-md w-full text-center p-8 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl">
          <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldExclamation className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Max limit reached</h3>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">Please purchase more plans to apply for more jobs. </p>
          <div className="flex gap-2 justify-center">
            <Link href="/jobs" className="inline-block px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-sm font-medium transition">
              Go back
            </Link>
            <Link href="/plans" className="inline-block px-4 py-2.5 bg-white hover:bg-white/70 hover:text-black/70 text-black rounded-lg text-sm font-medium transition">
              Purchase Plan
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full flex flex-col justify-center items-center text-white p-3">
        <div className="max-w-md w-full text-center p-5 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl">
          <h3 className="text-xl font-bold text-zinc-100 mb-4">
            You have applied so far: <span className="text-blue-500">{applicanData.length}</span> out of <span className="text-blue-500">{plan.maxApplications}</span> Jobs
          </h3>

          {/* Progress Bar Container */}
          <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden border border-zinc-700">
            <div
              className="bg-blue-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${Math.min(100, Math.max(0, (applicanData.length / (plan.maxApplications || 1)) * 100))}%`,
              }}
            />
          </div>

          {/* Optional Percentage Indicator */}
          <div className="text-right text-xs text-zinc-400 mt-1">{Math.round(Math.min(100, (applicanData.length / (plan.maxApplications || 1)) * 100))}% completed</div>
        </div>
      </div>
      {applicationDataJobIdUserId?.jobId ? (
        <>
          <AlreadyApplyPage />
        </>
      ) : (
        <JobApply applicant={user} job={job}></JobApply>
      )}
    </div>
  );
};

export default JobApplyPage;
