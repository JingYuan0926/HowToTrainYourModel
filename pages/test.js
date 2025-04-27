import React, { useState } from 'react';

const paramRanges = {
  pH:           { min: 0,    max: 14,     step: 0.1 },
  Hardness:     { min: 0,    max: 500,    step: 1   },
  Solids:       { min: 0,    max: 50000,  step: 100 },
  Chloramines:  { min: 0,    max: 10,     step: 0.1 },
  Sulfate:      { min: 0,    max: 500,    step: 1   },
  Conductivity: { min: 0,    max: 1000,   step: 10  },
  Organic_carbon:{min: 0,    max: 30,     step: 0.1 },
  Trihalomethanes:{min: 0,   max: 200,    step: 1   },
  Turbidity:    { min: 0,    max: 10,     step: 0.1 }
};

const getInitialFormData = () => {
  const initial = {};
  for (const p in paramRanges) {
    const { min, max, step } = paramRanges[p];
    initial[p] = ((min + max) / 2).toFixed(step < 1 ? 1 : 0);
  }
  return initial;
};

const standardizeValue = (value, min, max) => {
  if (max === min) return 0;
  return ((value - min) / (max - min)) * 6 - 3;
};

const standardizeInput = (inputData) => {
  const out = {};
  for (const [p, v] of Object.entries(inputData)) {
    const { min, max } = paramRanges[p];
    out[p] = standardizeValue(parseFloat(v), min, max);
  }
  return out;
};

export default function Home() {
  const [formData, setFormData] = useState(getInitialFormData());
  const [result, setResult]     = useState(null);
  const [error, setError]       = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(fd => ({
      ...fd,
      [name]: parseFloat(value).toFixed(paramRanges[name].step < 1 ? 1 : 0)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const standardized = standardizeInput(formData);
      const res = await fetch('/api/predict', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(standardized),
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getWaterColor = () => {
    if (!result) return 'lightblue';
    return result.cluster === 0 ? 'salmon' : 'lightgreen';
  };

  return (
    <div>
      <h1>Water Quality Analysis</h1>
      <form onSubmit={handleSubmit}>
        {Object.entries(formData).map(([param, value]) => {
          const { min, max, step } = paramRanges[param];
          return (
            <div key={param}>
              <label htmlFor={param}>{param}:</label>
              <input
                type="range"
                id={param}
                name={param}
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleChange}
              />
              <span>{value}</span>
            </div>
          );
        })}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>

      {error  && <div style={{ color: 'red' }}>Error: {error}</div>}
      {result && (
        <div>
          <h2>{result.meaning}</h2>
          <p>Cluster: {result.cluster}</p>
        </div>
      )}

      {/* Simple CSS flask */}
      <div style={{ position: 'relative', width: 200, height: 200, marginTop: 20 }}>
        <div
          style={{
            position: 'absolute',
            bottom:   0,
            width:    '100%',
            height:   '50%',
            backgroundColor: getWaterColor(),
            borderRadius:    '0 0 100px 100px'
          }}
        />
        <div
          style={{
            position: 'absolute',
            top:      0,
            left:     '50%',
            transform: 'translateX(-50%)',
            width:    100,
            height:   20,
            backgroundColor: '#ddd',
            borderRadius:    '100px 100px 0 0'
          }}
        />
      </div>
    </div>
  );
}
