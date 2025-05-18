import React from 'react';

export default function TopLeft() {
  return (
    <div className="relative p-8">
      <div className="mb-6">
        <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">Secure Environment</h3>
      <p className="text-gray-700 text-center">
        Our models run in a Trusted Execution Environment (TEE), 
        ensuring your data and the model itself remain protected 
        during inference and training.
      </p>
    </div>
  );
} 