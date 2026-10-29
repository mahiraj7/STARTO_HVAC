import React, { useState } from 'react';
import { DollarSign, PoundSterling, TrendingUp, ArrowRight, Calculator, ShieldCheck } from 'lucide-react';

interface RoiCalculatorProps {
  onOpenDemo: (plan?: string) => void;
}

export default function RoiCalculator({ onOpenDemo }: RoiCalculatorProps) {
  const [currency, setCurrency] = useState<'USD' | 'GBP'>('USD');
  const [monthlyInquiries, setMonthlyInquiries] = useState<number>(85);
  const [avgJobValue, setAvgJobValue] = useState<number>(1250);
  const [afterHoursRate, setAfterHoursRate] = useState<number>(25); // 25% after hours/delayed
  const [conversionRate, setConversionRate] = useState<number>(35); // 35% close rate

  // When currency changes, adapt default job values nicely
  const handleCurrencyChange = (curr: 'USD' | 'GBP') => {
    setCurrency(curr);
    if (curr === 'GBP' && avgJobValue === 1250) {
      setAvgJobValue(950);
    } else if (curr === 'USD' && avgJobValue === 950) {
      setAvgJobValue(1250);
    }
  };

  // Calculations
  const missedInquiriesPerMonth = Math.round((monthlyInquiries * afterHoursRate) / 100);
  const recoveredJobsPerMonth = Math.max(1, Math.round((missedInquiriesPerMonth * conversionRate) / 100));
  const extraMonthlyRevenue = recoveredJobsPerMonth * avgJobValue;
  const extraAnnualRevenue = extraMonthlyRevenue * 12;

  // Approximate cost of Starto Pro ($899/mo or £699/mo)
  const estimatedCost = currency === 'USD' ? 899 * 12 : 699 * 12;
  const roiMultiplier = Math.round((extraAnnualRevenue / estimatedCost) * 10) / 10;

  const symbol = currency === 'USD' ? '$' : '£';

  return (
    <section id="calculator" className="py-20 md:py-28 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0047AB] mb-3">
            <span>ROI Calculator</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-slate-500">Transparent HVAC Math</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B132B] tracking-tight leading-tight">
            How Much Revenue Is Your HVAC Business Leaking To Delayed Replies?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            When a homeowner or property manager reaches out after 6:00 PM or on a busy Sunday, 78% book with the first company to reply. See your exact recovery potential:
          </p>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center gap-2 mb-8">
          <span className="text-xs font-semibold text-slate-600">Region & Currency:</span>
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => handleCurrencyChange('USD')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                currency === 'USD'
                  ? 'bg-white text-[#0047AB] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>United States (USD)</span>
            </button>
            <button
              onClick={() => handleCurrencyChange('GBP')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                currency === 'GBP'
                  ? 'bg-white text-[#0047AB] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PoundSterling className="w-3.5 h-3.5" />
              <span>United Kingdom (GBP)</span>
            </button>
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-[#F8FAFC] rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-7">
            {/* Slider 1: Inbound Calls / Inquiries */}
            <div>
              <div className="flex items-center justify-between text-sm mb-2 font-medium">
                <label className="text-slate-800 font-bold">
                  Total Monthly Inbound Inquiries
                </label>
                <span className="text-[#0047AB] font-extrabold text-base tabular-nums bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                  {monthlyInquiries} leads / mo
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="350"
                step="5"
                value={monthlyInquiries}
                onChange={(e) => setMonthlyInquiries(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0047AB]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>20 calls (solo van)</span>
                <span>150 calls (mid-sized fleet)</span>
                <span>350+ calls (regional)</span>
              </div>
            </div>

            {/* Slider 2: Average HVAC Job Value */}
            <div>
              <div className="flex items-center justify-between text-sm mb-2 font-medium">
                <label className="text-slate-800 font-bold">
                  Average Ticket Value per HVAC Job
                </label>
                <span className="text-[#0047AB] font-extrabold text-base tabular-nums bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                  {symbol}{avgJobValue.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="250"
                max="3500"
                step="50"
                value={avgJobValue}
                onChange={(e) => setAvgJobValue(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0047AB]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>{symbol}250 (Basic Tune-Up)</span>
                <span>{symbol}1,250 (Standard Repair)</span>
                <span>{symbol}3,500+ (Full System Replacement)</span>
              </div>
            </div>

            {/* Slider 3: After Hours / Missed % */}
            <div>
              <div className="flex items-center justify-between text-sm mb-2 font-medium">
                <label className="text-slate-800 font-bold">
                  Estimated Inquiries After-Hours or During Peak
                </label>
                <span className="text-[#0047AB] font-extrabold text-base tabular-nums bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                  {afterHoursRate}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                step="5"
                value={afterHoursRate}
                onChange={(e) => setAfterHoursRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0047AB]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>10% (Low off-hours)</span>
                <span>25% (Industry Average)</span>
                <span>50% (High emergency share)</span>
              </div>
            </div>

            {/* Slider 4: Conversion Rate on Immediate Reply */}
            <div>
              <div className="flex items-center justify-between text-sm mb-2 font-medium">
                <label className="text-slate-800 font-bold">
                  Conversion Rate With Sub-10s Auto Booking
                </label>
                <span className="text-[#0047AB] font-extrabold text-base tabular-nums bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                  {conversionRate}%
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="60"
                step="5"
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0047AB]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>15% (Conservative)</span>
                <span>35% (Typical for Starto clients)</span>
                <span>60% (High emergency markets)</span>
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0B132B] to-[#0d1c44] rounded-2xl p-6 sm:p-8 text-white shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-700/80">
              <span className="text-xs uppercase tracking-wider text-[#00D2FF] font-extrabold">
                Calculated Potential
              </span>
              <span className="text-xs text-slate-400">
                Based on your inputs
              </span>
            </div>

            <div>
              <span className="text-xs text-slate-300">Recovered Bookings Each Month</span>
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1 tabular-nums">
                +{recoveredJobsPerMonth} <span className="text-lg font-bold text-slate-300">jobs / month</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                That's {recoveredJobsPerMonth * 12} additional service calls per year previously lost to faster-responding competitors.
              </p>
            </div>

            <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-3">
              <div>
                <span className="text-xs text-slate-300">Extra Monthly Revenue</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#00D2FF] tabular-nums">
                  +{symbol}{extraMonthlyRevenue.toLocaleString()}
                </div>
              </div>
              <div className="pt-2 border-t border-white/10">
                <span className="text-xs text-slate-300">Extra Annual Revenue</span>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight tabular-nums">
                  +{symbol}{extraAnnualRevenue.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
              <span>Estimated ROI on Starto:</span>
              <span className="font-extrabold text-emerald-400 text-sm tabular-nums">
                ~{roiMultiplier}x Return
              </span>
            </div>

            <button
              onClick={() => onOpenDemo(`ROI Calculator - Potential +${symbol}${extraMonthlyRevenue.toLocaleString()}/mo`)}
              className="w-full py-4 px-6 rounded-xl font-bold text-[#0B132B] bg-[#00D2FF] hover:bg-cyan-300 shadow-xl shadow-[#00D2FF]/20 transition-all text-sm flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Capture This Revenue · Book Demo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>No long-term lock-in · 14-day risk-free launch</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
