import { useState } from 'react';
import { useWallet } from '@/components/ConnectWallet';

export function useModel() {
  const { accountId, callContractMethod } = useWallet();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const runModel = async () => {
    if (!accountId) {
      setError('Please connect your wallet first');
      return false;
    }
    
    setIsProcessing(true);
    setError(null);
    setSuccess(false);
    
    try {
      // Call the useModel method
      const result = await callContractMethod(
        'useModel',
        {},
        '30000000000000' // 30 TGas
      );
      
      if (result) {
        setSuccess(true);
        return true;
      } else {
        setError('Failed to use model. Please check your subscription.');
        return false;
      }
    } catch (error) {
      console.error('Model usage failed:', error);
      setError(error.message || 'Failed to use model. Please try again.');
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const resetStates = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    runModel,
    isProcessing,
    error,
    success,
    resetStates
  };
} 