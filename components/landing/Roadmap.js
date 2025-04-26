import React from 'react';

export default function Roadmap() {
  const roadmapItems = [
    {
      quarter: "Q2 2025",
      title: "Foundation Phase",
      items: [
        "Launch Landing Page & Documentation",
        "Implement Simple Model Hosting & Payment",
        "Build Basic Model Stacking (ensemble of small models)"
      ],
      color: "bg-blue-500"
    },
    {
      quarter: "Q3 2025",
      title: "Growth Phase",
      items: [
        "Develop Complex Model Stacking (hierarchical ensembles & meta-learning)",
        "Enhance DAO Voting UX and tokenomics"
      ],
      color: "bg-indigo-600"
    },
    {
      quarter: "Q4 2025",
      title: "Advanced Phase",
      items: [
        "Integrate Neural Network Editor & Visualizer",
        "Support advanced architectures (transformers, graph neural nets)"
      ],
      color: "bg-purple-700"
    }
  ];

  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Roadmap</h2>
        
        <div className="max-w-5xl mx-auto relative">
          {/* Timeline center line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gray-200 transform -translate-x-1/2 hidden md:block"></div>
          
          {roadmapItems.map((item, index) => (
            <div key={index} className={`flex flex-col md:flex-row items-center mb-12 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              {/* Quarter circle */}
              <div className="z-10 flex-shrink-0 w-16 h-16 rounded-full text-white flex items-center justify-center font-bold text-lg relative md:mx-8">
                <div className={`absolute inset-0 rounded-full ${item.color}`}></div>
                <span className="relative z-10">{item.quarter}</span>
              </div>
              
              {/* Content */}
              <div className={`bg-gray-50 rounded-xl shadow-lg p-8 mt-4 md:mt-0 w-full md:w-5/12 ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <ul className={`space-y-2 ${index % 2 === 1 ? 'md:ml-auto' : ''}`}>
                  {item.items.map((listItem, i) => (
                    <li key={i} className="flex items-start">
                      <svg className={`h-5 w-5 ${item.color.replace('bg-', 'text-')} mr-2 ${index % 2 === 1 ? 'md:ml-auto md:order-2' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={`${index % 2 === 1 ? 'md:mr-2' : ''}`}>{listItem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          <div className="text-center mt-12">
            <p className="text-gray-600 italic">*Timeline subject to change based on community feedback and development progress</p>
          </div>
        </div>
      </div>
    </section>
  );
} 