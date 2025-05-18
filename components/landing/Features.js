import React from 'react';

export default function Features() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need to train, optimize, and deploy your machine learning models</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 border border-gray-200 rounded-lg">
            <svg className="w-12 h-12 text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            <h3 className="text-xl font-bold mb-2">Advanced Analytics</h3>
            <p className="text-gray-600">Real-time performance metrics and model behavior insights with interactive dashboards.</p>
          </div>
          
          <div className="p-6 border border-gray-200 rounded-lg">
            <svg className="w-12 h-12 text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
            </svg>
            <h3 className="text-xl font-bold mb-2">Model Versioning</h3>
            <p className="text-gray-600">Track changes, compare performances, and roll back to previous versions with ease.</p>
          </div>
          
          <div className="p-6 border border-gray-200 rounded-lg">
            <svg className="w-12 h-12 text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            <h3 className="text-xl font-bold mb-2">Secure Infrastructure</h3>
            <p className="text-gray-600">Enterprise-grade security with encryption at rest and in transit for your data and models.</p>
          </div>
          
          <div className="p-6 border border-gray-200 rounded-lg">
            <svg className="w-12 h-12 text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
            </svg>
            <h3 className="text-xl font-bold mb-2">Data Integration</h3>
            <p className="text-gray-600">Seamless connections to popular data sources and warehouses with automated syncing.</p>
          </div>
          
          <div className="p-6 border border-gray-200 rounded-lg">
            <svg className="w-12 h-12 text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            <h3 className="text-xl font-bold mb-2">Automated Hyperparameter Tuning</h3>
            <p className="text-gray-600">Optimize your model performance with intelligent parameter search algorithms.</p>
          </div>
          
          <div className="p-6 border border-gray-200 rounded-lg">
            <svg className="w-12 h-12 text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
            </svg>
            <h3 className="text-xl font-bold mb-2">No-Code Interface</h3>
            <p className="text-gray-600">Build complex models without writing a single line of code using our intuitive visual interface.</p>
          </div>
        </div>
      </div>
    </section>
  );
} 