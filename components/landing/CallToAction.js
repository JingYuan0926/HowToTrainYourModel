import React from 'react';
import { Button } from "@heroui/react";

export default function CallToAction() {
  return (
    <section className="w-full py-20 bg-indigo-600 text-white">
      <div className="container mx-auto px-6 text-center">
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
    </section>
  );
} 