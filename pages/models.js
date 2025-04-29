import React, { useState } from 'react';

// --- Sample Model Data ---
// Replace this with your actual model data, potentially fetched from an API
const modelsData = [
  {
    id: 'img-classify',
    name: 'Image Classification',
    description: 'Categorize images into predefined classes. Upload an image to see its predicted label.',
    icon: ( // Placeholder SVG Icon
      <svg className="w-12 h-12 mb-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
    ),
  },
  {
    id: 'prediction',
    name: 'Prediction',
    description: 'Forecast future values based on historical data. Provide your dataset for predictive analysis.',
     icon: ( // Placeholder SVG Icon
      <svg className="w-12 h-12 mb-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
    ),
  },
  {
    id: 'text-gen',
    name: 'Text Generation',
    description: 'Create human-like text based on a prompt. Enter a starting phrase to generate text.',
     icon: ( // Placeholder SVG Icon
      <svg className="w-12 h-12 mb-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
    ),
  },
  {
    id: 'object-detect',
    name: 'Object Detection',
    description: 'Identify and locate multiple objects within an image. Upload an image to detect objects.',
    icon: ( // Placeholder SVG Icon
        <svg className="w-12 h-12 mb-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 10L8 8m2 2l2 2m-2-2l-2 2m2-2l2-2"></path></svg>
    ),
   },
   {
    id: 'sentiment',
    name: 'Sentiment Analysis',
    description: 'Determine the emotional tone behind text (positive, negative, neutral).',
    icon: ( // Placeholder SVG Icon
        <svg className="w-12 h-12 mb-3 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    ),
   },
];

// --- Reusable Model Card Component ---
const ModelCard = ({ model, onSelect, isSelected }) => {
  const { id, name, description, icon } = model;

  // Define border style based on selection
  const borderStyle = isSelected
    ? 'border-2 border-blue-500 ring-2 ring-blue-200' // Highlight selected card
    : 'border border-gray-200';

  return (
    <div
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out overflow-hidden flex flex-col ${borderStyle}`}
    >
      <div className="p-6 flex flex-col items-center text-center flex-grow">
        {icon}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
        <p className="text-sm text-gray-600 flex-grow">{description}</p>
      </div>
      <div className="p-4 bg-gray-50 border-t border-gray-100">
        <button
          onClick={() => onSelect(id)}
          className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors duration-150 ${
            isSelected
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-indigo-500 text-white hover:bg-indigo-600'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isSelected ? 'focus:ring-blue-400' : 'focus:ring-indigo-400'
          }`}
        >
          {isSelected ? 'Selected' : 'Select Model'}
        </button>
      </div>
    </div>
  );
};

// --- Main Page Component ---
const ModelSelectionPage = () => {
  const [selectedModelId, setSelectedModelId] = useState(null); // State to track selected model

  const handleSelectModel = (modelId) => {
    console.log("Selected model:", modelId);
    setSelectedModelId(modelId);
    // TODO: Add navigation or other actions here based on selection
    // Example: router.push(`/models/${modelId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-10">
          Choose Your AI Model
        </h1>

        {/* Grid for Model Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {modelsData.map((model) => (
            <ModelCard
              key={model.id}
              model={model}
              onSelect={handleSelectModel}
              isSelected={selectedModelId === model.id}
            />
          ))}
        </div>

        {/* Optional: Display selected model info */}
        {selectedModelId && (
          <div className="mt-10 p-4 bg-blue-50 border border-blue-200 rounded-md text-center">
            <p className="text-blue-800">
              You have selected: <span className="font-semibold">{modelsData.find(m => m.id === selectedModelId)?.name}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelSelectionPage;