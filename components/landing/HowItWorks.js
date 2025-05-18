import React from 'react';
import TopLeft from '../howitworks/TopLeft';
import TopRight from '../howitworks/TopRight';
import BottomLeft from '../howitworks/BottomLeft';
import BottomRight from '../howitworks/BottomRight';

export default function HowItWorks() {
  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Introduction Section */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 text-gray-900">Secure ML Models at Your Fingertips</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Our machine learning models are secured in a Trusted Execution Environment (TEE), allowing you to access powerful AI with a simple API call. These models become more robust over time as they're collaboratively trained by our growing community of contributors.
          </p>
        </div>

        {/* Grid section with continuous lines */}
        <div className="relative">
          {/* Grid container with increased height to match width (square) */}
          <div className="relative w-full max-w-5xl aspect-square mx-auto">
            {/* Horizontal lines that extend beyond the container */}
            <div className="absolute top-0 w-[200vw] left-[-50vw] h-px bg-gray-300"></div>
            <div className="absolute top-1/2 w-[200vw] left-[-50vw] h-px bg-gray-300"></div>
            <div className="absolute bottom-0 w-[200vw] left-[-50vw] h-px bg-gray-300"></div>
            
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 w-px h-full bg-gray-300 transform -translate-x-1/2"></div>
            
            {/* Grid content - each rectangle with equal heights */}
            <div className="grid grid-cols-2 h-full">
              <TopLeft />
              <TopRight />
              <BottomLeft />
              <BottomRight />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 