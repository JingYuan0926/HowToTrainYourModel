import { useState } from 'react';

// Define parameter ranges here for sliders
const paramRanges = {
  pH: { min: 0, max: 14, step: 0.1 },
  Hardness: { min: 0, max: 500, step: 1 },
  Solids: { min: 0, max: 50000, step: 100 },
  Chloramines: { min: 0, max: 10, step: 0.1 },
  Sulfate: { min: 0, max: 500, step: 1 },
  Conductivity: { min: 0, max: 1000, step: 10 },
  Organic_carbon: { min: 0, max: 30, step: 0.1 },
  Trihalomethanes: { min: 0, max: 200, step: 1 },
  Turbidity: { min: 0, max: 10, step: 0.1 }
};

// Function to get initial default values (e.g., midpoint)
const getInitialFormData = () => {
  const initialData = {};
  for (const param in paramRanges) {
    const range = paramRanges[param];
    // Calculate midpoint and format according to step
    initialData[param] = ((range.max + range.min) / 2).toFixed(range.step < 1 ? 1 : 0);
  }
  return initialData;
};

export default function TestPage() {
  // Use a single state object for all form data
  const [formData, setFormData] = useState(getInitialFormData());
  // Add state for loading, results, and errors
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Generic change handler for all inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    const range = paramRanges[name];
    setFormData(prev => ({
      ...prev,
      // Ensure value is stored correctly formatted based on step
      [name]: parseFloat(value).toFixed(range.step < 1 ? 1 : 0)
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default page reload
    setError(null);     // Clear previous errors
    setResult(null);    // Clear previous results
    setIsLoading(true); // Set loading state

    try {
      // Call our Next.js API route
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json', // Optional: Indicate we accept JSON response
        },
        // Send the current form data
        body: JSON.stringify(formData),
      });

      // Check if the request was successful
      if (!response.ok) {
        // Try to parse error message from API response body
        const errorData = await response.json().catch(() => ({})); // Default if parsing fails
        throw new Error(errorData.message || `API request failed with status ${response.status}`);
      }

      // Parse the successful JSON response
      const data = await response.json();
      setResult(data); // Update the result state

    } catch (err) {
      // Catch fetch errors or errors thrown from response handling
      setError(err.message);
    } finally {
      // Ensure loading state is turned off regardless of success/error
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Water Quality Parameters</h1>
      {/* Bind handleSubmit to the form's onSubmit event */}
      <form onSubmit={handleSubmit}>
        {/* Dynamically create sliders for each parameter */}
        {Object.entries(formData).map(([param, value]) => {
          const range = paramRanges[param];
          return (
            <div key={param}>
              <label htmlFor={param}>{param}: {value}</label>
              <input
                type="range"
                id={param}
                name={param}
                min={range.min}
                max={range.max}
                step={range.step}
                value={value}
                onChange={handleChange} // Use the generic handler
              />
            </div>
          );
        })}
        {/* Add a submit button */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Analyzing...' : 'Analyze Quality'}
        </button>
      </form>

      {/* Display Loading Indicator */}
      {isLoading && <p>Loading...</p>}

      {/* Display Error Message */}
      {error && (
        <div style={{ color: 'red', marginTop: '1rem' }}>
          Error: {error}
        </div>
      )}

      {/* Display Result */}
      {result && (
        <div style={{ marginTop: '1rem' }}>
          <h2>Prediction Result:</h2>
          {/* Display result data - adjust based on actual API response format */} 
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
