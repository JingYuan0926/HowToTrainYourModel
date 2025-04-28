import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-8 bg-gray-900 text-gray-300 border-t border-gray-800 snap-start">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-white">HowToTrainYourModel</h3>
            <p className="text-gray-400 text-sm">A platform for collaborative AI model training</p>
          </div>
          
          <div className="flex gap-8">
            <div>
              <h4 className="text-sm font-semibold mb-2 text-white">Resources</h4>
              <ul className="space-y-1 text-xs">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
                <li><a href="#" className="hover:text-white">Github</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-2 text-white">Community</h4>
              <ul className="space-y-1 text-xs">
                <li><a href="#" className="hover:text-white">Discord</a></li>
                <li><a href="#" className="hover:text-white">Twitter</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 text-center text-xs text-gray-400 border-t border-gray-800">
          <p>© 2025 HowToTrainYourModel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 