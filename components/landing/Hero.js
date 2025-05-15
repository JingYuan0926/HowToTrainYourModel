import React from 'react';
import { Button } from "@heroui/react";

export default function Hero() {
  return (
    <section className="w-full h-[100vh] flex flex-col justify-center items-center bg-gradient-to-b from-white to-blue-500 text-blue-900 border-b border-blue-300 snap-start">
      <div className="container px-6 py-16 md:py-24 flex flex-col justify-center h-full">
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