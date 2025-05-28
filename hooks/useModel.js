import { useState } from 'react';

export function useModel() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState(null);

  const runModel = async (modelId, input = '') => {
    if (!modelId) {
      setError('Model ID is required');
      return false;
    }
    
    setIsProcessing(true);
    setError(null);
    setSuccess(false);
    setResult(null);
    
    try {
      const response = await fetch(
        'https://e3c329acf714051138becd9199470e6d1ae0cabd-5050.dstack-prod5.phala.network/predict',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            modelId,
            input
          }),
        }
      );
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to use model');
      }
      
      setSuccess(true);
      setResult(data);
      return data;
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
    setResult(null);
  };

  return {
    runModel,
    isProcessing,
    error,
    success,
    result,
    resetStates
  };
} 