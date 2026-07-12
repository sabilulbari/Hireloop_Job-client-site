import { ShieldExclamation } from '@gravity-ui/icons';
import Link from 'next/link';
import React from 'react';

const AlreadyApplyPage = () => {
    return (
      <div>
        <div className="w-full min-h-[80vh] flex flex-col justify-center items-center text-white p-6">
          <div className="max-w-md w-full text-center p-8 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl">
            <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldExclamation className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-100 mb-2">Allredy Applyed</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">You can not apply after fist apply in this job ontime</p>
            <Link href="/jobs" className="inline-block w-full px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-sm font-medium transition">
              Go back
            </Link>
          </div>
        </div>
      </div>
    );
};

export default AlreadyApplyPage;