import React, { useState } from 'react';

// imports and helpers same as v4

export default function Home() {
  const [formData, setFormData] = useState(initial);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const standardized = standardizeInput(formData);
      const res = await fetch('/api/predict', { method: 'POST', body: JSON.stringify(standardized) });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Water Quality Analysis</h1>
      <form onSubmit={handleSubmit}>
        {Object.entries(paramRanges).map(([param, range]) => (
          <div key={param}>
            <label>{param}</label>
            <input
              type="range"
              name={param}
              min={range.min}
              max={range.max}
              step={range.step}
              value={formData[param]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit">Analyze</button>
      </form>
    </div>
  );
}