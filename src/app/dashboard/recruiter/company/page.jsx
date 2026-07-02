import React from "react";
import { getUserSession } from "@/lib/core/session";
import CompanyProfile from "./CompanyProfile";
import { getRecruiterCompany } from "@/lib/api/companies";

const CompanyPage = async () => {
  const user = await getUserSession();
  const company = await getRecruiterCompany(user?.id);

  return (
    <div>
      <CompanyProfile recruiter={user} recruiterCompany={company}></CompanyProfile>
    </div>
  );
};

export default CompanyPage;
