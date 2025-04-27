import React, { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({});

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
        <label>pH:</label>
        <input name="pH" onChange={handleChange} />
        <button type="submit">Analyze</button>
      </form>
    </div>
  );
}