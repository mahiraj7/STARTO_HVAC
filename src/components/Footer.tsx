import React from 'react';
import { Mail, ArrowRight, ShieldCheck, Phone } from 'lucide-react';

interface FooterProps {
  onOpenDemo: (plan?: string) => void;
}

export default function Footer({ onOpenDemo }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0B132B] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <span className="text-[#00D2FF]">Starto</span>
            </a>
            <p className="text-sm font-semibold text-white">
              Never miss a booking.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Starto builds 24/7 AI booking & dispatch assistants for residential and commercial HVAC contractors across the United States & United Kingdom.
            </p>
            <div className="pt-2 text-xs text-slate-300 flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#00D2FF]" />
              <a href="mailto:mahiraj@trystarto.com" className="hover:text-white transition-colors">
                mahiraj@trystarto.com
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Product
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleScroll('#how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll('#simulator')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Interactive Simulator
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll('#calculator')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  ROI Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll('#pricing')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Pricing Tiers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll('#faq')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  HVAC FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Company
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleScroll('#careers')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Join the Starto Team (Careers)
                </button>
              </li>
              <li>
                <a
                  href="mailto:mahiraj@trystarto.com"
                  className="hover:text-white transition-colors"
                >
                  Contact Founder
                </a>
              </li>
              <li>
                <span className="text-slate-500">trystarto.com</span>
              </li>
            </ul>
          </div>

          {/* Dispatch CTA card */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Get Started
            </div>
            <p className="text-xs text-slate-400">
              Stop letting off-hours emergency repair calls drop to voicemail.
            </p>
            <button
              onClick={() => onOpenDemo('Footer CTA - 15-Min Demo')}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#0047AB] hover:bg-[#003d94] shadow-md shadow-[#0047AB]/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Book 15-Min Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {currentYear} Starto (trystarto.com). All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Built for US & UK HVAC Contractors</span>
            <span>·</span>
            <a href="mailto:mahiraj@trystarto.com" className="hover:text-slate-300">
              mahiraj@trystarto.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
