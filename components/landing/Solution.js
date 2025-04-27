import React from 'react';

export default function Solution() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Solution</h2>
        
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-xl md:text-2xl mb-8 text-gray-700">
              Imagine a world where individuals, organizations, and companies pool their compute and expertise to train a single, shared AI model.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 shadow-md">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Open-Source Models</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Governed by a DAO: participants propose, vote on, and decide which models to train.</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Contributors earn DAO tokens to influence roadmap decisions.</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 shadow-md">
              <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Closed-Source Models</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Clients list their proprietary models and datasets.</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Community helps train them in exchange for DAO coins or monetary rewards.</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 text-center pt-6 border-t border-gray-200">
            <p className="text-lg text-gray-700">
              All compute and model orchestration happens via smart contracts on-chain, ensuring transparency, fairness, and automation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 