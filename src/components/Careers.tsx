import React from 'react';
import { Mail, ArrowRight, Briefcase, Sparkles, MapPin, Code, Cpu, Headphones } from 'lucide-react';

export default function Careers() {
  const openRoles = [
    {
      title: 'Senior AI Systems Engineer',
      department: 'Engineering',
      location: 'Remote (US / UK / Global)',
      type: 'Full-time',
      description: 'Architect low-latency conversational agents, CRM dispatch sync pipelines, and domain-grounded LLM workflows for home service contractors.'
    },
    {
      title: 'HVAC Solutions & Onboarding Specialist',
      department: 'Operations',
      location: 'Remote (US / UK)',
      type: 'Full-time',
      description: 'Partner directly with HVAC fleet owners to map dispatch logic, emergency triage rules, and ServiceTitan/Housecall Pro calendar workflows.'
    },
    {
      title: 'Full-Stack Product Engineer',
      department: 'Product',
      location: 'Remote (Global)',
      type: 'Full-time',
      description: 'Build responsive client dashboards, analytics interfaces, and real-time webhook monitors with React, TypeScript, and modern backend services.'
    }
  ];

  return (
    <section id="careers" className="py-20 md:py-28 bg-[#F8FAFC] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0047AB] mb-3">
            <span>Careers at Starto</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-slate-500">We're Growing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B132B] tracking-tight leading-tight">
            Join the Starto Team
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            We are engineering the fastest, most reliable 24/7 AI booking infrastructure for essential trades across the United States and the United Kingdom.
          </p>
        </div>

        {/* Roles List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {openRoles.map((role, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 hover:border-[#0047AB]/30 hover:shadow-lg hover:shadow-[#0047AB]/5 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="font-semibold text-[#0047AB]">{role.department}</span>
                  <span className="text-slate-400">{role.type}</span>
                </div>

                <h3 className="text-lg font-bold text-[#0B132B] mb-2 tracking-tight">
                  {role.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {role.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {role.location}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Direct CV Submission Card */}
        <div className="bg-gradient-to-br from-[#0B132B] to-[#0047AB] rounded-2xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Don't see an exact match? We still want to hear from you.
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              If you are passionate about building conversational automation and mission-critical software for service businesses, send your CV to <strong className="text-[#00D2FF]">mahiraj@trystarto.com</strong>.
            </p>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <a
              href="mailto:mahiraj@trystarto.com?subject=Job%20Application%20-%20Starto%20Team&body=Hi%20Mahiraj%2C%0A%0AI'm%20interested%20in%20joining%20the%20Starto%20team.%20Attached%20is%20my%20CV.%0A%0ABest%20regards%2C"
              className="w-full sm:w-auto py-4 px-8 rounded-xl font-bold text-[#0B132B] bg-[#00D2FF] hover:bg-cyan-300 shadow-xl shadow-[#00D2FF]/20 transition-all text-sm flex items-center justify-center gap-2.5 group cursor-pointer"
            >
              <Mail className="w-4 h-4 text-[#0B132B]" />
              <span>Send your CV to mahiraj@trystarto.com</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
