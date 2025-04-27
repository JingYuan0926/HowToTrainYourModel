// Version 1: API route with errors

export default async function handler(req, res) {
  // Missing: Check if req.method is POST

  try {
    const response = await fetch(
      'https://e3c329acf714051138becd9199470e6d1ae0cabd-5050.dstack-prod5.phala.network/predict',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        // Error: Body should be stringified
        body: req.body,
      }
    );

    // Basic error handling, doesn't check response.ok properly
    if (!response) {
      throw new Error('Fetch failed');
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('API Error:', error);
    // Generic error response
    return res.status(500).json({ message: 'An error occurred' });
  }
} 