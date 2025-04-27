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

  return (
    <div>
      <h1>Water Quality Parameters</h1>
      <form>
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
        {/* Submit button can be added later */}
      </form>
    </div>
  );
}
