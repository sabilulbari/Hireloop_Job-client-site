import PostJobPage from '@/components/jobs/PostJobPage';
import { getLoggedInRecruiterCompany } from '@/lib/api/companies';
import React from 'react';

const NewJobPage = async () => {

  const companyData = await getLoggedInRecruiterCompany()



  return (
    <>
      <PostJobPage companyData={companyData}></PostJobPage>
    </>
  );
};

export default NewJobPage;