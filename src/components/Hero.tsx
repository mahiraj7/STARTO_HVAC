import React, { useState, useEffect } from 'react';
import { ArrowRight, MessageSquare, Calendar, PhoneCall, Check, Sparkles, Shield, Clock } from 'lucide-react';

interface HeroProps {
  onOpenDemo: (plan?: string) => void;
}

interface ChatMessage {
  id: number;
  sender: 'customer' | 'ai';
  text: string;
  time: string;
  tag?: string;
  bookingCard?: {
    service: string;
    date: string;
    tech: string;
    status: string;
  };
}

const mockConversation: ChatMessage[] = [
  {
    id: 1,
    sender: 'customer',
    text: "Hi! My AC unit outside completely stopped blowing cold air and it's 91°F inside with two infants. Are you guys available tomorrow morning?",
    time: "11:42 PM"
  },
  {
    id: 2,
    sender: 'ai',
    text: "Hi Sarah! I'm Starto at Precision HVAC. Don't worry, we have an on-call priority technician in your area tomorrow morning. Is your outdoor condenser humming, or completely silent?",
    time: "11:42 PM · 6s reply",
    tag: "Sub-10s Auto Triage"
  },
  {
    id: 3,
    sender: 'customer',
    text: "It makes a faint buzzing sound when the thermostat kicks on, but the top fan isn't spinning at all.",
    time: "11:43 PM"
  },
  {
    id: 4,
    sender: 'ai',
    text: "Understood — that usually indicates a failed capacitor or fan motor. I can reserve an emergency diagnostic window for tomorrow between 8:00 AM – 10:00 AM with Tech Dan. What's your street address and best callback number?",
    time: "11:43 PM · 7s reply"
  },
  {
    id: 5,
    sender: 'customer',
    text: "4821 Highland Park Dr, Dallas TX 75205. Cell is (214) 555-0149.",
    time: "11:44 PM"
  },
  {
    id: 6,
    sender: 'ai',
    text: "Locked in! You're confirmed for tomorrow at 8:00 AM. Dan has been dispatched to your ticket #HVAC-9214. We just sent an SMS confirmation to your cell.",
    time: "11:44 PM · Confirmed",
    bookingCard: {
      service: "Emergency AC Diagnostic & Repair",
      date: "Tomorrow, 8:00 AM – 10:00 AM",
      tech: "Dan M. (Senior HVAC Tech)",
      status: "Synced to ServiceTitan & Dispatched"
    }
  }
];

