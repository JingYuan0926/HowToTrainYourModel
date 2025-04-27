// Version 2: API route with some fixes

export default async function handler(req, res) {
  // Added: Check if req.method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const response = await fetch(
      'https://e3c329acf714051138becd9199470e6d1ae0cabd-5050.dstack-prod5.phala.network/predict',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        // Fixed: Body is now stringified
        body: JSON.stringify(req.body),
      }
    );

    // Improved error handling: Check response.ok
    if (!response.ok) {
      // Still basic: Doesn't parse error details from response body
      console.error('External API Error Status:', response.status);
      return res.status(response.status || 500).json({ message: 'External API request failed' });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('API Error:', error);
    // Generic error response for network or other issues
    return res.status(500).json({ message: 'Failed to process request' });
  }
} 