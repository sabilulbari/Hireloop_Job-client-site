import React from "react";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-gray-100 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Lock Icon / Visual */}
        <div className="flex justify-center">
          <div className="relative p-6 bg-gray-900 border border-gray-800 rounded-full shadow-xl animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-red-500">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
        </div>

        {/* Error Code & Message */}
        <div className="space-y-2">
          <h1 className="text-8xl font-extrabold tracking-widest text-gray-800 selection:bg-red-500 selection:text-white">401</h1>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Access Denied</h2>
          <p className="text-base text-gray-400 max-w-xs mx-auto">Hold up! You don't have permission to view this page. Please log in or check your credentials.</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-gray-300 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-700"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
