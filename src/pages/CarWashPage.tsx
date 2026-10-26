import React, { useState } from 'react';
import { WASH_SERVICES } from '../data/hubData';
import { Sparkles, Clock, Check, ShieldCheck, Tv, Wifi } from 'lucide-react';

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

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  return (
    <div className="py-10 sm:py-16 bg-[#04060a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="border-b border-white/10 pb-8 space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider">
            <span>DIVISION IV · MASTERS AUTOMATED CAR WASH</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
            Masters Car Wash
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-normal leading-relaxed">
            Wash off highway mud and red dust in minutes. We use thick snow foam shampoo, high-pressure underbody mud blasters, and interior vacuum while you relax in our AC waiting room.
          </p>
        </div>

        {/* Hero Photo */}
        <div className="relative h-64 sm:h-96 rounded-3xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl">
          <img
            src="/src/assets/images/masters_carwash_1792957566167.jpg"
            alt="Masters Car Wash Detailing Bay"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04060a] via-black/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-cyan-400 font-bold uppercase">Modern Detailing Bay</div>
              <div className="text-xl sm:text-2xl font-bold text-white font-display">Showroom Clean Exterior &amp; Sweet Interior</div>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-black/70 px-3 py-1.5 rounded-lg border border-white/10">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>7:00 AM – 9:00 PM Daily</span>
            </div>
          </div>
        </div>

        {/* Vehicle Class Switcher */}
        <div className="p-6 rounded-3xl bg-[#090d16] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-sm font-bold text-white font-display">Select Your Car Type:</div>
            <div className="text-xs text-slate-400">Pricing adjusts automatically for vehicle size</div>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setVehicleType('sedan')}
              className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                vehicleType === 'sedan'
                  ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/20'
                  : 'bg-black/50 text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              Sedan / Saloon Car
            </button>
            <button
              type="button"
              onClick={() => setVehicleType('suv')}
              className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                vehicleType === 'suv'
                  ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/20'
                  : 'bg-black/50 text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              SUV / Jeep / Pickup Truck
            </button>
          </div>
        </div>

        {/* Wash Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {WASH_SERVICES.map((pkg) => {
            const price = vehicleType === 'sedan' ? pkg.priceSedan : pkg.priceSuv;
            const isSelected = selectedWashId === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedWashId(pkg.id)}
                className={`p-6 sm:p-8 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-6 ${
                  isSelected
                    ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-xl shadow-cyan-500/10'
                    : 'bg-[#090d16] border-white/10 text-slate-300 hover:border-white/20'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-lg text-white">{pkg.name}</span>
                    {pkg.isPopular && (
                      <span className="text-[10px] font-mono bg-cyan-400/20 text-cyan-300 px-2 py-0.5 rounded">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">{pkg.description}</p>
                  <div className="pt-3 border-t border-white/5 space-y-1.5 text-xs">
                    {pkg.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-slate-300">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono uppercase text-slate-400">Total Price</div>
                    <div className="text-xl font-bold font-mono text-cyan-400">
                      ₦{price.toLocaleString()}
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{pkg.durationMin} mins</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Customer Waiting Room Amenities */}
        <div className="p-6 rounded-2xl bg-[#090d16] border border-white/10 flex flex-wrap items-center justify-between gap-6 text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Driver AC Waiting Room: Free Chilled Water, Clean Restrooms &amp; CCTV Monitoring</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5"><Tv className="w-3.5 h-3.5 text-amber-400" /> Cable TV Live</span>
            <span className="flex items-center gap-1.5"><Wifi className="w-3.5 h-3.5 text-cyan-400" /> Free Fast Wi-Fi</span>
          </div>
        </div>

        {/* Instant Bay Booking Form */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#090d16] border border-white/10 shadow-2xl">
          <div className="max-w-2xl mb-6">
            <h3 className="text-2xl font-bold text-white font-display">
              Book a Washing Bay in Advance
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Skip waiting in line when you arrive at Naze Mega Station
            </p>
          </div>

          {booked ? (
            <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white">Car Wash Bay Reserved!</h4>
              <p className="text-xs sm:text-sm text-slate-300 font-light max-w-md mx-auto">
                Your reservation for car plate <strong className="text-white">{carNumber || 'Your Car'}</strong> on <strong className="text-white">{washDate} at {washTime}</strong> is confirmed. Drive straight into Bay 1 or 2 upon arrival.
              </p>
              <div className="font-mono text-base font-bold text-cyan-400">
                Amount Due at Bay: ₦{total.toLocaleString()}
              </div>
              <button
                type="button"
                onClick={() => setBooked(false)}
                className="text-xs text-emerald-400 font-bold underline mt-2 inline-block cursor-pointer"
              >
                Book Another Car
              </button>
            </div>
          ) : (
            <form onSubmit={handleBook} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Car Plate Number / Car Model *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. WER-123-AA (Toyota Camry / Lexus RX)"
                  value={carNumber}
                  onChange={(e) => setCarNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="0803 000 0000"
                  value={ownerPhone}
                  onChange={(e) => setOwnerPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Preferred Date</label>
                <input
                  type="date"
                  value={washDate}
                  onChange={(e) => setWashDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Time Slot</label>
                <select
                  value={washTime}
                  onChange={(e) => setWashTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs outline-none focus:border-cyan-400"
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
                  className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all cursor-pointer shadow-lg shadow-cyan-500/20"
                >
                  Confirm Wash Bay Slot (₦{total.toLocaleString()})
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
