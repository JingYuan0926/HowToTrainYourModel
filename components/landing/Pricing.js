import React from 'react';

export default function Pricing() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Choose the plan that fits your needs, from startups to enterprise solutions</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Starter Plan */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <div className="text-gray-600 mb-6">Perfect for individuals and small projects</div>
              <div className="text-4xl font-bold mb-6">$49<span className="text-lg text-gray-600">/month</span></div>
              
              <ul className="text-left mb-8">
                <li className="mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  5 models
                </li>
                <li className="mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  100k predictions/month
                </li>
                <li className="mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  5GB storage
                </li>
                <li className="mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Email support
                </li>
              </ul>
              
              <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition">Get Started</button>
            </div>
          </div>
          
          {/* Pro Plan */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-blue-500 transform scale-105">
            <div className="p-8 text-center">
              <div className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-3">MOST POPULAR</div>
              <h3 className="text-2xl font-bold mb-2">Professional</h3>
              <div className="text-gray-600 mb-6">For teams and growing businesses</div>
              <div className="text-4xl font-bold mb-6">$199<span className="text-lg text-gray-600">/month</span></div>
              
              <ul className="text-left mb-8">
                <li className="mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  25 models
                </li>
                <li className="mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  1M predictions/month
                </li>
                <li className="mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  50GB storage
                </li>
                <li className="mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Priority support
                </li>
                <li className="mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Advanced analytics
                </li>
              </ul>
              
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">Get Started</button>
            </div>
          </div>
          
          {/* Enterprise Plan */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <div className="text-gray-600 mb-6">For large organizations with advanced needs</div>
              <div className="text-4xl font-bold mb-6">Custom</div>
              
              <ul className="text-left mb-8">
                <li className="mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Unlimited models
                </li>
                <li className="mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Custom prediction volume
                </li>
                <li className="mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Dedicated infrastructure
                </li>
                <li className="mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  24/7 premium support
                </li>
                <li className="mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Custom integrations
                </li>
              </ul>
              
              <button className="w-full bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition">Contact Sales</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 