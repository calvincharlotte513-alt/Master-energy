import React from 'react';
import { motion } from 'motion/react';
import { LEASED_BUSINESSES } from '../../data/hubData';
import { Store, Coffee, Utensils, Clock, Phone, Building2 } from 'lucide-react';

interface LeasedPromenadeSectionProps {
  onOpenLeasingModal: () => void;
}

export const LeasedPromenadeSection: React.FC<LeasedPromenadeSectionProps> = ({ onOpenLeasingModal }) => {
  return (
    <section id="promenade" className="py-16 lg:py-24 bg-white border-t border-slate-200 relative w-full max-w-full overflow-hidden font-opensans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Micro-Section Luxury Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-8 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-orange-600 mb-3 font-bold">
              <Store className="w-3.5 h-3.5 text-orange-500" />
              <span>THE CONCESSIONAIRE ARCADE · MICRO-SECTION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-display">
              Commercial Promenade &amp; Leased Spaces
            </h2>
            <p className="mt-3 text-sm text-slate-600 max-w-xl font-normal leading-relaxed">
              In addition to our five original flagship divisions, Master Energy provides prime commercial real estate for artisanal culinary and specialty brands.
            </p>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={onOpenLeasingModal}
              className="flex items-center gap-2.5 px-6 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-950 bg-orange-500 hover:bg-orange-400 rounded-xl transition-all cursor-pointer shadow-md shadow-orange-500/20 hover:scale-105"
            >
              <Building2 className="w-4 h-4 text-slate-950" />
              <span>Apply for Retail Lease</span>
            </button>
          </div>
        </div>

        {/* 2 Concession Cards Grid - One Orange Box sliding in from Left, One Black Box sliding in from Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 overflow-hidden">
          {LEASED_BUSINESSES.map((business, idx) => {
            const isZena = business.id === 'zena-foodies';
            const Icon = isZena ? Utensils : Coffee;
            // First is Orange Box, Second is Black Box
            const isOrangeBox = idx === 0;
            const slideX = isOrangeBox ? -28 : 28;

            return (
              <motion.div
                key={business.id}
                initial={{ opacity: 0, x: slideX }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.38, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                style={{ willChange: 'transform, opacity' }}
                className={`p-8 sm:p-10 rounded-3xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group ${
                  isOrangeBox
                    ? 'bg-orange-500 text-slate-950 border-2 border-orange-600 shadow-xl hover:border-slate-950 hover:shadow-2xl'
                    : 'bg-slate-950 text-white border-2 border-orange-500/40 shadow-xl hover:border-orange-500 hover:shadow-2xl'
                }`}
              >
                <div className="space-y-6">
                  {/* Concessionaire Micro Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md shadow-xs ${
                      isOrangeBox
                        ? 'bg-slate-950 text-orange-400'
                        : 'bg-orange-500 text-slate-950'
                    }`}>
                      {business.leaseBadge} · {business.unitNumber}
                    </span>
                    <Icon className={`w-5 h-5 ${isOrangeBox ? 'text-slate-950' : 'text-orange-400'}`} />
                  </div>

                  <div>
                    <h3 className={`text-2xl sm:text-3xl font-extrabold font-display ${
                      isOrangeBox ? 'text-slate-950' : 'text-white'
                    }`}>
                      {business.name}
                    </h3>
                    <div className={`mt-1 text-xs font-mono uppercase tracking-wider font-bold ${
                      isOrangeBox ? 'text-slate-900' : 'text-orange-400'
                    }`}>
                      {business.category}
                    </div>
                  </div>

                  <p className={`text-sm leading-relaxed ${
                    isOrangeBox ? 'text-slate-950 font-medium' : 'text-slate-300 font-normal'
                  }`}>
                    {business.description}
                  </p>

                  <div className={`flex flex-wrap items-center gap-6 font-mono text-xs font-medium ${
                    isOrangeBox ? 'text-slate-900' : 'text-orange-400/90'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Clock className={`w-3.5 h-3.5 ${isOrangeBox ? 'text-slate-950' : 'text-orange-400'}`} />
                      <span>{business.hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className={`w-3.5 h-3.5 ${isOrangeBox ? 'text-slate-950' : 'text-orange-400'}`} />
                      <span>{business.phone}</span>
                    </div>
                  </div>

                  {/* Offerings Menu */}
                  <div className={`pt-6 border-t space-y-3 ${
                    isOrangeBox ? 'border-slate-950/20' : 'border-white/10'
                  }`}>
                    <div className={`font-mono text-[11px] uppercase tracking-widest font-bold ${
                      isOrangeBox ? 'text-slate-900' : 'text-slate-400'
                    }`}>
                      Signature Specialties
                    </div>
                    <div className="space-y-2.5">
                      {business.offerings.map((item, oIdx) => (
                        <div
                          key={oIdx}
                          className={`flex items-start justify-between gap-4 p-3 rounded-xl shadow-xs transition-colors ${
                            isOrangeBox
                              ? 'bg-white/80 hover:bg-white text-slate-950 border border-orange-600/30'
                              : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                          }`}
                        >
                          <div>
                            <div className={`font-bold text-xs ${isOrangeBox ? 'text-slate-950' : 'text-white'}`}>
                              {item.name}
                            </div>
                            <div className={`text-[11px] mt-0.5 ${isOrangeBox ? 'text-slate-800' : 'text-slate-400'}`}>
                              {item.description}
                            </div>
                          </div>
                          <span className={`font-mono font-bold text-xs shrink-0 ${
                            isOrangeBox ? 'text-slate-950' : 'text-orange-400'
                          }`}>
                            {item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`mt-8 pt-6 border-t flex flex-wrap gap-2 font-mono text-[11px] font-medium ${
                  isOrangeBox ? 'border-slate-950/20 text-slate-900' : 'border-white/10 text-slate-400'
                }`}>
                  {business.specialties.map((spec, sIdx) => (
                    <span key={sIdx} className={isOrangeBox ? 'text-slate-950 font-semibold' : 'text-slate-300'}>
                      {spec} {sIdx < business.specialties.length - 1 ? '·' : ''}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Commercial Space Callout: Luxury Black Box sliding in from bottom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 p-8 rounded-3xl bg-slate-950 text-white border-2 border-orange-500/50 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl hover:border-orange-500 transition-all"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-orange-500 text-slate-950 flex items-center justify-center shrink-0 shadow-lg font-bold">
              <Building2 className="w-7 h-7 text-slate-950" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white font-display">
                Position Your Brand on the Aba-Owerri Expressway
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-normal">
                High-volume highway footfall, 24/7 uninterrupted power, and commercial banking traffic at Master Energy Naze.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenLeasingModal}
            className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-orange-500 hover:bg-orange-400 rounded-xl transition-all whitespace-nowrap cursor-pointer shadow-lg shadow-orange-500/20 hover:scale-105"
          >
            Lease Kiosk or Retail Unit
          </button>
        </motion.div>
      </div>
    </section>
  );
};
