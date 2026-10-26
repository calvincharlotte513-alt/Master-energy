import React, { useState } from 'react';
import { LEASED_BUSINESSES } from '../data/hubData';
import { Store, Coffee, Utensils, Clock, Phone, Building2, Check, ArrowRight } from 'lucide-react';

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
    <div className="py-10 sm:py-16 bg-[#04060a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="border-b border-white/10 pb-8 space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-amber-400 font-bold uppercase tracking-wider">
            <span>MICRO-SECTION · LEASED COMMERCIAL SHOPS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
            The Promenade (Leased Shops)
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-normal leading-relaxed">
            Alongside our five original Master Energy divisions, we lease spaces to independent specialty brands to give travelers and local residents more variety.
          </p>
        </div>

        {/* 2 Concession Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {LEASED_BUSINESSES.map((business) => {
            const isZena = business.id === 'zena-foodies';
            const Icon = isZena ? Utensils : Coffee;

            return (
              <div
                key={business.id}
                className="p-8 sm:p-10 rounded-3xl bg-[#090d16] border border-white/10 hover:border-amber-400/20 transition-all flex flex-col justify-between space-y-6 shadow-2xl"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20">
                      {business.leaseBadge} · {business.unitNumber}
                    </span>
                    <Icon className="w-5 h-5 text-amber-400" />
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">{business.name}</h3>
                    <div className="text-xs font-mono text-amber-400 uppercase mt-1 font-bold">{business.category}</div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed font-light">{business.description}</p>

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
                  <div className="pt-5 border-t border-white/10 space-y-2.5">
                    <div className="font-mono text-xs uppercase tracking-wider text-slate-400 font-bold">
                      Popular Items on Menu
                    </div>
                    {business.offerings.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start justify-between gap-3 p-3 rounded-xl bg-black/40 border border-white/5"
                      >
                        <div>
                          <div className="font-bold text-xs text-white">{item.name}</div>
                          <div className="text-[11px] text-slate-400 font-light mt-0.5">{item.description}</div>
                        </div>
                        <span className="font-mono font-bold text-xs text-amber-400 shrink-0">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2 font-mono text-[11px] text-slate-400">
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

        {/* Commercial Space Rental Application */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#090d16] border border-amber-400/20 space-y-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                Rent a Commercial Shop or Kiosk Space in Naze
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Put your business right where thousands of travelers, private cars, and interstate buses stop every day.
              </p>
            </div>
          </div>

          {formSent ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center mx-auto">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white">Lease Application Submitted!</h4>
              <p className="text-xs text-slate-300 font-light">
                Our property management team at Master Energy Naze will contact your phone with available shop sizes and rental terms.
              </p>
            </div>
          ) : (
            <form onSubmit={handleLeaseSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Business Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Pharmacy &amp; Supermart"
                  value={leaseForm.businessName}
                  onChange={(e) => setLeaseForm({ ...leaseForm, businessName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Your Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="0803 000 0000"
                  value={leaseForm.phone}
                  onChange={(e) => setLeaseForm({ ...leaseForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Shop Category</label>
                <select
                  value={leaseForm.category}
                  onChange={(e) => setLeaseForm({ ...leaseForm, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs outline-none focus:border-amber-400"
                >
                  <option value="Specialty Food &amp; Snacks">Specialty Food, Bakery &amp; Snacks</option>
                  <option value="Pharmacy / Chemist">Pharmacy / Chemist</option>
                  <option value="POS / ATM Gallery">POS / ATM Financial Pod</option>
                  <option value="Phone Accessories &amp; Gadgets">Phone Accessories &amp; Gadgets</option>
                  <option value="Dry Cleaning / Logistics">Dry Cleaning / Logistics Drop-off</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Desired Space Size</label>
                <select
                  value={leaseForm.shopSize}
                  onChange={(e) => setLeaseForm({ ...leaseForm, shopSize: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs outline-none focus:border-amber-400"
                >
                  <option value="Outdoor Kiosk (15 - 20 sqm)">Outdoor Kiosk (15 - 20 sqm)</option>
                  <option value="Standard Retail Shop (35 - 50 sqm)">Standard Retail Shop (35 - 50 sqm)</option>
                  <option value="ATM / POS Booth (5 - 8 sqm)">ATM / POS Booth (5 - 8 sqm)</option>
                </select>
              </div>

              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  className="w-full py-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  Submit Lease Application
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
