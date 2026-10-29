import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';

interface FaqProps {
  onOpenDemo: (plan?: string) => void;
}

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How quickly can Starto be live on our HVAC website and phone lines?",
    answer: "Typically within 24 to 48 hours. Our team configures your service territories, pricing guidelines, emergency rules, and technician schedules. We run a full round of test calls with you before flipping the switch live."
  },
  {
    question: "Does it work with our existing CRM like ServiceTitan, Housecall Pro, or Jobber?",
    answer: "Yes. Starto connects directly with major field service management platforms including ServiceTitan, Housecall Pro, Jobber, and Google Calendar. When an appointment is locked, customer contact info, service address, and triage notes automatically populate your dispatch board."
  },
  {
    question: "How does the missed-call auto-text back feature work?",
    answer: "When a homeowner calls your business line while your technicians are on a roof or after office hours, Starto immediately triggers an SMS within 6 seconds: 'Hi! You've reached Apex Air. Sorry we missed you—are you experiencing an emergency breakdown or looking to schedule service?' 82% of homeowners reply immediately rather than calling your competitor."
  },
  {
    question: "What happens if a homeowner asks a complex question Starto doesn't know?",
    answer: "Starto never guesses or hallucinates. If an inquiry falls outside your configured rules (e.g. an obscure vintage boiler part or legal warranty dispute), Starto politely captures the full details, flags the ticket with high priority, and instantly alerts your manager via SMS or email for human review."
  },
  {
    question: "Can Starto differentiate between an emergency breakdown and routine maintenance?",
    answer: "Yes. Starto is trained specifically on HVAC workflows. In sub-freezing winter weather or 95°F+ summer heatwaves, it identifies vulnerable scenarios (e.g., infants, elderly, complete loss of heat or AC) and routes them straight to emergency dispatch while scheduling routine seasonal tune-ups for regular business hours."
  },
  {
    question: "Does Starto support both US and UK HVAC terminology?",
    answer: "Yes. For US contractors, Starto speaks fluently about furnaces, AC condensers, mini-splits, SEER ratings, and tonnage. For UK heating engineers, it natively adapts to combi boilers, radiators, unvented cylinders, heat pumps, and Gas Safe references."
  },
  {
    question: "Do we need any technical staff or engineers on our team to manage this?",
    answer: "None whatsoever. Starto is fully managed. You tell us your diagnostic fee, your service zones, and your preferred arrival windows, and we handle the technical configuration, testing, and CRM maintenance."
  }
];

export default function Faq({ onOpenDemo }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#0047AB] mb-3">
            <span>Frequently Asked Questions</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>HVAC Operations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B132B] tracking-tight leading-tight">
            Clear Answers For Busy HVAC Owners
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed font-normal">
            Everything you need to know about setting up 24/7 AI dispatch without disrupting your daily van schedule.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-[#F8FAFC] rounded-2xl border border-slate-200/90 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-100/60 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base text-[#0B132B] tracking-tight">
                    {item.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 text-slate-600 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#0047AB]' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 animate-in fade-in duration-200">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 text-center p-6 bg-slate-50 border border-slate-200 rounded-2xl">
          <h3 className="text-sm font-bold text-slate-900 mb-1">
            Have a question about your specific dispatch software or phone setup?
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            We'll inspect your workflow on a quick 15-minute screen share.
          </p>
          <button
            onClick={() => onOpenDemo('FAQ Bottom - Specific Question')}
            className="py-2.5 px-5 rounded-xl text-xs font-bold text-white bg-[#0047AB] hover:bg-[#003d94] shadow-md shadow-[#0047AB]/20 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>Ask Our Automation Lead</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
