import { useState, useEffect } from 'react';

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

export function useCheckBalance(accountId) {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    async function fetchNearBalance() {
      if (!accountId) {
        setBalance(null);
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
            id: 'dontcare',
            method: 'query',
            params: {
              request_type: 'view_account',
              finality: 'final',
              account_id: accountId
            }
          })
        });

        const data = await response.json();
        if (data.result && data.result.amount) {
          // Convert yoctoNEAR to NEAR (1 NEAR = 10^24 yoctoNEAR)
          const nearBalance = parseFloat(data.result.amount) / Math.pow(10, 24);
          setBalance(nearBalance.toFixed(2));
        } else {
          setBalance(null);
        }
      } catch (error) {
        console.error('Error fetching NEAR balance:', error);
        setBalance(null);
      }
    }

    fetchNearBalance();
  }, [accountId]);

  return balance;
} 