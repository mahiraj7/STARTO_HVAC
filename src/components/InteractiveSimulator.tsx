import React, { useState } from 'react';
import { Send, CheckCircle2, RotateCcw, Calendar, MapPin, User, Phone, Flame, Snowflake, Building2, Wrench } from 'lucide-react';

interface InteractiveSimulatorProps {
  onOpenDemo: (plan?: string) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
  bookingDetails?: {
    jobType: string;
    slot: string;
    address: string;
    phone: string;
    status: string;
  };
}

interface Scenario {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: React.ElementType;
  initialMessages: Message[];
  suggestedReplies: string[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'emergency-ac',
    title: 'Emergency AC Breakdown',
    subtitle: 'Saturday Night · 96°F Heatwave',
    badge: 'High-Urgency Emergency',
    icon: Snowflake,
    initialMessages: [
      {
        id: '1',
        sender: 'user',
        text: "Help! Our AC just stopped blowing cold air about an hour ago. The house is already 86 degrees and we have a 4-month-old baby. Is anyone available tomorrow?",
        time: '11:15 PM'
      },
      {
        id: '2',
        sender: 'bot',
        text: "Hi there, this is Starto with Metro Heating & Air. We have emergency technicians on standby for extreme heat. Is the outdoor unit running or completely silent?",
        time: '11:15 PM · 7s reply'
      },
      {
        id: '3',
        sender: 'user',
        text: "The outside fan is spinning, but the air coming out of our indoor vents feels lukewarm and humid.",
        time: '11:16 PM'
      },
      {
        id: '4',
        sender: 'bot',
        text: "Thank you for the detail — that typically indicates low refrigerant or compressor pressure loss. Because you have an infant in high temperatures, I've prioritized your ticket. I have an 8:00 AM – 10:00 AM slot tomorrow with senior tech Dave. Can I lock that in for you?",
        time: '11:16 PM · 8s reply'
      }
    ],
    suggestedReplies: [
      "Yes please! 724 Oakwood Lane, Austin TX. Call (512) 555-0812",
      "What is your emergency dispatch callout fee?",
      "Can we do later around 11:00 AM instead?"
    ]
  },
  {
    id: 'furnace-tuneup',
    title: 'Seasonal Heat Pump & Furnace Service',
    subtitle: 'Weekday Afternoon · Fall Preventive Care',
    badge: 'Routine Maintenance',
    icon: Flame,
    initialMessages: [
      {
        id: '1',
        sender: 'user',
        text: "Hi, I want to get our dual-zone heat pump and gas furnace inspected and cleaned before the cold weather hits next month. Do you have any tune-up specials?",
        time: '2:14 PM'
      },
      {
        id: '2',
        sender: 'bot',
        text: "Hello! Absolutely — our 21-point Fall Heating Tune-Up is $99 per system (or included free in our Annual Comfort Club). We inspect burners, heat exchangers, test safety limits, and replace standard air filters. Would Tuesday or Thursday afternoon work better?",
        time: '2:14 PM · 5s reply'
      },
      {
        id: '3',
        sender: 'user',
        text: "Thursday afternoon around 1:00 PM would be great for both units.",
        time: '2:15 PM'
      },
      {
        id: '4',
        sender: 'bot',
        text: "Perfect. We have a 1:00 PM – 3:00 PM arrival window this Thursday. What's the address for the service call, and the best homeowner contact number?",
        time: '2:15 PM · 6s reply'
      }
    ],
    suggestedReplies: [
      "Address is 19 Maple Crescent, cell is 07700 900482",
      "Do your technicians wear shoe covers inside the home?",
      "Can we also add duct sanitization to this appointment?"
    ]
  },
  {
    id: 'commercial-rtu',
    title: 'Commercial RTU & Duct Issue',
    subtitle: 'Monday Morning · Retail Space',
    badge: 'Commercial Service',
    icon: Building2,
    initialMessages: [
      {
        id: '1',
        sender: 'user',
        text: "Good morning. I manage a 3,500 sq ft retail store. One of our rooftop 5-ton packaged units is vibrating loudly and leaking water through the ceiling tiles near the front checkout.",
        time: '7:45 AM'
      },
      {
        id: '2',
        sender: 'bot',
        text: "Good morning! We handle commercial RTU diagnostics immediately to prevent ceiling and inventory damage. The vibration and water leak suggest a blocked condensate drain line or unseated blower assembly. We can dispatch a certified commercial tech by 9:30 AM today. What is the business address?",
        time: '7:45 AM · 8s reply'
      }
    ],
    suggestedReplies: [
      "1420 Commerce Blvd, Suite 102. Phone is (415) 555-8931",
      "Can the tech access our roof via exterior ladder?",
      "Do you provide a formal commercial diagnostic invoice for insurance?"
    ]
  }
];

