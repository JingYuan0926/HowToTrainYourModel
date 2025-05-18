import React from 'react';

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Introduction Section */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 text-gray-900">Secure ML Models at Your Fingertips</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Our machine learning models are secured in a Trusted Execution Environment (TEE), allowing you to access powerful AI with a simple API call. These models become more robust over time as they're collaboratively trained by our growing community of contributors.
          </p>
        </div>

        {/* Simple 2x2 Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 gap-6">
            {/* Top-left square */}
            <div className="aspect-square border border-gray-300 rounded-lg bg-white"></div>
            
            {/* Top-right square */}
            <div className="aspect-square border border-gray-300 rounded-lg bg-white"></div>
            
            {/* Bottom-left square */}
            <div className="aspect-square border border-gray-300 rounded-lg bg-white"></div>
            
            {/* Bottom-right square */}
            <div className="aspect-square border border-gray-300 rounded-lg bg-white"></div>
          </div>
        </div>
      </div>
    </section>
  );
} 