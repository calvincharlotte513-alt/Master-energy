import React from 'react';
import { motion } from 'motion/react';
import { LEASED_BUSINESSES } from '../../data/hubData';
import { Store, Coffee, Utensils, Clock, Phone, Building2 } from 'lucide-react';

interface LeasedPromenadeSectionProps {
  onOpenLeasingModal: () => void;
}

export const LeasedPromenadeSection: React.FC<LeasedPromenadeSectionProps> = ({ onOpenLeasingModal }) => {
  return (
    <section id="promenade" className="py-16 lg:py-24 bg-white dark:bg-[#080d1a] border-t border-slate-200 dark:border-slate-800 relative w-full max-w-full overflow-hidden font-opensans transition-colors duration-250">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Micro-Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-blue-900 dark:text-blue-400 mb-3 font-bold">
              <Store className="w-3.5 h-3.5 text-red-600" />
              <span>THE CONCESSIONAIRE ARCADE · MICRO-SECTION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight font-display">
              Commercial Promenade &amp; Leased Spaces
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 max-w-xl font-normal leading-relaxed">
              In addition to our five original flagship divisions, Master Energy provides prime commercial real estate for artisanal culinary and specialty brands.
            </p>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={onOpenLeasingModal}
              className="flex items-center gap-2.5 px-6 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all cursor-pointer shadow-md shadow-red-600/25 hover:scale-105"
            >
              <Building2 className="w-4 h-4 text-white" />
              <span>Apply for Retail Lease</span>
            </button>
          </div>
        </div>

        {/* 2 Concession Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 overflow-hidden">
          {LEASED_BUSINESSES.map((business, idx) => {
            const isZena = business.id === 'zena-foodies';
            const Icon = isZena ? Utensils : Coffee;
            const isFirst = idx === 0;
            const slideX = isFirst ? -28 : 28;

            return (
              <motion.div
                key={business.id}
                initial={{ opacity: 0, x: slideX }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.38, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                style={{ willChange: 'transform, opacity' }}
                className={`p-8 sm:p-10 rounded-3xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group ${
                  isFirst
                    ? 'bg-[#091224] text-white border-2 border-blue-900/60 shadow-xl hover:border-blue-600'
                    : 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white border-2 border-slate-200 dark:border-slate-800 shadow-xl hover:border-blue-900/60'
                }`}
              >
                <div className="space-y-6">
                  {/* Concessionaire Micro Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md shadow-xs ${
                      isFirst
                        ? 'bg-blue-900 text-white'
                        : 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200'
                    }`}>
                      {business.leaseBadge} · {business.unitNumber}
                    </span>
                    <Icon className={`w-5 h-5 ${isFirst ? 'text-amber-300' : 'text-blue-900 dark:text-blue-400'}`} />
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-display">
                      {business.name}
                    </h3>
                    <div className={`mt-1 text-xs font-mono uppercase tracking-wider font-bold ${
                      isFirst ? 'text-amber-300' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {business.category}
                    </div>
                  </div>

                  <p className={`text-sm leading-relaxed ${
                    isFirst ? 'text-slate-300 font-normal' : 'text-slate-600 dark:text-slate-300 font-normal'
                  }`}>
                    {business.description}
                  </p>

                  <div className={`flex flex-wrap items-center gap-6 font-mono text-xs font-medium ${
                    isFirst ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-blue-900 dark:text-blue-400" />
                      <span>{business.hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-blue-900 dark:text-blue-400" />
                      <span>{business.phone}</span>
                    </div>
                  </div>

                  {/* Offerings Menu */}
                  <div className={`pt-6 border-t space-y-3 ${
                    isFirst ? 'border-white/10' : 'border-slate-200 dark:border-slate-800'
                  }`}>
                    <div className={`font-mono text-[11px] uppercase tracking-widest font-bold ${
                      isFirst ? 'text-slate-400' : 'text-slate-500 dark:text-slate-400'
                    }`}>
                      Signature Specialties
                    </div>
                    <div className="space-y-2.5">
                      {business.offerings.map((item, oIdx) => (
                        <div
                          key={oIdx}
                          className={`flex items-start justify-between gap-4 p-3 rounded-xl shadow-xs transition-colors ${
                            isFirst
                              ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                              : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          <div>
                            <div className="font-bold text-xs">
                              {item.name}
                            </div>
                            <div className={`text-[11px] mt-0.5 ${isFirst ? 'text-slate-400' : 'text-slate-500 dark:text-slate-400'}`}>
                              {item.description}
                            </div>
                          </div>
                          <span className={`font-mono font-bold text-xs shrink-0 ${
                            isFirst ? 'text-amber-300' : 'text-blue-900 dark:text-blue-400'
                          }`}>
                            {item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`mt-8 pt-6 border-t flex flex-wrap gap-2 font-mono text-[11px] font-medium ${
                  isFirst ? 'border-white/10 text-slate-400' : 'border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400'
                }`}>
                  {business.specialties.map((spec, sIdx) => (
                    <span key={sIdx}>
                      {spec} {sIdx < business.specialties.length - 1 ? '·' : ''}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Commercial Space Callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 p-8 rounded-3xl bg-[#091224] text-white border-2 border-blue-900/60 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl hover:border-blue-700 transition-all"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-blue-900 text-white flex items-center justify-center shrink-0 shadow-lg font-bold border border-blue-700">
              <Building2 className="w-7 h-7 text-white" />
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
            className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all whitespace-nowrap cursor-pointer shadow-lg shadow-red-600/25 hover:scale-105"
          >
            Lease Kiosk or Retail Unit
          </button>
        </motion.div>
      </div>
    </section>
  );
};
