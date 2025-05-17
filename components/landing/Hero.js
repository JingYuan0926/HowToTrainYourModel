import React from 'react';
import { Button } from "@heroui/react";

export default function Hero() {
  return (
    <section className="w-full h-[100vh] flex flex-col justify-center items-center relative text-blue-900 border-b border-blue-300 snap-start overflow-hidden">
      {/* Parabolic gradient background */}
      <div className="absolute inset-0 w-full h-full" style={{
        background: `
          radial-gradient(ellipse at 50% 120%, white 0%, white 60%, transparent 85%),
          linear-gradient(to bottom, white 40%, rgba(59, 130, 246, 0.4) 100%)
        `,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        {/* Additional gradient elements to enhance parabola effect */}
        <div className="absolute bottom-0 left-0 w-full h-1/5 bg-gradient-to-t from-blue-500 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-full bg-gradient-to-r from-blue-500/15 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-1/4 h-full bg-gradient-to-l from-blue-500/15 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="container px-6 py-16 md:py-24 flex flex-col justify-center h-full relative z-10">
        <div className="mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Collaborative AI Training Platform
          </h1>
          <p className="text-xl md:text-2xl mb-12 mx-auto max-w-3xl">
            We're building a platform where everyone can collaborate to create and improve AI models collectively. 
            Contribute from anywhere and be part of shaping a smarter AI for all.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button size="lg" color="blue" className="font-semibold px-8">
              Get Started
            </Button>
            <Button size="lg" variant="outlined" color="blue" className="font-semibold px-8">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 