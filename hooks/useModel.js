import { useState } from 'react';
import { useWallet } from '@/components/ConnectWallet';

export function useModel() {
  const { accountId, callContractMethod } = useWallet();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const runModel = async (modelId, input = '') => {
    if (!accountId) {
      setError('Please connect your wallet first');
      return false;
    }

    if (!modelId) {
      setError('Model ID is required');
      return false;
    }
    
    setIsProcessing(true);
    setError(null);
    setSuccess(false);
    
    try {
      // Call the useModel method with the model ID and input
      const result = await callContractMethod(
        'useModel',
        { modelId, input },
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