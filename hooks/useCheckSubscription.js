import { useState, useEffect } from 'react';

const CONTRACT_ID = 'ilovetofu.near';

// Helper function to encode args to base64
function encodeArgs(args) {
  return Buffer.from(JSON.stringify(args)).toString('base64');
}

// Helper function to decode result from base64
function decodeResult(base64String) {
  try {
    const decoded = Buffer.from(base64String, 'base64');
    return JSON.parse(decoded.toString());
  } catch (error) {
    console.error('Error decoding result:', error);
    return null;
  }
}

// Helper function to format expiry date
function formatExpiryDate(expiryTimestamp) {
  if (!expiryTimestamp) return null;
  // Convert nanoseconds to milliseconds
  const expiryDate = new Date(Number(expiryTimestamp) / 1000000);
  return expiryDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function useCheckSubscription(accountId) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionExpiry, setSubscriptionExpiry] = useState(null);
  const [formattedExpiry, setFormattedExpiry] = useState(null);

  useEffect(() => {
    async function checkSubscriptionStatus() {
      if (!accountId) {
        setIsSubscribed(false);
        setSubscriptionExpiry(null);
        setFormattedExpiry(null);
        return;
      }

      try {
        // Check if subscribed
        const subResponse = await fetch('https://rpc.mainnet.near.org', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 'subscription-check',
            method: 'query',
            params: {
              request_type: 'call_function',
              finality: 'final',
              account_id: CONTRACT_ID,
              method_name: 'isSubscribed',
              args_base64: encodeArgs({ accountId })
            }
          })
        });

        const subData = await subResponse.json();
        if (subData.result && subData.result.result) {
          const result = decodeResult(subData.result.result);
          setIsSubscribed(result === true);
        } else {
          setIsSubscribed(false);
        }

        // Get subscription expiry
        const expiryResponse = await fetch('https://rpc.mainnet.near.org', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 'expiry-check',
            method: 'query',
            params: {
              request_type: 'call_function',
              finality: 'final',
              account_id: CONTRACT_ID,
              method_name: 'getSubscriptionExpiry',
              args_base64: encodeArgs({ accountId })
            }
          })
        });

        const expiryData = await expiryResponse.json();
        if (expiryData.result && expiryData.result.result) {
          const expiryResult = decodeResult(expiryData.result.result);
          setSubscriptionExpiry(expiryResult);
          setFormattedExpiry(formatExpiryDate(expiryResult));
        } else {
          setSubscriptionExpiry(null);
          setFormattedExpiry(null);
        }
      } catch (error) {
        console.error('Error checking subscription:', error);
        setIsSubscribed(false);
        setSubscriptionExpiry(null);
        setFormattedExpiry(null);
      }
    }

    checkSubscriptionStatus();
  }, [accountId]);

  return { isSubscribed, subscriptionExpiry, formattedExpiry };
} 