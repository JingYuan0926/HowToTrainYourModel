import Hero from '../components/landing/Hero';
import Problem from '../components/landing/Problem';
import Solution from '../components/landing/Solution';
import KeyFeatures from '../components/landing/KeyFeatures';
import TEE from '../components/landing/TEE';
import Roadmap from '../components/landing/Roadmap';
import CallToAction from '../components/landing/CallToAction';
import Footer from '../components/landing/Footer';

export default function Home() {
  return (
    <div className="w-[80%] mx-auto border-l border-r border-gray-300">
      <Hero />
      <Problem />
      <Solution />
      <KeyFeatures />
      <TEE />
      <Roadmap />
      <CallToAction />
      <Footer />
    </div>
  );
}
