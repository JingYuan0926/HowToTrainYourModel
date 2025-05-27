import { useState } from 'react';
import { useWallet } from '@/components/ConnectWallet';

export function useSubscribe() {
  const { accountId, callContractMethod } = useWallet();
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeError, setSubscribeError] = useState(null);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);

  const subscribe = async () => {
    if (!accountId) {
      setSubscribeError('Please connect your wallet first');
      return false;
    }
    
    setIsSubscribing(true);
    setSubscribeError(null);
    setSubscribeSuccess(false);
    
    try {
      // Call the subscribe method with 1 NEAR deposit
      const result = await callContractMethod(
        'subscribe',
        {},
        '30000000000000', // 30 TGas
        '1000000000000000000000000' // 1 NEAR in yoctoNEAR
      );
      
      if (result) {
        setSubscribeSuccess(true);
        return true;
      } else {
        setSubscribeError('Transaction failed. Please try again.');
        return false;
      }
    } catch (error) {
      console.error('Subscription failed:', error);
      setSubscribeError(error.message || 'Failed to subscribe. Please try again.');
      return false;
    } finally {
      setIsSubscribing(false);
    }
  };

  const resetStates = () => {
    setSubscribeError(null);
    setSubscribeSuccess(false);
  };

  return {
    subscribe,
    isSubscribing,
    subscribeError,
    subscribeSuccess,
    resetStates
  };
} 