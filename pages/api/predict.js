export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { modelId, inputData } = req.body;

  const modelEndpoints = {
    'linear-regression': 'https://d1abd08c11797e048b6b6db79b0cf9cc62c068bc-5003.dstack-prod7.phala.network/predict/linear_regression',
    'decision-tree': 'https://d1abd08c11797e048b6b6db79b0cf9cc62c068bc-5003.dstack-prod7.phala.network/predict/decision_tree',
    'random-forest': 'https://d1abd08c11797e048b6b6db79b0cf9cc62c068bc-5003.dstack-prod7.phala.network/predict/random_forest'
  };

  const endpoint = modelEndpoints[modelId];
  if (!endpoint) {
    return res.status(400).json({ error: `No endpoint found for model: ${modelId}` });
  }

  try {
    // Format input data for the external API
    const requestData = {
      Open: inputData.open,
      High: inputData.high,
      Low: inputData.low
    };

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
    return res.status(200).json(data);

  } catch (error) {
    console.error('External API request failed:', error);
    return res.status(500).json({ 
      error: 'Failed to get prediction from external API',
      details: error.message 
    });
  }
}
  