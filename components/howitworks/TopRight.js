import React from 'react';

export default function TopRight() {
  return (
    <div className="relative p-8">
      <h3 className="text-2xl font-bold mb-4 text-gray-900">Simple API Access</h3>
      <p className="text-gray-700">
        Access state-of-the-art machine learning models with simple API calls,
        without worrying about infrastructure or scaling concerns.
      </p>
      <div className="mt-6">
        <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
      </div>
    </div>
  );
} 