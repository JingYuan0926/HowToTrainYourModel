import React, { useState } from 'react';

const paramRanges = { pH: { min: 0, max: 14, step: 0.1 }, /* other params... */ };

export default function Home() {
  const initial = Object.keys(paramRanges).reduce((acc, key) => ({
    ...acc,
    [key]: (paramRanges[key].min + paramRanges[key].max) / 2,
  }), {});
  const [formData, setFormData] = useState(initial);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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