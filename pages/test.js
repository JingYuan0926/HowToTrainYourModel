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

export default function TestPage() {
  // For now, let's just manage the state for pH
  const [phValue, setPhValue] = useState(7.0); // Start pH at a neutral value

  const handlePhChange = (e) => {
    setPhValue(parseFloat(e.target.value).toFixed(1));
  };

  return (
    <div>
      <h1>Water Quality Parameters</h1>
      <form>
        <div>
          <label htmlFor="pH">pH: {phValue}</label>
          <input
            type="range"
            id="pH"
            name="pH"
            min={paramRanges.pH.min}
            max={paramRanges.pH.max}
            step={paramRanges.pH.step}
            value={phValue}
            onChange={handlePhChange}
          />
        </div>
        {/* More sliders will go here */}
      </form>
    </div>
  );
}
