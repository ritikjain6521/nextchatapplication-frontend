import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import WelcomeBonus from './WelcomeBonus';
import Features from './Features';
import Showcase from './Showcase';
import WhyChooseUs from './WhyChooseUs';
import AIAssistant from './AIAssistant';
import Calling from './Calling';
import CreditModel from './CreditModel';
import WalletDashboard from './WalletDashboard';
import PaymentGateway from './PaymentGateway';
import AdminFeatures from './AdminFeatures';
import Testimonials from './Testimonials';
import Pricing from './Pricing';
import FAQ from './FAQ';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div className="landing-page min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-primary/30">
      <Navbar />
      <main>
        <Hero />
        <WelcomeBonus />
        <Features />
        <Showcase />
        <WhyChooseUs />
        <AIAssistant />
        <Calling />
        <CreditModel />
        <WalletDashboard />
        <PaymentGateway />
        <AdminFeatures />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
