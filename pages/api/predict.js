export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    const response = await fetch(
      'https://e3c329acf714051138becd9199470e6d1ae0cabd-5050.dstack-prod5.phala.network/predict',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      }
    );
  
    if (!response.ok) {
      return res.status(response.status).json({ message: 'Upstream API error' });
    }
  
    const data = await response.json();
    return res.status(200).json(data);
  }