export default function InteractiveSimulator({ onOpenDemo }: InteractiveSimulatorProps) {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('emergency-ac');
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    'emergency-ac': [...SCENARIOS[0].initialMessages],
    'furnace-tuneup': [...SCENARIOS[1].initialMessages],
    'commercial-rtu': [...SCENARIOS[2].initialMessages]
  });
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const activeScenario = SCENARIOS.find(s => s.id === activeScenarioId) || SCENARIOS[0];
  const currentMessages = messages[activeScenarioId] || [];

  const handleReset = (scenarioId: string) => {
    const original = SCENARIOS.find(s => s.id === scenarioId);
    if (original) {
      setMessages(prev => ({
        ...prev,
        [scenarioId]: [...original.initialMessages]
      }));
    }
  };

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      time: 'Just now'
    };

    const updated = [...currentMessages, userMsg];
    setMessages(prev => ({
      ...prev,
      [activeScenarioId]: updated
    }));
    setInputVal('');
    setIsTyping(true);

    // Simulate smart HVAC domain bot response
    setTimeout(() => {
      let botResponseText = "";
      let bookingDetails: Message['bookingDetails'];

      const lower = textToSend.toLowerCase();

      if (lower.includes('oakwood') || lower.includes('address') || lower.includes('maple') || lower.includes('commerce') || lower.includes('yes') || lower.includes('lock') || lower.includes('724') || lower.includes('19') || lower.includes('1420')) {
        botResponseText = "✅ Booked and confirmed! I've reserved that exact arrival window on our dispatch board. Our technician will text you 15 minutes prior to arrival. Here is your service summary:";
        bookingDetails = {
          jobType: activeScenarioId === 'emergency-ac' ? 'Priority Emergency AC Repair' : activeScenarioId === 'furnace-tuneup' ? '21-Point Fall Heating Inspection' : 'Commercial RTU Diagnostic & Leak Stop',
          slot: activeScenarioId === 'emergency-ac' ? 'Tomorrow, 8:00 AM – 10:00 AM' : activeScenarioId === 'furnace-tuneup' ? 'This Thursday, 1:00 PM – 3:00 PM' : 'Today, 9:30 AM – 11:30 AM',
          address: textToSend.length > 25 ? textToSend.substring(0, 45) : 'Client Property on File',
          phone: '(Verified via SMS/Chat)',
          status: 'Synced to CRM & Assigned to On-Call Tech'
        };
      } else if (lower.includes('fee') || lower.includes('cost') || lower.includes('price')) {
        botResponseText = "Our standard diagnostic visit is $89 (credited directly toward any repair if you approve the quote). There are never hidden fees, and you'll get upfront flat-rate options before any tool touches your unit.";
      } else if (lower.includes('shoe') || lower.includes('clean') || lower.includes('floor')) {
        botResponseText = "Yes, 100%! All our technicians wear protective floor boot covers, lay down clean work mats, and clean up completely after service.";
      } else if (lower.includes('ladder') || lower.includes('roof') || lower.includes('access')) {
        botResponseText = "Understood. Our commercial service vans are equipped with OSHA-certified 28-foot extension ladders and roof safety harnesses. We are fully licensed & insured.";
      } else if (lower.includes('insurance') || lower.includes('invoice')) {
        botResponseText = "Yes. Following diagnosis, our technician provides a detailed digital itemized breakdown with photos and cause of failure for your records or insurance claims.";
      } else {
        botResponseText = "Got it! I've noted that for the technician. To ensure we have our tech routed properly, please provide your service address and preferred phone number so I can send the calendar confirmation.";
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponseText,
        time: 'Just now · 6s reply',
        bookingDetails
      };

      setMessages(prev => ({
        ...prev,
        [activeScenarioId]: [...updated, botMsg]
      }));
      setIsTyping(false);
    }, 1200);
  };

  return (
    <section id="simulator" className="py-20 md:py-28 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#0047AB] mb-3">
            <span>Interactive Simulator</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Real HVAC Scenarios</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B132B] tracking-tight leading-tight">
            Test How Starto Handles Your After-Hours HVAC Inquiries
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Switch between real-world situations: an emergency weekend AC outage, routine seasonal furnace care, or commercial retail diagnostics. Click suggested replies or type your own.
          </p>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {SCENARIOS.map((scenario) => {
            const Icon = scenario.icon;
            const isActive = activeScenarioId === scenario.id;
            return (
              <button
                key={scenario.id}
                onClick={() => setActiveScenarioId(scenario.id)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0047AB] text-white shadow-md shadow-[#0047AB]/25'
                    : 'bg-white text-slate-700 hover:text-slate-950 border border-slate-200/90 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#00D2FF]' : 'text-slate-500'}`} />
                <span className="whitespace-nowrap">{scenario.title}</span>
              </button>
            );
          })}
        </div>

        {/* Simulation Window Container */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200/80 shadow-xl overflow-hidden">
          {/* Top Bar of the simulator */}
          <div className="px-6 py-4 bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0047AB] to-[#00D2FF] text-white flex items-center justify-center font-black text-sm shadow-sm">
                S
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm tracking-tight text-white">{activeScenario.title}</h3>
                  <span className="text-[11px] text-[#00D2FF] font-medium bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded-md">
                    {activeScenario.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-400">{activeScenario.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <button
                onClick={() => handleReset(activeScenarioId)}
                className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                title="Reset this scenario conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Chat</span>
              </button>

              <button
                onClick={() => onOpenDemo(`Simulator - ${activeScenario.title}`)}
                className="text-xs font-bold text-white bg-[#0047AB] hover:bg-[#003d94] px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                Book Custom Demo
              </button>
            </div>
          </div>

          {/* Chat Messages Box */}
          <div className="p-4 sm:p-6 bg-[#F8FAFC] min-h-[380px] max-h-[500px] overflow-y-auto space-y-4">
            {currentMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-in fade-in duration-200`}
              >
                <div
                  className={`max-w-[88%] sm:max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#0047AB] text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Booking Confirmation Card if present */}
                  {msg.bookingDetails && (
                    <div className="mt-3.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Dispatch Dispatched & Synced</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-slate-200">
                        <div className="space-y-0.5">
                          <span className="text-[11px] text-slate-400">Job Service:</span>
                          <p className="font-semibold text-slate-800">{msg.bookingDetails.jobType}</p>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[11px] text-slate-400">Arrival Window:</span>
                          <p className="font-semibold text-slate-800 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-[#0047AB]" />
                            {msg.bookingDetails.slot}
                          </p>
                        </div>
                      </div>
                      <div className="text-[11px] text-slate-500 pt-1">
                        Status: <span className="font-medium text-[#0047AB]">{msg.bookingDetails.status}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-1 px-1">
                  <span className="text-[11px] text-slate-400">
                    {msg.sender === 'user' ? 'Homeowner' : 'Starto AI'} · {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs px-2 py-1">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#0047AB] animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-[#0047AB] animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#0047AB] animate-bounce [animation-delay:0.4s]"></span>
                </div>
                <span>Starto is reviewing technician schedule...</span>
              </div>
            )}
          </div>

          {/* Quick Click Prompts */}
          <div className="px-4 sm:px-6 py-3 bg-white border-t border-slate-200/80">
            <div className="text-[11px] font-semibold text-slate-500 mb-2">
              Try a quick response or ask a question:
            </div>
            <div className="flex flex-wrap gap-2">
              {activeScenario.suggestedReplies.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(reply)}
                  className="text-xs bg-slate-100 hover:bg-[#0047AB]/10 text-slate-700 hover:text-[#0047AB] border border-slate-200 hover:border-[#0047AB]/30 px-3 py-1.5 rounded-lg transition-colors text-left cursor-pointer"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          {/* Message Input Box */}
          <div className="p-4 bg-white border-t border-slate-200 flex items-center gap-3">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSendMessage(inputVal);
                }
              }}
              placeholder="Type any HVAC customer question or reply (e.g. 'Can I book for Monday at 9am?')..."
              className="flex-1 bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0047AB]/20 focus:border-[#0047AB] rounded-xl px-4 py-2.5 text-sm text-[#0B132B] placeholder:text-slate-400 transition-colors"
            />
            <button
              onClick={() => handleSendMessage(inputVal)}
              disabled={!inputVal.trim() || isTyping}
              className="p-2.5 rounded-xl text-white bg-[#0047AB] hover:bg-[#003d94] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
