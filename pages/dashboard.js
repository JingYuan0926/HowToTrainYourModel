import React from 'react';
import { WarpBackground } from "@/components/magicui/warp-background";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white">
        <div className="container mx-auto px-6 py-24">
          <h1 className="text-4xl font-bold mb-8 text-black">Documents</h1>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
            <p className="text-gray-600 mb-4">
              Welcome to the documents page. Here you can find all the necessary documentation and resources.
            </p>
            {/* Add your document content here */}
          </div>
        </div>
    </div>
  );
} 