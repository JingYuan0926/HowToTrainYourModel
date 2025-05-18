import React from 'react';

export default function BottomLeft() {
  return (
    <div className="relative p-8">
      <h3 className="text-2xl font-bold mb-4 text-gray-900">Collaborative Training</h3>
      <p className="text-gray-700">
        Our models continuously improve through collaborative training on diverse datasets, 
        contributed by our community while maintaining privacy and security.
      </p>
      <div className="mt-6">
        <div className="h-20 w-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
      </div>
    </div>
  );
} 