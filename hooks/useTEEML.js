import { useState, useCallback } from 'react';

export function useTEEML() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState(null);

  const runTEEMLModel = async (modelId, inputData) => {
    setIsProcessing(true);
    setError(null);
    setSuccess(false);
    setResult(null);
    
    try {
      // Use our Next.js API route instead of direct external calls
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          modelId,
          inputData
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.status === 'success') {
        setResult(data);
        setSuccess(true);
        return true;
      } else {
        setError('Prediction failed. Please try again.');
        return false;
      }
    } catch (error) {
      console.error('TEEML prediction failed:', error);
      setError(error.message || 'Failed to get prediction. Please try again.');
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const resetStates = useCallback(() => {
    setError(null);
    setSuccess(false);
    setResult(null);
  }, []);

  return {
    runTEEMLModel,
    isProcessing,
    error,
    success,
    result,
    resetStates
  };
} 