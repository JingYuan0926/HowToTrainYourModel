import React from 'react';
import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import { WarpBackground } from "@/components/magicui/warp-background";

export default function Hero() {
  return (
    <section className="w-full h-[100vh] flex flex-col justify-center items-center relative text-blue-900 border-b border-blue-300 snap-start overflow-hidden">
      <WarpBackground 
        className="w-full h-full"
        perspective={200}
        beamsPerSide={5}
        beamSize={4}
        beamDelayMax={2}
        beamDelayMin={0}
        beamDuration={4}
        gridColor="rgba(59, 130, 246, 0.2)"
      >
        {/* Content */}
        <div className="container px-6 py-16 md:py-24 flex flex-col justify-center h-full relative z-10">
          <div className="mx-auto text-center mt-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight text-black">
              Collaborative AI Training Platform
            </h1>
            <p className="text-xl md:text-2xl mb-16 mx-auto max-w-3xl text-gray-600">
              We're building a platform where everyone can collaborate to create and improve AI models collectively. 
              Contribute from anywhere and be part of shaping a smarter AI for all.
            </p>
            
            {/* Animated Subscribe Button */}
            <div className="flex justify-center items-center -mt-5">
              <AnimatedSubscribeButton className="w-48 px-8 py-3 h-12 bg-blue-600 hover:bg-blue-700 text-white">
                <span className="group inline-flex items-center text-base font-medium">
                  Try Now
                  <ChevronRightIcon className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="group inline-flex items-center text-base font-medium">
                  <CheckIcon className="mr-2 size-4" />
                  Started
                </span>
              </AnimatedSubscribeButton>
            </div>
          </div>
        </div>
      </WarpBackground>
    </section>
  );
} 