import React, { useState } from 'react';
import { Check, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';

interface PricingProps {
  onOpenDemo: (plan?: string) => void;
}

export default function Pricing({ onOpenDemo }: PricingProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [currency, setCurrency] = useState<'USD' | 'GBP'>('USD');

  const symbol = currency === 'USD' ? '$' : '£';

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      badge: null,
      description: 'Ideal for solo operators and 1–2 van HVAC companies needing after-hours & weekend coverage.',
      monthlyPrice: currency === 'USD' ? 499 : 399,
      annualPrice: currency === 'USD' ? 419 : 339,
      features: [
        '1 Primary Inbound Channel (Website Chat OR Missed-Call SMS)',
        'Up to 150 automated qualified bookings/month',
        'Custom business hours & emergency routing',
        'Standard Google Calendar & Outlook direct sync',
        'Instant SMS & email technician dispatch alerts',
        'US or UK HVAC terminology customization',
        'Standard email support (24h response)'
      ],
      cta: 'Get Starter Plan',
      isPopular: false
    },
    {
      id: 'growth',
      name: 'Growth',
      badge: 'Most Popular for HVAC Fleets',
      description: 'Built for 3–8 van companies aiming to eliminate phone tag and lock in every emergency replacement.',
      monthlyPrice: currency === 'USD' ? 899 : 699,
      annualPrice: currency === 'USD' ? 749 : 589,
      features: [
        'All Channels (Web Chat + Missed-Call SMS + WhatsApp)',
        'Unlimited automated qualified bookings & triage',
        'Two-way sync: ServiceTitan, Housecall Pro, Jobber',
        'HVAC triage intelligence (AC vs furnace vs heat pump)',
        'Emergency escalation rules (infants, elderly, sub-freezing/heatwave)',
        'Dedicated onboarding technician & test run',
        'Priority Slack & Phone Support'
      ],
      cta: 'Get Growth Plan',
      isPopular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise / Multi-Van',
      badge: 'High-Volume & Multi-Branch',
      description: 'Tailored for regional HVAC contractors with multiple branches, zip codes, and dedicated dispatchers.',
      monthlyPrice: currency === 'USD' ? 1499 : 1199,
      annualPrice: currency === 'USD' ? 1249 : 999,
      features: [
        'Multi-location & branch territory routing',
        'Custom IVR & automated phone voice assistant routing',
        'Maintenance agreement / Club membership upsells',
        'Bespoke CRM integrations & custom webhooks',
        'Technician zone-based dispatch rules',
        '99.99% uptime SLA & dedicated account manager',
        'Quarterly dispatch optimization reviews'
      ],
      cta: 'Get Enterprise Plan',
      isPopular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#0047AB] mb-3">
            <span>Simple Transparent Pricing</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>No Hidden Booking Commissions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B132B] tracking-tight leading-tight">
            One Single Extra AC Replacement Pays For An Entire Year
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Flat predictable monthly pricing. No percentages taken from your hard-earned invoices. Cancel anytime with 14-day onboarding guarantee.
          </p>

          {/* Controls: Billing cycle & Currency */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            {/* Currency toggle */}
            <div className="inline-flex p-1 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  currency === 'USD' ? 'bg-[#0047AB] text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency('GBP')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  currency === 'GBP' ? 'bg-[#0047AB] text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                GBP (£)
              </button>
            </div>

            {/* Monthly / Annual toggle */}
            <div className="inline-flex items-center p-1 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  billingCycle === 'monthly' ? 'bg-[#0047AB] text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  billingCycle === 'annual' ? 'bg-[#0047AB] text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Annual</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-semibold">
                  Save 15%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
            return (
              <div
                key={plan.id}
                className={`rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all relative ${
                  plan.isPopular
                    ? 'bg-white border-2 border-[#0047AB] shadow-xl shadow-[#0047AB]/10 scale-100 lg:-translate-y-2'
                    : 'bg-white border border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Popular label */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#0047AB] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-black text-[#0B132B] tracking-tight">
                      {plan.name}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 min-h-[36px] mb-6">
                    {plan.description}
                  </p>

                  <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-slate-100">
                    <span className="text-4xl sm:text-5xl font-black text-[#0B132B] tracking-tight tabular-nums">
                      {symbol}{price}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      / month {billingCycle === 'annual' && '(billed annually)'}
                    </span>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      What's Included:
                    </div>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-normal">
                        <Check className="w-4 h-4 text-[#0047AB] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => onOpenDemo(`${plan.name} Plan (${symbol}${price}/mo)`)}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      plan.isPopular
                        ? 'bg-[#0047AB] hover:bg-[#003d94] text-white shadow-lg shadow-[#0047AB]/25 hover:shadow-[#0047AB]/35'
                        : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
                    }`}
                  >
                    <span>{plan.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <div className="text-center text-[11px] text-slate-400 mt-2.5">
                    14-day setup & testing period
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote on Integrations & Guarantee */}
        <div className="mt-12 text-center text-xs text-slate-500 max-w-2xl mx-auto space-y-1">
          <p>
            Compatible with ServiceTitan, Jobber, Housecall Pro, Google Calendar, and standard VoIP/phone lines.
          </p>
          <p className="text-slate-400">
            Need a tailored fleet rollout or multi-state dispatcher routing? Contact our team directly at mahiraj@trystarto.com.
          </p>
        </div>
      </div>
    </section>
  );
}
