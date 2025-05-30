export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { modelId, inputData } = req.body;

  const modelEndpoints = {
    'linear-regression': 'https://d1abd08c11797e048b6b6db79b0cf9cc62c068bc-5003.dstack-prod7.phala.network/predict/linear_regression',
    'decision-tree': 'https://d1abd08c11797e048b6b6db79b0cf9cc62c068bc-5003.dstack-prod7.phala.network/predict/decision_tree',
    'random-forest': 'https://d1abd08c11797e048b6b6db79b0cf9cc62c068bc-5003.dstack-prod7.phala.network/predict/random_forest',
    'deepseek-llm-v2': 'https://265e7bce2b07a1a9a541e6e29b5c41ac4d5f2f23-3001.dstack-prod6.phala.network/generate'
  };

  const endpoint = modelEndpoints[modelId];
  if (!endpoint) {
    return res.status(400).json({ error: `No endpoint found for model: ${modelId}` });
  }

  try {
    let requestData;
    
    // Handle different request formats based on model type
    if (modelId === 'deepseek-llm-v2') {
      // Deepseek LLM expects a prompt field
      requestData = {
        prompt: inputData.prompt
      };
    } else {
      // Other models expect open, high, low fields
      requestData = {
        Open: inputData.open,
        High: inputData.high,
        Low: inputData.low
      };
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Handle different response formats based on model type
    if (modelId === 'deepseek-llm-v2') {
      // Return consistent format for Deepseek response
      return res.status(200).json({ 
        status: 'success',
        output: data.output,
        model: modelId
      });
    } else {
      // Return consistent format for other models
      return res.status(200).json({
        status: 'success',
        predicted_close: data.predicted_close,
        model: modelId
      });
    }

  } catch (error) {
    console.error('External API request failed:', error);
    return res.status(500).json({ 
      error: 'Failed to get prediction from external API',
      details: error.message 
    });
  }
}
  