import React from 'react';

export default function BottomRight() {
  return (
    <div className="relative p-8">
      <div className="mb-6">
        <div className="h-20 w-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">Continual Improvement</h3>
      <p className="text-gray-700 text-center">
        As more users contribute to training, our models become more robust and capable,
        providing increasingly accurate and reliable results over time.
      </p>
    </div>
  );
} 