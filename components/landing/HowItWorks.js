import React from 'react';

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50 relative">
      {/* Full-width Grid with continuous lines - positioned relative to the section */}
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Horizontal line - top */}
        <div className="absolute top-0 left-0 w-full h-px bg-gray-300"></div>
        
        {/* Horizontal line - center */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gray-300 transform -translate-y-1/2"></div>
        
        {/* Horizontal line - bottom */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gray-300"></div>
        
        {/* Vertical line */}
        <div className="absolute left-1/2 top-0 w-px h-full bg-gray-300 transform -translate-x-1/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Introduction Section */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 text-gray-900">Secure ML Models at Your Fingertips</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Our machine learning models are secured in a Trusted Execution Environment (TEE), allowing you to access powerful AI with a simple API call. These models become more robust over time as they're collaboratively trained by our growing community of contributors.
          </p>
        </div>

        {/* Grid content - each quadrant */}
        <div className="max-w-5xl mx-auto aspect-square">
          <div className="grid grid-cols-2 h-full">
            <div className="relative p-8">
              {/* Top-left content */}
            </div>
            <div className="relative p-8">
              {/* Top-right content */}
            </div>
            <div className="relative p-8">
              {/* Bottom-left content */}
            </div>
            <div className="relative p-8">
              {/* Bottom-right content */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 