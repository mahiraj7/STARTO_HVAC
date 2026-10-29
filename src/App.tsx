import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import InteractiveSimulator from './components/InteractiveSimulator';
import RoiCalculator from './components/RoiCalculator';
import Pricing from './components/Pricing';
import Faq from './components/Faq';
import Careers from './components/Careers';
import Footer from './components/Footer';
import DemoModal from './components/DemoModal';

export default function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('15-Min Demo');

  const handleOpenDemo = (plan: string = '15-Min Demo') => {
    setSelectedPlan(plan);
    setIsDemoModalOpen(true);
  };

  const handleCloseDemo = () => {
    setIsDemoModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B132B] flex flex-col font-sans selection:bg-[#00D2FF]/20 selection:text-[#0047AB]">
      {/* Top Navbar */}
      <Navbar onOpenDemo={handleOpenDemo} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section with animated phone mockup */}
        <Hero onOpenDemo={handleOpenDemo} />

        {/* 2. How It Works */}
        <HowItWorks onOpenDemo={handleOpenDemo} />

        {/* 3. Interactive Chat Demo (3 scenarios) */}
        <InteractiveSimulator onOpenDemo={handleOpenDemo} />

        {/* 4. ROI Calculator */}
        <RoiCalculator onOpenDemo={handleOpenDemo} />

        {/* 5. Pricing (3 editable tiers) */}
        <Pricing onOpenDemo={handleOpenDemo} />

        {/* 6. Frequently Asked Questions */}
        <Faq onOpenDemo={handleOpenDemo} />

        {/* 7. Careers ("Join the Starto Team", no courses/academy) */}
        <Careers />
      </main>

      {/* Footer */}
      <Footer onOpenDemo={handleOpenDemo} />

      {/* Central Booking/Demo Lead Capture Modal */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={handleCloseDemo}
        defaultPlan={selectedPlan}
      />
    </div>
  );
}
