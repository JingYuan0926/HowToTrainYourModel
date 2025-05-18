import Hero from '../components/landing/Hero';
import Header from '../components/Header';
import Footer from '../components/landing/Footer';
import HowItWorks from '../components/landing/HowItWorks';
import Features from '../components/landing/Features';
import Pricing from '../components/landing/Pricing';

export default function Home() {
  return (
    <div className="w-[80%] mx-auto border-l border-r border-gray-300">
      <Header />
      <section id="home">
        <Hero />
      </section>
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <section id="features">
        <Features />
      </section>
      <section id="pricing">
        <Pricing />
      </section>
      <Footer />
    </div>
  );
}
