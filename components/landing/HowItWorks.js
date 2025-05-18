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

        {/* Original How It Works Content */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Our simple 3-step process to train and deploy your machine learning models</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
            <h3 className="text-2xl font-semibold mb-3">Upload Your Data</h3>
            <p className="text-gray-600">Easily upload your training data through our intuitive interface or connect directly to your data warehouse.</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
            <h3 className="text-2xl font-semibold mb-3">Configure Your Model</h3>
            <p className="text-gray-600">Select from our pre-built model architectures or customize your own with our no-code interface.</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
            <h3 className="text-2xl font-semibold mb-3">Deploy & Monitor</h3>
            <p className="text-gray-600">One-click deployment to our secure cloud infrastructure with real-time performance monitoring.</p>
          </div>
        </div>
      </div>
    </section>
  );
} 