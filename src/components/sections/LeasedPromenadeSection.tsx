import React from 'react';
import { LEASED_BUSINESSES } from '../../data/hubData';
import { Store, Coffee, Utensils, Clock, Phone, Building2, ArrowUpRight } from 'lucide-react';

interface LeasedPromenadeSectionProps {
  onOpenLeasingModal: () => void;
}

export const LeasedPromenadeSection: React.FC<LeasedPromenadeSectionProps> = ({ onOpenLeasingModal }) => {
  return (
    <section id="promenade" className="py-20 lg:py-28 bg-[#04060a] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Micro-Section Luxury Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-slate-400 mb-3">
              <Store className="w-3.5 h-3.5 text-amber-400" />
              <span>THE CONCESSIONAIRE ARCADE · MICRO-SECTION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Commercial Promenade &amp; Leased Spaces
            </h2>
            <p className="mt-3 text-sm text-slate-400 max-w-xl font-light leading-relaxed">
              In addition to our five original flagship divisions, Master Energy provides prime commercial real estate for artisanal culinary and specialty brands.
            </p>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={onOpenLeasingModal}
              className="flex items-center gap-2.5 px-6 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-amber-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-amber-400/30 transition-all cursor-pointer hover:border-amber-400"
            >
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>Apply for Retail Lease</span>
            </button>
          </div>
        </div>

        {/* 2 Concession Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {LEASED_BUSINESSES.map((business) => {
            const isZena = business.id === 'zena-foodies';
            const Icon = isZena ? Utensils : Coffee;

            return (
              <div
                key={business.id}
                className="p-8 sm:p-10 rounded-3xl bg-[#090d16] border border-white/10 hover:border-amber-400/20 transition-all flex flex-col justify-between shadow-2xl relative overflow-hidden group"
              >
                <div className="space-y-6">
                  {/* Concessionaire Micro Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20">
                      {business.leaseBadge} · {business.unitNumber}
                    </span>
                    <Icon className="w-5 h-5 text-amber-400" />
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                      {business.name}
                    </h3>
                    <div className="mt-1 text-xs font-mono uppercase tracking-wider text-amber-400">
                      {business.category}
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 font-light leading-relaxed">
                    {business.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{business.hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>{business.phone}</span>
                    </div>
                  </div>

                  {/* Offerings Menu */}
                  <div className="pt-6 border-t border-white/10 space-y-3">
                    <div className="font-mono text-[11px] uppercase tracking-widest text-slate-400 font-bold">
                      Signature Specialties
                    </div>
                    <div className="space-y-2.5">
                      {business.offerings.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start justify-between gap-4 p-3 rounded-xl bg-black/40 border border-white/5"
                        >
                          <div>
                            <div className="font-semibold text-white text-xs">{item.name}</div>
                            <div className="text-[11px] text-slate-400 font-light mt-0.5">{item.description}</div>
                          </div>
                          <span className="font-mono font-bold text-xs text-amber-400 shrink-0">
                            {item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-2 font-mono text-[11px] text-slate-400">
                  {business.specialties.map((spec, sIdx) => (
                    <span key={sIdx} className="text-slate-300">
                      {spec} {sIdx < business.specialties.length - 1 ? '·' : ''}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Commercial Space Callout */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-[#090d16] to-[#090d16] border border-amber-400/20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 shadow-lg">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white font-display">
                Position Your Brand on the Aba-Owerri Expressway
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-light">
                High-volume highway footfall, 24/7 uninterrupted power, and commercial banking traffic at Naze Mega Station.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenLeasingModal}
            className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl transition-all whitespace-nowrap cursor-pointer shadow-lg shadow-amber-500/20 hover:scale-105"
          >
            Lease Kiosk or Retail Unit
          </button>
        </div>
      </div>
    </section>
  );
};
