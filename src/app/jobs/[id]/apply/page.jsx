import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';

const JobApplyPage = async ({params}) => {


    const {id} = await params
    const user =await getUserSession()

    console.log(id, user)

    if(!user){
        redirect(`/auth/signin?redirect=/jobs/${id}/apply`)
    }

    return (
        <div>
            <p>Here is job apply page</p>
        </div>
    );
};

export default JobApplyPage;