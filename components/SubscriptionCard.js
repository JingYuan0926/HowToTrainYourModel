import React from 'react';
import { useSubscription } from '@/hooks/useSubscription';

export default function SubscriptionCard() {
  const {
    isSubscribed,
    subscriptionExpiry,
    loading,
    error,
    subscribe
  } = useSubscription();

  const handleSubscribe = async () => {
    try {
      await subscribe();
    } catch (err) {
      console.error("Subscription error:", err);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg mb-8">
      <h2 className="text-2xl font-semibold mb-4">Subscription Status</h2>
      {loading ? (
        <p className="text-gray-600">Loading subscription status...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : isSubscribed ? (
        <div>
          <p className="text-green-600 font-medium mb-2">✓ Active Subscription</p>
          <p className="text-gray-600">Expires: {subscriptionExpiry}</p>
        </div>
      ) : (
        <div>
          <p className="text-gray-600 mb-4">
            Subscribe to access our AI model. Only 1 NEAR per month!
          </p>
          <button
            onClick={handleSubscribe}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Subscribe Now
          </button>
        </div>
      )}
    </div>
  );
} 