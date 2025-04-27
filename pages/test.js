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
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'API request failed');
      }
      setResult(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getWaterColor = () => {
    if (!result) return 'bg-blue-200';
    return result.cluster === 0 ? 'bg-red-200' : 'bg-green-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
            Water Quality Analysis
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.entries(formData).map(([param, value]) => {
              const { min, max, step } = paramRanges[param];
              return (
                <div key={param} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-800">
                      {param}
                    </label>
                    <span className="text-sm font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                      {value}
                    </span>
                  </div>
                  <input
                    type="range"
                    name={param}
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={handleChange}
                    className="mt-1 block w-full h-2 bg-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{
                      background: `linear-gradient(to right, #60a5fa 0%, #60a5fa ${
                        ((value - min) / (max - min)) * 100
                      }%, #e5e7eb ${
                        ((value - min) / (max - min)) * 100
                      }%, #e5e7eb 100%)`,
                    }}
                  />
                </div>
              );
            })}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {isLoading ? 'Analyzing...' : 'Analyze Water Quality'}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
              Error: {error}
            </div>
          )}
        </div>

        {/* Flask & Result */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6 flex flex-col items-center justify-center">
          <div className="relative w-64 h-64 mb-8">
            <div
              className={`absolute bottom-0 left-0 right-0 h-48 rounded-b-full ${getWaterColor()} transition-colors duration-500`}
            ></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-10 bg-white/90 rounded-t-full"></div>
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-4 h-20 bg-white/90"></div>
          </div>
          {result && (
            <div className="text-center text-gray-800">
              <h2 className="text-2xl font-semibold mb-2">{result.meaning}</h2>
              <p className="text-gray-600">Cluster: {result.cluster}</p>
            </div>
          )}
        </div>
      </div>

      {/* Cluster Panel */}
      <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6">
        <h2 className="text-xl font-bold mb-4 text-blue-800">
          Water Quality Clusters
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-100 rounded-lg">
            <h3 className="font-semibold text-green-800">NORMAL (Cluster 1)</h3>
            <p className="text-sm text-gray-600">
              Typical water quality with balanced parameters, moderate mineral content,
              and acceptable organic levels.
            </p>
          </div>
          <div className="p-4 bg-red-100 rounded-lg">
            <h3 className="font-semibold text-red-800">HIGH (Cluster 0)</h3>
            <p className="text-sm text-gray-600">
              Elevated contaminant levels—higher dissolved solids,
              organic carbon, and chloramines.
            </p>
          </div>
        </div>
      </div>
