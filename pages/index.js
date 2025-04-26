import Hero from '../components/landing/Hero';
import Problem from '../components/landing/Problem';
import Solution from '../components/landing/Solution';
import KeyFeatures from '../components/landing/KeyFeatures';
import TEE from '../components/landing/TEE';
import Roadmap from '../components/landing/Roadmap';
import { Button } from "@heroui/react";

export default function Home() {
  return (
    <div>
      <Hero />
      <Problem />
      <Solution />
      <KeyFeatures />
      <TEE />
      <Roadmap />
      
      {/* Call to Action */}
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
      
      {/* Footer */}
      <footer className="w-full py-12 bg-gray-900 text-gray-300">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">HowToTrainYourModel</h3>
              <p className="text-gray-400">
                A platform for collaborative AI model training.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">API Reference</a></li>
                <li><a href="#" className="hover:text-white">Github</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Community</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Discord</a></li>
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">Forum</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2025 HowToTrainYourModel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
