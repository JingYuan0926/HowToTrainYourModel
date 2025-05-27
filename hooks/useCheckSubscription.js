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

export function useCheckSubscription(accountId) {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    async function checkSubscriptionStatus() {
      if (!accountId) {
        setIsSubscribed(false);
        return;
      }

      try {
        const response = await fetch('https://rpc.mainnet.near.org', {
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

        const data = await response.json();
        if (data.result && data.result.result) {
          const result = decodeResult(data.result.result);
          setIsSubscribed(result === true);
        } else {
          setIsSubscribed(false);
        }
      } catch (error) {
        console.error('Error checking subscription:', error);
        setIsSubscribed(false);
      }
    }

    checkSubscriptionStatus();
  }, [accountId]);

  return isSubscribed;
} 