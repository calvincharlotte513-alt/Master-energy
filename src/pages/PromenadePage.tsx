import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LEASED_BUSINESSES } from '../data/hubData';
import { Coffee, Utensils, Clock, Phone, Building2, Check } from 'lucide-react';

export const PromenadePage: React.FC = () => {
  const [formSent, setFormSent] = useState<boolean>(false);
  const [leaseForm, setLeaseForm] = useState({
    businessName: '',
    category: 'Specialty Food & Snacks',
    phone: '',
    email: '',
    shopSize: 'Outdoor Kiosk (15 - 20 sqm)'
  });

  const handleLeaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="py-10 sm:py-16 bg-white dark:bg-[#080d1a] text-slate-900 dark:text-white w-full max-w-full overflow-hidden font-opensans transition-colors duration-250">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-8 space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-blue-900 dark:text-blue-400 font-bold uppercase tracking-wider">
            <span>MICRO-SECTION · LEASED COMMERCIAL SHOPS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white font-display">
            The Promenade (Leased Shops)
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed">
            Alongside our five original Master Energy divisions, we lease spaces to independent specialty brands to give travelers and local residents more variety.
          </p>
        </div>

        {/* 2 Concession Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden">
          {LEASED_BUSINESSES.map((business, idx) => {
            const isZena = business.id === 'zena-foodies';
            const Icon = isZena ? Utensils : Coffee;
            const isFirst = idx === 0;

            return (
              <motion.div
                key={business.id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 }}
                style={{ willChange: 'transform, opacity' }}
                className={`p-8 sm:p-10 rounded-3xl flex flex-col justify-between space-y-6 transition-all duration-300 ${
                  isFirst
                    ? 'bg-[#091224] text-white border-2 border-blue-900/60 shadow-xl hover:border-blue-700'
                    : 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white border-2 border-slate-200 dark:border-slate-800 shadow-md hover:border-blue-900/60'
                }`}
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-xs font-bold px-3 py-1 rounded-md shadow-xs ${
                        isFirst ? 'bg-blue-900 text-white' : 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200'
                      }`}
                    >
                      {business.leaseBadge} · {business.unitNumber}
                    </span>
                    <Icon className={`w-5 h-5 ${isFirst ? 'text-amber-300' : 'text-blue-900 dark:text-blue-400'}`} />
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-display">
                      {business.name}
                    </h3>
                    <div className={`text-xs font-mono uppercase mt-1 font-bold ${isFirst ? 'text-amber-300' : 'text-blue-900 dark:text-blue-400'}`}>
                      {business.category}
                    </div>
                  </div>

                  <p className={`text-sm leading-relaxed font-normal ${isFirst ? 'text-slate-300' : 'text-slate-600 dark:text-slate-300'}`}>
                    {business.description}
                  </p>

                  <div className={`flex flex-wrap items-center gap-6 font-mono text-xs font-medium ${isFirst ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'}`}>
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
                  <div className={`pt-5 border-t space-y-2.5 ${isFirst ? 'border-white/10' : 'border-slate-200 dark:border-slate-800'}`}>
                    <div className={`font-mono text-xs uppercase tracking-wider font-bold ${isFirst ? 'text-amber-300' : 'text-blue-900 dark:text-blue-400'}`}>
                      Popular Items on Menu
                    </div>
                    {business.offerings.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className={`flex items-start justify-between gap-3 p-3 rounded-xl border shadow-xs ${
                          isFirst
                            ? 'bg-slate-900/90 border-slate-800 text-white'
                            : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-950 dark:text-white'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-xs">{item.name}</div>
                          <div className={`text-[11px] font-normal mt-0.5 ${isFirst ? 'text-slate-400' : 'text-slate-500 dark:text-slate-400'}`}>{item.description}</div>
                        </div>
                        <span className={`font-mono font-bold text-xs shrink-0 ${isFirst ? 'text-amber-300' : 'text-blue-900 dark:text-blue-400'}`}>
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`pt-4 border-t flex flex-wrap gap-2 font-mono text-[11px] font-medium ${isFirst ? 'border-white/10 text-slate-400' : 'border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400'}`}>
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

        {/* Commercial Space Rental Application */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: 'transform, opacity' }}
          className="p-8 sm:p-10 rounded-3xl bg-[#091224] text-white border-2 border-blue-900/60 shadow-2xl space-y-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-900 text-white flex items-center justify-center shrink-0 shadow-md border border-blue-700">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                Rent a Commercial Shop or Kiosk Space in Naze
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 font-normal">
                Put your business right where thousands of travelers, private cars, and interstate buses stop every day.
              </p>
            </div>
          </div>

          {formSent ? (
            <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white">Lease Application Submitted!</h4>
              <p className="text-xs text-emerald-200 font-normal">
                Our property management team at Master Energy Naze will contact your phone with available shop sizes and rental terms.
              </p>
            </div>
          ) : (
            <form onSubmit={handleLeaseSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">Business Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Pharmacy & Supermart"
                  value={leaseForm.businessName}
                  onChange={(e) => setLeaseForm({ ...leaseForm, businessName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none focus:border-blue-400 shadow-sm placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">Your Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="0803 000 0000"
                  value={leaseForm.phone}
                  onChange={(e) => setLeaseForm({ ...leaseForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none focus:border-blue-400 shadow-sm placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">Shop Category</label>
                <select
                  value={leaseForm.category}
                  onChange={(e) => setLeaseForm({ ...leaseForm, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none focus:border-blue-400 shadow-sm"
                >
                  <option value="Specialty Food & Snacks">Specialty Food, Bakery & Snacks</option>
                  <option value="Pharmacy / Chemist">Pharmacy / Chemist</option>
                  <option value="POS / ATM Gallery">POS / ATM Financial Pod</option>
                  <option value="Phone Accessories & Gadgets">Phone Accessories & Gadgets</option>
                  <option value="Dry Cleaning / Logistics">Dry Cleaning / Logistics Drop-off</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">Desired Space Size</label>
                <select
                  value={leaseForm.shopSize}
                  onChange={(e) => setLeaseForm({ ...leaseForm, shopSize: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none focus:border-blue-400 shadow-sm"
                >
                  <option value="Outdoor Kiosk (15 - 20 sqm)">Outdoor Kiosk (15 - 20 sqm)</option>
                  <option value="Standard Retail Shop (35 - 50 sqm)">Standard Retail Shop (35 - 50 sqm)</option>
                  <option value="ATM / POS Booth (5 - 8 sqm)">ATM / POS Booth (5 - 8 sqm)</option>
                </select>
              </div>

              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all cursor-pointer shadow-md shadow-red-600/25 active:scale-[0.99]"
                >
                  Submit Lease Application
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};
