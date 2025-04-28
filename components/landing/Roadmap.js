import React from 'react';
import { CalendarIcon, RocketIcon, LayersIcon } from "@radix-ui/react-icons";
import { BrainCog, Activity, Network } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";

export default function Roadmap() {
  const roadmapItems = [
    {
      Icon: RocketIcon,
      name: "Foundation Phase",
      quarter: "Q2 2025",
      description: "Establishing the core platform capabilities",
      items: [
        "Launch Landing Page & Documentation",
        "Implement Simple Model Hosting & Payment",
        "Build Basic Model Stacking (ensemble of small models)"
      ],
      color: "bg-blue-500",
      background: (
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl"></div>
      ),
      className: "lg:col-span-1 lg:row-span-3",
    },
    {
      Icon: BrainCog,
      name: "Growth Phase",
      quarter: "Q3 2025",
      description: "Expanding platform capabilities",
      items: [
        "Develop Complex Model Stacking (hierarchical ensembles & meta-learning)",
        "Enhance DAO Voting UX and tokenomics"
      ],
      color: "bg-indigo-600",
      background: (
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-indigo-600/20 blur-3xl"></div>
      ),
      className: "lg:col-span-2 lg:row-span-2",
    },
    {
      Icon: Network,
      name: "Advanced Phase",
      quarter: "Q4 2025",
      description: "Pushing the boundaries of model development",
      items: [
        "Integrate Neural Network Editor & Visualizer",
        "Support advanced architectures (transformers, graph neural nets)"
      ],
      color: "bg-purple-700",
      background: (
        <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-purple-700/20 blur-3xl"></div>
      ),
      className: "lg:col-span-2 lg:row-span-2",
    },
  ];

  return (
    <section className="w-full h-[100vh] flex flex-col justify-center items-center bg-white border-b border-gray-200 snap-start">
      <div className="container px-6 py-16 md:py-24 flex flex-col justify-center h-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Roadmap</h2>
        
        <div className="max-w-5xl mx-auto w-full">
          <BentoGrid className="lg:grid-rows-4">
            {roadmapItems.map((item, idx) => (
              <BentoCard 
                key={idx}
                Icon={item.Icon}
                name={
                  <div className="flex items-center gap-2">
                    <span>{item.name}</span>
                    <span className={`text-sm px-2 py-1 rounded-full text-white ${item.color}`}>
                      {item.quarter}
                    </span>
                  </div>
                }
                description={item.description}
                background={item.background}
                className={item.className}
                content={
                  <div className="mt-4">
                    <ul className="space-y-2">
                      {item.items.map((listItem, i) => (
                        <li key={i} className="flex items-start">
                          <svg className={`h-5 w-5 ${item.color.replace('bg-', 'text-')} mr-2`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{listItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                }
              />
            ))}
          </BentoGrid>

          <div className="text-center mt-12">
            <p className="text-gray-600 italic">*Timeline subject to change based on community feedback and development progress</p>
          </div>
        </div>
      </div>
    </section>
  );
} 