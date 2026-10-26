import React, { useState } from 'react';
import { FUEL_PRODUCTS, NAZE_HUB_INFO } from '../data/hubData';
import { ShieldCheck, Fuel, Calculator, Truck, Check, Phone, Clock, ArrowRight } from 'lucide-react';

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
    <div className="py-10 sm:py-16 bg-[#04060a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="border-b border-white/10 pb-8 space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-amber-400 font-bold uppercase tracking-wider">
            <span>DIVISION I · MASTER ENERGY FORECOURT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
            Fuel Station &amp; Gas Plant
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-normal leading-relaxed">
            We operate 16 fast digital pumps with strictly calibrated meters on Aba-Owerri Road, Naze. No under-dispensing, no dirty fuel, and no power failure.
          </p>
        </div>

        {/* Big Station Hero Photo */}
        <div className="relative h-64 sm:h-96 rounded-3xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl">
          <img
            src="/src/assets/images/hero_mega_station_1792957563926.jpg"
            alt="Master Energy Mega Station Naze"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04060a] via-black/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-amber-400 font-bold uppercase">100% Honest Meters</div>
              <div className="text-xl sm:text-2xl font-bold text-white font-display">What You Pay For Is What Enters Your Tank</div>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-black/70 px-3 py-1.5 rounded-lg border border-emerald-500/30">
              Forecourt Open 24 Hours
            </span>
          </div>
        </div>

        {/* Today's Fuel Price Board */}
        <div>
          <div className="font-mono text-xs uppercase tracking-wider text-slate-400 font-bold mb-4">
            TODAY&apos;S CERTIFIED PUMP PRICES (NAIRA)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FUEL_PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="p-6 rounded-2xl bg-[#090d16] border border-white/10 hover:border-amber-400/30 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-base text-white">{prod.shortCode}</span>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    In Stock
                  </span>
                </div>
                <div className="font-mono text-2xl font-extrabold text-amber-400">
                  ₦{prod.pricePerUnit.toLocaleString()}
                  <span className="text-xs text-slate-400 font-normal"> / {prod.unit}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {prod.description}
                </p>
                <div className="text-[11px] text-slate-500 font-mono pt-2 border-t border-white/5">
                  {prod.dispensersCount} Active Dispensers
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Honest Meter Guarantee */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#090d16] border border-white/10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                How We Guarantee Correct Meter Reading
              </h3>
              <p className="text-xs text-slate-400">Tested daily so nobody cheats you on the road</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300 leading-relaxed font-light">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
              <div className="font-bold text-white font-display text-sm">1. Daily Calibration Measure</div>
              <p>Our pump technicians use standard 20-liter DPR seraphin calibration cans every morning to confirm accurate delivery before sales begin.</p>
            </div>
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
              <div className="font-bold text-white font-display text-sm">2. Zero Water in Fuel</div>
              <p>Our underground steel tanks are equipped with water-sensing electronic probes. If there is even one drop of moisture, pumps lock automatically.</p>
            </div>
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
              <div className="font-bold text-white font-display text-sm">3. Digital Scales for Cooking Gas</div>
              <p>We weigh your gas cylinder empty, fill it with clean blue-flame LPG, and weigh it again on digital scales right before your eyes.</p>
            </div>
          </div>
        </div>

        {/* Fuel & Cooking Gas Calculator */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#090d16] border border-white/10 space-y-8">
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
              QUICK CALCULATOR
            </div>
            <h3 className="text-2xl font-bold text-white font-display">
              Calculate Your Fuel or Gas Cost
            </h3>
            <p className="text-xs text-slate-400">See exact amount to pay before pulling up to the pump</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-6">
              <div className="grid grid-cols-2 gap-3">
                {FUEL_PRODUCTS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedProduct(p.id)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedProduct === p.id
                        ? 'bg-amber-400/10 border-amber-400 text-white font-bold'
                        : 'bg-black/40 border-white/5 text-slate-400'
                    }`}
                  >
                    <div className="text-xs font-mono">{p.shortCode}</div>
                    <div className="text-xs font-mono text-amber-400">₦{p.pricePerUnit} / {p.unit}</div>
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400">Quantity Needed:</span>
                  <span className="font-bold text-amber-400 text-base">{liters} {currentProduct.unit}s</span>
                </div>
                <input
                  type="range"
                  min={currentProduct.id === 'lpg' ? 3 : 5}
                  max={currentProduct.id === 'lpg' ? 50 : 200}
                  step={currentProduct.id === 'lpg' ? 1 : 5}
                  value={liters}
                  onChange={(e) => setLiters(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
              </div>
            </div>

            <div className="md:col-span-5 p-6 rounded-2xl bg-black/60 border border-white/10 space-y-4">
              <div className="font-mono text-xs text-slate-400 uppercase">Estimated Total:</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                ₦{totalCost.toLocaleString()}
              </div>
              <div className="text-xs text-amber-400 font-mono">
                For {liters} {currentProduct.unit}s of {currentProduct.name}
              </div>
              <div className="text-xs text-slate-400 pt-2 border-t border-white/10">
                Payment accepted via Cash, POS card swipe, USSD, and Instant Bank Transfer at the pump.
              </div>
            </div>
          </div>
        </div>

        {/* Commercial Fleet & Bulk Tanker Orders */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#090d16] border border-white/10 space-y-6">
          <div className="flex items-center gap-3">
            <Truck className="w-6 h-6 text-amber-400" />
            <div>
              <h3 className="text-xl font-bold text-white font-display">
                Bulk Fuel Delivery for Factories, Hotels &amp; Fleets
              </h3>
              <p className="text-xs text-slate-400">We supply diesel and petrol by tanker across Imo, Abia, and Rivers State</p>
            </div>
          </div>

          {tankerRequested ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center mx-auto">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white">Bulk Order Request Received!</h4>
              <p className="text-xs text-slate-300">Our station manager will call your phone shortly with wholesale rate and delivery schedule.</p>
              <button
                type="button"
                onClick={() => setTankerRequested(false)}
                className="text-xs text-emerald-400 font-bold underline mt-2 inline-block cursor-pointer"
              >
                Send Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleTankerSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Company / Buyer Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Logistics Ltd"
                  value={tankerForm.companyName}
                  onChange={(e) => setTankerForm({ ...tankerForm, companyName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="0800 000 0000"
                  value={tankerForm.phone}
                  onChange={(e) => setTankerForm({ ...tankerForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Product Needed</label>
                <select
                  value={tankerForm.fuelType}
                  onChange={(e) => setTankerForm({ ...tankerForm, fuelType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs outline-none focus:border-amber-400"
                >
                  <option value="Automotive Gas Oil (AGO / Diesel)">Automotive Gas Oil (AGO / Diesel)</option>
                  <option value="Premium Motor Spirit (PMS / Petrol)">Premium Motor Spirit (PMS / Petrol)</option>
                  <option value="Dual Purpose Kerosene (DPK)">Dual Purpose Kerosene (DPK)</option>
                  <option value="Bulk Cooking Gas (LPG Bobtail)">Bulk Cooking Gas (LPG Bobtail)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Volume</label>
                <select
                  value={tankerForm.volumeLiters}
                  onChange={(e) => setTankerForm({ ...tankerForm, volumeLiters: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs outline-none focus:border-amber-400"
                >
                  <option value="5,000 Liters">5,000 Liters (Small Bowser)</option>
                  <option value="11,000 Liters">11,000 Liters</option>
                  <option value="22,000 Liters">22,000 Liters</option>
                  <option value="33,000 Liters">33,000 Liters (Full Tanker)</option>
                  <option value="45,000 Liters">45,000 Liters (Articulated Tanker)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs text-slate-400 block mb-1">Delivery Location in Imo / Eastern State</label>
                <input
                  type="text"
                  placeholder="e.g. Factory Site, Port Harcourt Road, Owerri"
                  value={tankerForm.deliveryAddress}
                  onChange={(e) => setTankerForm({ ...tankerForm, deliveryAddress: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs outline-none focus:border-amber-400"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full py-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all cursor-pointer"
                >
                  Request Bulk Fuel Delivery Quote
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
