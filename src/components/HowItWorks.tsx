import React from 'react';
import { PhoneForwarded, Cpu, CalendarCheck2, BellRing, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onOpenDemo: (plan?: string) => void;
}

export default function HowItWorks({ onOpenDemo }: HowItWorksProps) {
  const steps = [
    {
      step: '01',
      title: 'Connect Your Inbound Channels',
      description: 'Starto links seamlessly to your existing phone line (for instant missed-call text back), your website chat, and Google Business profile. Zero carrier changes or complex IT setups.',
      icon: PhoneForwarded,
      tag: 'Zero-downtime setup',
      highlight: 'Missed-call SMS & Web Widget'
    },
    {
      step: '02',
      title: 'AI Qualifies The HVAC Issue',
      description: 'Unlike generic bots, Starto understands HVAC. It asks diagnostic questions: AC vs furnace, unit age, unusual noises, error codes, and whether there are vulnerable persons in extreme temperatures.',
      icon: Cpu,
      tag: 'Domain-trained triage',
      highlight: 'Emergency vs Routine'
    },
    {
      step: '03',
      title: 'Direct Calendar & CRM Booking',
      description: 'Starto checks real-time technician availability within your service zones, presents available 2-hour arrival windows, collects the job address, and locks the appointment into your scheduling software.',
      icon: CalendarCheck2,
      tag: 'Real-time schedule lock',
      highlight: 'ServiceTitan, Jobber, HCP'
    },
    {
      step: '04',
      title: 'Technician Dispatch Notification',
      description: 'Before your tech rolls out, they receive an automated text with the homeowner’s exact issue, equipment brand, symptoms, and gate access code so they arrive prepared to close the job.',
      icon: BellRing,
      tag: 'Full diagnostic summary',
      highlight: 'Instant SMS & Email Alerts'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0047AB] mb-3">
            <span>Seamless Workflow</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-slate-500">From Missed Call To Confirmed Dispatch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B132B] tracking-tight leading-tight">
            How Starto Turns Delayed Replies Into Paid Invoices
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            When a homeowner's heat fails in January or AC quits in July, they call 3 contractors and book whoever answers first. Starto ensures you are always the first to respond and confirm.
          </p>
        </div>

        {/* 4-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200/80 flex flex-col justify-between hover:border-[#0047AB]/30 hover:shadow-lg hover:shadow-[#0047AB]/5 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-black text-slate-300 group-hover:text-[#0047AB] transition-colors tabular-nums">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#0047AB] group-hover:scale-105 transition-transform shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[#0B132B] mb-2.5 tracking-tight group-hover:text-[#0047AB] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/70 flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#0047AB]">
                    {item.highlight}
                  </span>
                  <span className="text-slate-400">
                    {item.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action strip */}
        <div className="mt-14 p-6 sm:p-8 bg-gradient-to-r from-slate-900 to-[#0B132B] rounded-2xl text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <h4 className="text-lg sm:text-xl font-bold tracking-tight">
              Ready to see Starto working with your company name & pricing?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              We'll build a live interactive demo tailored to your exact city, service pricing, and technician roster.
            </p>
          </div>
          <button
            onClick={() => onOpenDemo('How It Works - Demo CTA')}
            className="py-3 px-6 rounded-xl font-bold text-[#0B132B] bg-[#00D2FF] hover:bg-cyan-300 shadow-md shadow-[#00D2FF]/20 transition-all text-xs sm:text-sm whitespace-nowrap shrink-0 cursor-pointer"
          >
            Get Custom Walkthrough
          </button>
        </div>
      </div>
    </section>
  );
}
