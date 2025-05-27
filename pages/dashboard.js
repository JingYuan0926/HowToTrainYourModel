import React from 'react';
import { WarpBackground } from "@/components/magicui/warp-background";
import DashboardHeader from "@/components/DashboardHeader";
import { useWallet } from "@/components/ConnectWallet";
import { useCheckSubscription } from "@/hooks/useCheckSubscription";
import { useSubscribe } from "@/hooks/useSubscribe";

export default function Dashboard() {
  const { accountId } = useWallet();
  const { isSubscribed, formattedExpiry } = useCheckSubscription(accountId);
  const { subscribe, isSubscribing, subscribeError, subscribeSuccess } = useSubscribe();

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
          ) : !isSubscribed ? (
            // Show subscribe prompt when connected but not subscribed
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 max-w-md">
                <div className="mb-4">
                  <svg className="mx-auto h-16 w-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Subscribe to Continue</h2>
                <p className="text-gray-700 mb-6">
                  Get access to HTTYM features with a monthly subscription for 1 NEAR token.
                </p>
                
                {subscribeError && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
                    <p className="text-red-700 text-sm">{subscribeError}</p>
                  </div>
                )}
                
                {subscribeSuccess && (
                  <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4">
                    <p className="text-green-700 text-sm">Subscription successful! Please wait a moment for it to update.</p>
                  </div>
                )}
                
                <button
                  onClick={subscribe}
                  disabled={isSubscribing}
                  className={`w-full font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 ${
                    isSubscribing 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isSubscribing ? 'Subscribing...' : 'Subscribe for 1 NEAR'}
                </button>
              </div>
            </div>
          ) : (
            // Show main dashboard content when connected and subscribed
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Welcome to your Dashboard
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-2 text-green-600">✓ Subscribed</h3>
                  <p className="text-gray-600">You have access to all HTTYM features!</p>
                  {formattedExpiry && (
                    <p className="mt-2 text-sm text-gray-500">
                      Subscription expires: {formattedExpiry}
                    </p>
                  )}
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Extend Your Subscription</h4>
                    {subscribeError && (
                      <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
                        <p className="text-red-700 text-sm">{subscribeError}</p>
                      </div>
                    )}
                    
                    {subscribeSuccess && (
                      <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4">
                        <p className="text-green-700 text-sm">Successfully extended! The expiry date will update shortly.</p>
                      </div>
                    )}
                    
                    <button
                      onClick={subscribe}
                      disabled={isSubscribing}
                      className={`w-full text-sm font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 ${
                        isSubscribing 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
                      }`}
                    >
                      {isSubscribing ? 'Processing...' : 'Add Another Month (1 NEAR)'}
                    </button>
                    <p className="text-xs text-gray-500 mt-2">
                      Extending your subscription will add one month from your current expiry date.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
    </div>
  );
} 