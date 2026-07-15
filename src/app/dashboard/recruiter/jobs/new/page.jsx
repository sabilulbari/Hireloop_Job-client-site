import PostJobPage from '@/components/jobs/PostJobPage';
import { getLoggedInRecruiterCompany } from '@/lib/api/companies';
import React from 'react';

const NewJobPage = async () => {

  const companyData = await getLoggedInRecruiterCompany()

  console.log(companyData, "company data in new job page");



  return (
    <>
      <PostJobPage companyData={companyData}></PostJobPage>
    </>
  );
};

export default NewJobPage;