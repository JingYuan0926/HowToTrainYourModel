import React from 'react';
import { Button } from "@heroui/react";

export default function CallToAction() {
  return (
    <section className="w-full h-[100vh] flex flex-col justify-center items-center bg-indigo-600 text-white border-b border-indigo-800 snap-start">
      <div className="container px-6 py-16 md:py-24 flex flex-col justify-center h-full">
        <div className="mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join the Revolution?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Be part of the future of AI training. Join our community and help shape the next generation of AI models.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button size="lg" color="white" className="font-semibold px-8">
              Get Started Now
            </Button>
            <Button size="lg" variant="outlined" color="white" className="font-semibold px-8">
              Join Our Discord
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 