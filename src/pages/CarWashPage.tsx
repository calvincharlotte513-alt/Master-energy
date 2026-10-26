import React, { useState } from 'react';
import { motion } from 'motion/react';
import { WASH_SERVICES } from '../data/hubData';
import { Clock, Check, ShieldCheck, Tv, Wifi } from 'lucide-react';

export const CarWashPage: React.FC = () => {
  const [vehicleType, setVehicleType] = useState<'sedan' | 'suv'>('suv');
  const [selectedWashId, setSelectedWashId] = useState<string>('w2');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['interior-fog']);
  const [washDate, setWashDate] = useState<string>('2026-10-26');
  const [washTime, setWashTime] = useState<string>('11:00');
  const [carNumber, setCarNumber] = useState<string>('');
  const [ownerPhone, setOwnerPhone] = useState<string>('');
  const [booked, setBooked] = useState<boolean>(false);

  const activeWash = WASH_SERVICES.find(w => w.id === selectedWashId) || WASH_SERVICES[0];
  const basePrice = vehicleType === 'sedan' ? activeWash.priceSedan : activeWash.priceSuv;
  const addonsCost = selectedAddons.length * 2000;
  const total = basePrice + addonsCost;

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  return (
    <div className="py-10 sm:py-16 bg-white w-full max-w-full overflow-hidden font-opensans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="border-b border-slate-200 pb-8 space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-amber-600 font-bold uppercase tracking-wider">
            <span>DIVISION IV · MASTERS AUTOMATED CAR WASH</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 font-display">
            Masters Car Wash
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl font-normal leading-relaxed">
            Wash off highway mud and red dust in minutes. We use thick snow foam shampoo, high-pressure underbody mud blasters, and interior vacuum while you relax in our AC waiting room.
          </p>
        </div>

        {/* Hero Photo */}
        <div className="relative h-64 sm:h-96 rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xl">
          <img
            src="/images/masters_carwash_1792957566167.jpg"
            onError={(e) => {
              const current = e.currentTarget.getAttribute('src');
              if (current?.startsWith('/images/')) {
                e.currentTarget.src = current.replace('/images/', '/assets/images/');
              }
            }}
            alt="Masters Car Wash Detailing Bay"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-amber-400 font-bold uppercase">Modern Detailing Bay</div>
              <div className="text-xl sm:text-2xl font-bold text-white font-display">Showroom Clean Exterior &amp; Sweet Interior</div>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-950 bg-amber-400 font-bold px-3 py-1.5 rounded-lg shadow-md">
              <Clock className="w-3.5 h-3.5" />
              <span>7:00 AM – 9:00 PM Daily</span>
            </div>
          </div>
        </div>

        {/* Vehicle Class Switcher */}
        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div>
            <div className="text-sm font-bold text-slate-950 font-display">Select Your Car Type:</div>
            <div className="text-xs text-slate-500">Pricing adjusts automatically for vehicle size</div>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setVehicleType('sedan')}
              className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                vehicleType === 'sedan'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-white text-slate-700 hover:text-slate-950 border border-slate-200'
              }`}
            >
              Sedan / Saloon Car
            </button>
            <button
              type="button"
              onClick={() => setVehicleType('suv')}
              className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                vehicleType === 'suv'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-white text-slate-700 hover:text-slate-950 border border-slate-200'
              }`}
            >
              SUV / Jeep / Pickup Truck
            </button>
          </div>
        </div>

        {/* Wash Tiers with Alternating Yellow & Black Sliding Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
          {WASH_SERVICES.map((pkg, idx) => {
            const price = vehicleType === 'sedan' ? pkg.priceSedan : pkg.priceSuv;
            const isSelected = selectedWashId === pkg.id;
            // Center tier is Black Box, outer tiers are Yellow Boxes
            const isBlackBox = idx === 1;
            const slideX = idx === 0 ? -24 : idx === 2 ? 24 : 0;
            const slideY = idx === 1 ? 20 : 0;

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, x: slideX, y: slideY }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.35, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                style={{ willChange: 'transform, opacity' }}
                onClick={() => setSelectedWashId(pkg.id)}
                className={`p-7 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-6 ${
                  isBlackBox
                    ? isSelected
                      ? 'bg-slate-950 text-white border-amber-400 shadow-2xl scale-102 ring-2 ring-amber-400'
                      : 'bg-slate-950 text-white border-amber-400/40 shadow-xl hover:border-amber-400'
                    : isSelected
                      ? 'bg-amber-400 text-slate-950 border-slate-950 shadow-2xl scale-102 ring-2 ring-slate-950'
                      : 'bg-amber-400 text-slate-950 border-amber-500 shadow-xl hover:border-slate-950'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`font-display font-extrabold text-lg ${
                      isBlackBox ? 'text-white' : 'text-slate-950'
                    }`}>
                      {pkg.name}
                    </span>
                    {pkg.isPopular && (
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        isBlackBox ? 'bg-amber-400 text-slate-950' : 'bg-slate-950 text-amber-400'
                      }`}>
                        Most Popular
                      </span>
                    )}
                  </div>
                  <p className={`text-xs leading-relaxed ${
                    isBlackBox ? 'text-slate-300 font-normal' : 'text-slate-950 font-medium'
                  }`}>
                    {pkg.description}
                  </p>
                  <div className={`pt-3 border-t space-y-1.5 text-xs ${
                    isBlackBox ? 'border-white/10' : 'border-slate-950/20'
                  }`}>
                    {pkg.features.map((feat, fIdx) => (
                      <div key={fIdx} className={`flex items-center gap-2 ${
                        isBlackBox ? 'text-slate-200' : 'text-slate-950 font-semibold'
                      }`}>
                        <Check className={`w-3.5 h-3.5 shrink-0 ${
                          isBlackBox ? 'text-amber-400' : 'text-slate-950'
                        }`} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`pt-4 border-t flex items-center justify-between ${
                  isBlackBox ? 'border-white/10' : 'border-slate-950/20'
                }`}>
                  <div>
                    <div className={`text-[10px] font-mono uppercase ${
                      isBlackBox ? 'text-slate-400' : 'text-slate-900 font-bold'
                    }`}>
                      Total Price
                    </div>
                    <div className={`text-2xl font-black font-mono ${
                      isBlackBox ? 'text-amber-400' : 'text-slate-950'
                    }`}>
                      ₦{price.toLocaleString()}
                    </div>
                  </div>
                  <span className={`text-xs font-mono font-bold ${
                    isBlackBox ? 'text-slate-400' : 'text-slate-800'
                  }`}>
                    {pkg.durationMin} mins
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Customer Waiting Room Amenities - Black Box sliding from bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: 'transform, opacity' }}
          className="p-6 rounded-3xl bg-slate-950 text-white border-2 border-amber-400/40 flex flex-wrap items-center justify-between gap-6 text-xs shadow-xl"
        >
          <div className="flex items-center gap-3 font-medium">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span className="text-slate-200">Driver AC Waiting Room: Free Chilled Water, Clean Restrooms &amp; CCTV Monitoring</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px] text-amber-400">
            <span className="flex items-center gap-1.5"><Tv className="w-3.5 h-3.5" /> Cable TV Live</span>
            <span className="flex items-center gap-1.5"><Wifi className="w-3.5 h-3.5" /> Free Fast Wi-Fi</span>
          </div>
        </motion.div>

        {/* Instant Bay Booking Form: Luxury Black Box sliding in from bottom */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: 'transform, opacity' }}
          className="p-8 sm:p-10 rounded-3xl bg-slate-950 text-white border-2 border-amber-400/40 shadow-2xl"
        >
          <div className="max-w-2xl mb-6">
            <h3 className="text-2xl font-bold text-white font-display">
              Book a Washing Bay in Advance
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Skip waiting in line when you arrive at Naze Mega Station
            </p>
          </div>

          {booked ? (
            <div className="p-8 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white">Car Wash Bay Reserved!</h4>
              <p className="text-xs sm:text-sm text-slate-300 font-normal max-w-md mx-auto">
                Your reservation for car plate <strong className="text-amber-400">{carNumber || 'Your Car'}</strong> on <strong className="text-amber-400">{washDate} at {washTime}</strong> is confirmed. Drive straight into Bay 1 or 2 upon arrival.
              </p>
              <div className="font-mono text-base font-bold text-amber-400">
                Amount Due at Bay: ₦{total.toLocaleString()}
              </div>
              <button
                type="button"
                onClick={() => setBooked(false)}
                className="text-xs text-amber-400 font-bold underline mt-2 inline-block cursor-pointer"
              >
                Book Another Car
              </button>
            </div>
          ) : (
            <form onSubmit={handleBook} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">Car Plate Number / Car Model *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. WER-123-AA (Toyota Camry / Lexus RX)"
                  value={carNumber}
                  onChange={(e) => setCarNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/20 text-white text-xs outline-none focus:border-amber-400 shadow-sm"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="0803 000 0000"
                  value={ownerPhone}
                  onChange={(e) => setOwnerPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/20 text-white text-xs outline-none focus:border-amber-400 shadow-sm"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">Preferred Date</label>
                <input
                  type="date"
                  value={washDate}
                  onChange={(e) => setWashDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/20 text-white text-xs outline-none focus:border-amber-400 shadow-sm"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">Time Slot</label>
                <select
                  value={washTime}
                  onChange={(e) => setWashTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/20 text-white text-xs outline-none focus:border-amber-400 shadow-sm"
                >
                  <option value="08:00">8:00 AM (Early Priority)</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="18:00">6:00 PM</option>
                </select>
              </div>

              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-500/20 hover:scale-102"
                >
                  Confirm Wash Bay Slot (₦{total.toLocaleString()})
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

