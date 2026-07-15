import ApplicationStates from '@/components/applications/applicationStates';
import ApplicationsTablePage from '@/components/applications/ApplicationTablePage';
import { getApplicationById } from '@/lib/actions/application';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const SeekerApplicationPage = async() => {

    const user = await getUserSession()
    const allApplications = await getApplicationById(user?.id)

    return (
        <div>
            <h1>here is all application page, {allApplications.length} applications found</h1>
            <ApplicationStates/>
            <ApplicationsTablePage jobs={allApplications} />
        </div>
    );
};

export default SeekerApplicationPage;