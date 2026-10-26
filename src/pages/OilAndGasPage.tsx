import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FUEL_PRODUCTS } from '../data/hubData';
import { ShieldCheck, Truck, Check } from 'lucide-react';

export const OilAndGasPage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>('pms');
  const [liters, setLiters] = useState<number>(45);
  const [tankerRequested, setTankerRequested] = useState<boolean>(false);
  const [tankerForm, setTankerForm] = useState({
    companyName: '',
    fuelType: 'Automotive Gas Oil (AGO / Diesel)',
    volumeLiters: '10,000 Liters (Mini Tanker)',
    deliveryAddress: '',
    phone: ''
  });

  const currentProduct = FUEL_PRODUCTS.find(p => p.id === selectedProduct) || FUEL_PRODUCTS[0];
  const totalCost = liters * currentProduct.pricePerUnit;

  const handleTankerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTankerRequested(true);
  };

  return (
    <div className="py-10 sm:py-16 bg-white dark:bg-[#080d1a] text-slate-900 dark:text-white w-full max-w-full overflow-hidden font-opensans transition-colors duration-250">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-8 space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-blue-900 dark:text-blue-400 font-bold uppercase tracking-wider">
            <span>DIVISION I · MASTER ENERGY FORECOURT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white font-display">
            Fuel Station &amp; Gas Plant
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed">
            We operate 16 fast digital pumps with strictly calibrated meters on Aba-Owerri Road, Naze. No under-dispensing, no dirty fuel, and no power failure.
          </p>
        </div>

        {/* Big Station Hero Photo */}
        <div className="relative h-64 sm:h-96 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 shadow-xl">
          <img
            src="/images/hero_mega_station_1792957563926.jpg"
            onError={(e) => {
              const current = e.currentTarget.getAttribute('src');
              if (current?.startsWith('/images/')) {
                e.currentTarget.src = current.replace('/images/', '/assets/images/');
              }
            }}
            alt="Master Energy Mega Station Naze"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-amber-300 font-bold uppercase">100% Honest Meters</div>
              <div className="text-xl sm:text-2xl font-bold text-white font-display">What You Pay For Is What Enters Your Tank</div>
            </div>
            <span className="text-xs font-mono text-white bg-red-600 font-bold px-3 py-1.5 rounded-lg shadow-md">
              Forecourt Open 24 Hours
            </span>
          </div>
        </div>

        {/* Today's Fuel Price Board */}
        <div>
          <div className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold mb-4">
            TODAY&apos;S CERTIFIED PUMP PRICES (NAIRA)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden">
            {FUEL_PRODUCTS.map((prod, idx) => {
              const slideX = idx % 2 === 0 ? -24 : 24;

              return (
                <motion.div
                  key={prod.id}
                  initial={{ opacity: 0, x: slideX, y: 12 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.35, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  style={{ willChange: 'transform, opacity' }}
                  className="p-6 rounded-3xl transition-all duration-300 space-y-3 bg-white dark:bg-slate-900 text-slate-950 dark:text-white border-2 border-slate-200 dark:border-slate-800 shadow-md hover:border-blue-900/60"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-base text-blue-900 dark:text-blue-400">
                      {prod.shortCode}
                    </span>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded shadow-xs text-white bg-blue-900 dark:bg-blue-600">
                      In Stock
                    </span>
                  </div>
                  <div className="font-mono text-2xl font-black text-slate-950 dark:text-white">
                    ₦{prod.pricePerUnit.toLocaleString()}
                    <span className="text-xs font-normal text-slate-500 dark:text-slate-400"> / {prod.unit}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 font-normal">
                    {prod.description}
                  </p>
                  <div className="text-[11px] font-mono pt-2 border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                    {prod.dispensersCount} Active Dispensers
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Our Honest Meter Guarantee */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-900 text-white flex items-center justify-center shrink-0 font-bold shadow-md">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white font-display">
                How We Guarantee Correct Meter Reading
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Tested daily so nobody cheats you on the road</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs overflow-hidden">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 space-y-2 shadow-md hover:border-blue-900/60"
            >
              <div className="font-bold text-blue-900 dark:text-blue-400 font-display text-sm">1. Daily Calibration Measure</div>
              <p className="text-slate-600 dark:text-slate-300 font-normal leading-relaxed">Our pump technicians use standard 20-liter DPR seraphin calibration cans every morning to confirm accurate delivery before sales begin.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.35, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="p-6 rounded-3xl bg-[#091224] text-white border-2 border-blue-900/60 space-y-2 shadow-xl hover:border-blue-700"
            >
              <div className="font-extrabold text-amber-300 font-display text-sm">2. Zero Water in Fuel</div>
              <p className="text-slate-300 font-normal leading-relaxed">Our underground steel tanks are equipped with water-sensing electronic probes. If there is even one drop of moisture, pumps lock automatically.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.35, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 space-y-2 shadow-md hover:border-blue-900/60"
            >
              <div className="font-bold text-blue-900 dark:text-blue-400 font-display text-sm">3. Digital Scales for Cooking Gas</div>
              <p className="text-slate-600 dark:text-slate-300 font-normal leading-relaxed">We weigh your gas cylinder empty, fill it with clean blue-flame LPG, and weigh it again on digital scales right before your eyes.</p>
            </motion.div>
          </div>
        </div>

        {/* Fuel & Cooking Gas Calculator */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs space-y-8">
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold mb-2">
              QUICK CALCULATOR
            </div>
            <h3 className="text-2xl font-bold text-slate-950 dark:text-white font-display">
              Calculate Your Fuel or Gas Cost
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">See exact amount to pay before pulling up to the pump</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-6">
              <div className="grid grid-cols-2 gap-3">
                {FUEL_PRODUCTS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedProduct(p.id)}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedProduct === p.id
                        ? 'bg-blue-900 text-white font-bold border-blue-950 shadow-sm'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-mono font-bold">{p.shortCode}</div>
                    <div className={`text-xs font-mono ${selectedProduct === p.id ? 'text-amber-300' : 'text-blue-900 dark:text-blue-400 font-semibold'}`}>
                      ₦{p.pricePerUnit} / {p.unit}
                    </div>
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-600 dark:text-slate-400">Quantity Needed:</span>
                  <span className="font-bold text-blue-900 dark:text-blue-400 text-base">{liters} {currentProduct.unit}s</span>
                </div>
                <input
                  type="range"
                  min={currentProduct.id === 'lpg' ? 3 : 5}
                  max={currentProduct.id === 'lpg' ? 50 : 200}
                  step={currentProduct.id === 'lpg' ? 1 : 5}
                  value={liters}
                  onChange={(e) => setLiters(Number(e.target.value))}
                  className="w-full accent-red-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="md:col-span-5 p-7 rounded-3xl bg-[#091224] text-white border-2 border-blue-900/60 shadow-xl space-y-4"
            >
              <div className="font-mono text-xs text-amber-300 uppercase tracking-wider font-bold">Estimated Total:</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                ₦{totalCost.toLocaleString()}
              </div>
              <div className="text-xs text-amber-300 font-mono font-bold">
                For {liters} {currentProduct.unit}s of {currentProduct.name}
              </div>
              <div className="text-xs text-slate-300 pt-3 border-t border-white/10 font-normal leading-relaxed">
                Payment accepted via Cash, POS card swipe, USSD, and Instant Bank Transfer at the pump.
              </div>
            </motion.div>
          </div>
        </div>

        {/* Commercial Fleet & Bulk Tanker Orders */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: 'transform, opacity' }}
          className="p-8 sm:p-10 rounded-3xl bg-[#091224] text-white border-2 border-blue-900/60 shadow-2xl space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-900 text-white flex items-center justify-center shrink-0 font-bold shadow-md border border-blue-700">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-display">
                Bulk Fuel Delivery for Factories, Hotels &amp; Fleets
              </h3>
              <p className="text-xs text-slate-400">We supply diesel and petrol by tanker across Imo, Abia, and Rivers State</p>
            </div>
          </div>

          {tankerRequested ? (
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-950 dark:text-white">Bulk Order Request Received!</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">Our station manager will call your phone shortly with wholesale rate and delivery schedule.</p>
              <button
                type="button"
                onClick={() => setTankerRequested(false)}
                className="text-xs text-red-600 dark:text-red-400 font-bold underline mt-2 inline-block cursor-pointer"
              >
                Send Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleTankerSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1 font-medium">Company / Buyer Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Logistics Ltd"
                  value={tankerForm.companyName}
                  onChange={(e) => setTankerForm({ ...tankerForm, companyName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/20 text-white text-xs outline-none focus:border-blue-400 shadow-sm"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1 font-medium">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="0800 000 0000"
                  value={tankerForm.phone}
                  onChange={(e) => setTankerForm({ ...tankerForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/20 text-white text-xs outline-none focus:border-blue-400 shadow-sm"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1 font-medium">Product Needed</label>
                <select
                  value={tankerForm.fuelType}
                  onChange={(e) => setTankerForm({ ...tankerForm, fuelType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/20 text-white text-xs outline-none focus:border-blue-400 shadow-sm"
                >
                  <option value="Automotive Gas Oil (AGO / Diesel)">Automotive Gas Oil (AGO / Diesel)</option>
                  <option value="Premium Motor Spirit (PMS / Petrol)">Premium Motor Spirit (PMS / Petrol)</option>
                  <option value="Dual Purpose Kerosene (DPK)">Dual Purpose Kerosene (DPK)</option>
                  <option value="Bulk Cooking Gas (LPG Bobtail)">Bulk Cooking Gas (LPG Bobtail)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1 font-medium">Volume</label>
                <select
                  value={tankerForm.volumeLiters}
                  onChange={(e) => setTankerForm({ ...tankerForm, volumeLiters: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/20 text-white text-xs outline-none focus:border-blue-400 shadow-sm"
                >
                  <option value="5,000 Liters">5,000 Liters (Small Bowser)</option>
                  <option value="11,000 Liters">11,000 Liters</option>
                  <option value="22,000 Liters">22,000 Liters</option>
                  <option value="33,000 Liters">33,000 Liters (Full Tanker)</option>
                  <option value="45,000 Liters">45,000 Liters (Articulated Tanker)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs text-slate-400 block mb-1 font-medium">Delivery Location in Imo / Eastern State</label>
                <input
                  type="text"
                  placeholder="e.g. Factory Site, Port Harcourt Road, Owerri"
                  value={tankerForm.deliveryAddress}
                  onChange={(e) => setTankerForm({ ...tankerForm, deliveryAddress: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/20 text-white text-xs outline-none focus:border-blue-400 shadow-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full py-3 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all shadow-md shadow-red-600/25 cursor-pointer"
                >
                  Request Bulk Fuel Delivery Quote
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};
