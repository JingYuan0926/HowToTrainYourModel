import React from 'react';
import { WarpBackground } from "@/components/magicui/warp-background";
import DashboardHeader from "@/components/DashboardHeader";
import { useWallet } from "@/components/ConnectWallet";

export default function Dashboard() {
  const { accountId } = useWallet();

  return (
    <div className="min-h-screen bg-white">
        <DashboardHeader />
        <div className="container mx-auto px-6 py-24 pt-32">
          {!accountId ? (
            // Show connect wallet alert when not connected
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 max-w-md">
                <div className="mb-4">
                  <svg className="mx-auto h-16 w-16 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Wallet Required</h2>
                <p className="text-gray-700">
                  Please connect your NEAR wallet using the "Connect Wallet" button in the header to access the dashboard.
                </p>
              </div>
            </div>
          ) : (
            // Show main dashboard content when connected
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Welcome to your Dashboard
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Dashboard content will go here */}
              </div>
            </div>
          )}
        </div>
    </div>
  );
} 