export default function Hero({ onOpenDemo }: HeroProps) {
  const [visibleMessagesCount, setVisibleMessagesCount] = useState(2);

  // Progressive message reveal to simulate real-time typing
  useEffect(() => {
    if (visibleMessagesCount < mockConversation.length) {
      const timer = setTimeout(() => {
        setVisibleMessagesCount(prev => prev + 1);
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [visibleMessagesCount]);

  const handleReplay = () => {
    setVisibleMessagesCount(1);
  };

  return (
    <section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Subtle ambient gradient mesh background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] pointer-events-none opacity-40">
        <div className="absolute -top-24 left-1/4 w-[480px] h-[480px] bg-[#0047AB]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-10 right-1/4 w-[420px] h-[420px] bg-[#00D2FF]/15 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Market focus unboxed label */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#0047AB] mb-4">
          <span>US & UK HVAC Businesses</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="text-slate-600">Never Miss A Booking</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="text-emerald-600 font-medium">24/7 After-Hours Dispatch</span>
        </div>

        {/* 2-Column Hero layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0B132B] tracking-tight leading-[1.08] text-balance">
              Never Lose A{' '}
              <span className="gradient-cobalt-cyan">
                $1,000 HVAC Job
              </span>{' '}
              To A Delayed Reply Again
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl font-normal">
              Homeowners call when their AC dies at 11 PM or furnace quits on Saturday morning. Starto answers in under 10 seconds via phone missed-call text and web chat, triages the repair, and books directly into your technician schedule.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => onOpenDemo('Hero Primary CTA')}
                className="py-4 px-7 rounded-xl font-bold text-white bg-[#0047AB] hover:bg-[#003d94] shadow-xl shadow-[#0047AB]/25 hover:shadow-[#0047AB]/35 transition-all text-base flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Book 15-Min Demo</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#simulator"
                className="py-4 px-6 rounded-xl font-semibold text-slate-700 hover:text-[#0047AB] bg-white border border-slate-200 hover:border-slate-300 shadow-sm transition-all text-base text-center flex items-center justify-center gap-2"
              >
                <span>Try Live Simulator</span>
              </a>
            </div>

            {/* Quick value bullets */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/80">
              <div className="space-y-1">
                <div className="text-xs font-bold text-[#0B132B] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#0047AB]" />
                  &lt; 10s Response
                </div>
                <p className="text-xs text-slate-500">
                  Instant answer on after-hours emergencies & weekend inquiries.
                </p>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-bold text-[#0B132B] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#0047AB]" />
                  Direct CRM Sync
                </div>
                <p className="text-xs text-slate-500">
                  Books into ServiceTitan, Housecall Pro, Jobber, and Google Calendar.
                </p>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-bold text-[#0B132B] flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#0047AB]" />
                  Zero Overhead
                </div>
                <p className="text-xs text-slate-500">
                  No 24/7 call center staffing costs or dropped weekend calls.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Animated Phone Chat Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[380px] sm:max-w-[400px] bg-slate-900 rounded-[38px] p-3 shadow-2xl shadow-[#0047AB]/20 border-4 border-slate-800">
              {/* Phone Speaker & Camera Notch */}
              <div className="w-32 h-4 bg-slate-800 rounded-full mx-auto mb-2 flex items-center justify-center">
                <div className="w-12 h-1.5 bg-slate-700 rounded-full"></div>
              </div>

              {/* Phone Inner Screen */}
              <div className="bg-[#F8FAFC] rounded-[30px] overflow-hidden border border-slate-200/40 shadow-inner flex flex-col h-[520px]">
                {/* Chat Top Header */}
                <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#0047AB] text-white flex items-center justify-center text-xs font-black">
                      S
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 leading-tight">Starto Dispatch AI</div>
                      <div className="text-[10px] text-slate-500">Precision HVAC · 24/7 Active</div>
                    </div>
                  </div>
                  <button 
                    onClick={handleReplay}
                    className="text-[11px] text-[#0047AB] hover:underline font-medium cursor-pointer"
                    title="Restart chat simulation"
                  >
                    Replay
                  </button>
                </div>

                {/* Messages Container */}
                <div className="flex-1 p-3.5 space-y-3 overflow-y-auto">
                  <div className="text-center text-[10px] text-slate-400 font-medium my-1">
                    Saturday · 11:42 PM (After-Hours)
                  </div>

                  {mockConversation.slice(0, visibleMessagesCount).map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === 'customer' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm ${
                          msg.sender === 'customer'
                            ? 'bg-[#0047AB] text-white rounded-br-xs'
                            : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs'
                        }`}
                      >
                        {msg.text}

                        {/* Booking card if included */}
                        {msg.bookingCard && (
                          <div className="mt-2.5 pt-2.5 border-t border-slate-100 bg-slate-50 -mx-1 -mb-1 p-2 rounded-xl text-[11px] text-slate-700 space-y-1">
                            <div className="font-bold text-[#0047AB] flex items-center gap-1">
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              {msg.bookingCard.service}
                            </div>
                            <div className="text-slate-600 flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-slate-400" />
                              {msg.bookingCard.date}
                            </div>
                            <div className="text-[10px] text-emerald-700 font-medium">
                              {msg.bookingCard.status}
                            </div>
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 px-1">
                        {msg.time}
                      </span>
                    </div>
                  ))}

                  {visibleMessagesCount < mockConversation.length && (
                    <div className="flex items-center gap-1.5 text-slate-400 text-[10px] px-2 py-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0047AB] animate-ping"></span>
                      Starto AI is replying in 6 seconds...
                    </div>
                  )}
                </div>

                {/* Simulated Input Area */}
                <div className="bg-white p-2.5 border-t border-slate-200 flex items-center gap-2">
                  <div className="flex-1 bg-slate-100 rounded-full px-3 py-1.5 text-[11px] text-slate-400">
                    Type a message...
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#0047AB] text-white flex items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
