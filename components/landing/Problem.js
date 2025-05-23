import React from 'react';

export default function Problem() {
  return (
    <section className="w-full h-[100vh] flex flex-col justify-center items-center bg-gray-50 border-b border-gray-200 snap-start">
      <div className="container px-6 py-16 md:py-24 flex flex-col justify-center h-full">
        <div className="max-w-3xl mx-auto w-full">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">The Problem</h2>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <p className="text-xl mb-6 font-medium text-gray-700">
              The AI space today is highly fragmented:
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mt-1">
                  <svg className="h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-3 text-lg text-gray-600">
                  Major players (OpenAI, NVIDIA, Google, Microsoft) build models in silos.
                </p>
              </li>
              
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mt-1">
                  <svg className="h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-3 text-lg text-gray-600">
                  Barriers to collaboration slow down progress.
                </p>
              </li>
              
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mt-1">
                  <svg className="h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-3 text-lg text-gray-600">
                  Training state-of-the-art models demands massive (and expensive) GPU resources.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
} 