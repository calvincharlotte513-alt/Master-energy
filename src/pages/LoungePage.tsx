import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LOUNGE_PACKAGES } from '../data/hubData';
import { Clock, Check } from 'lucide-react';

export const LoungePage: React.FC = () => {
  const [selectedPkg, setSelectedPkg] = useState<string>('l1');
  const [guestCount, setGuestCount] = useState<number>(4);
  const [resDate, setResDate] = useState<string>('2026-10-30');
  const [resTime, setResTime] = useState<string>('20:00');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [specialDrink, setSpecialDrink] = useState<string>('Hennessy VSOP / Martell');
  const [booked, setBooked] = useState<boolean>(false);

  const activePackage = LOUNGE_PACKAGES.find(p => p.id === selectedPkg) || LOUNGE_PACKAGES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  return (
    <div className="py-10 sm:py-16 bg-white w-full max-w-full overflow-hidden font-opensans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="border-b border-slate-200 pb-8 space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-orange-600 font-bold uppercase tracking-wider">
            <span>DIVISION III · MASTERS VIP LOUNGE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 font-display">
            Masters Lounge
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl font-normal leading-relaxed">
            Our luxury upstairs VIP lounge in Naze. Enjoy original cognacs, chilled champagne, private soundproof booths, and good music with maximum security.
          </p>
        </div>

        {/* Hero Photo Banner */}
        <div className="relative h-64 sm:h-96 rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xl">
          <img
            src="/images/masters_lounge_1792957565345.jpg"
            onError={(e) => {
              const current = e.currentTarget.getAttribute('src');
              if (current?.startsWith('/images/')) {
                e.currentTarget.src = current.replace('/images/', '/assets/images/');
              }
            }}
            alt="Masters Lounge VIP Interior"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-orange-400 font-bold uppercase">Executive Nightlife</div>
              <div className="text-xl sm:text-2xl font-bold text-white font-display">Class, Cold Drinks &amp; Peace of Mind</div>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-white bg-orange-500 font-bold px-3 py-1.5 rounded-lg shadow-md">
              <Clock className="w-3.5 h-3.5" />
              <span>4:00 PM – 4:00 AM Nightly</span>
            </div>
          </div>
        </div>

        {/* The 3 VIP Packages with Alternating Orange & Black Sliding Boxes */}
        <div>
          <div className="font-mono text-xs uppercase tracking-wider text-slate-500 font-bold mb-4">
            SELECT YOUR VIP EXPERIENCE
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
            {LOUNGE_PACKAGES.map((pkg, idx) => {
              const isSelected = selectedPkg === pkg.id;
              // Center package is Black Box, outer packages are Orange Boxes
              const isBlackTier = idx === 1;
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
                  onClick={() => setSelectedPkg(pkg.id)}
                  className={`p-7 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-6 ${
                    isBlackTier
                      ? isSelected
                        ? 'bg-slate-950 text-white border-orange-500 shadow-2xl scale-102 ring-2 ring-orange-500'
                        : 'bg-slate-950 text-white border-orange-500/40 shadow-xl hover:border-orange-500'
                      : isSelected
                        ? 'bg-orange-500 text-white border-orange-600 shadow-2xl scale-102 ring-2 ring-white'
                        : 'bg-orange-500 text-white border-orange-600 shadow-xl hover:border-slate-950'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`font-mono text-xs font-bold uppercase ${
                        isBlackTier ? 'text-orange-400' : 'text-orange-100'
                      }`}>
                        {pkg.category}
                      </span>
                      <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                        isBlackTier ? 'bg-orange-500/20 text-orange-300' : 'bg-slate-950 text-orange-400'
                      }`}>
                        {pkg.capacity}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold font-display text-white">
                      {pkg.name}
                    </h3>
                    <p className={`text-xs leading-relaxed ${
                      isBlackTier ? 'text-slate-300 font-normal' : 'text-white/95 font-medium'
                    }`}>
                      {pkg.description}
                    </p>
                    <div className={`pt-3 border-t space-y-1.5 text-xs ${
                      isBlackTier ? 'border-white/10' : 'border-white/20'
                    }`}>
                      {pkg.perks.map((p, pIdx) => (
                        <div key={pIdx} className="flex items-center gap-2 text-white">
                          <Check className={`w-3.5 h-3.5 shrink-0 ${
                            isBlackTier ? 'text-orange-400' : 'text-white'
                          }`} />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`pt-4 border-t ${
                    isBlackTier ? 'border-white/10' : 'border-white/20'
                  }`}>
                    <div className={`text-[10px] font-mono uppercase ${
                      isBlackTier ? 'text-slate-400' : 'text-orange-100 font-bold'
                    }`}>
                      Minimum Spend
                    </div>
                    <div className={`text-xl font-bold font-mono ${
                      isBlackTier ? 'text-orange-400' : 'text-white font-black'
                    }`}>
                      ₦{pkg.minSpend.toLocaleString()}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Table Reservation Form: Luxury Black Box sliding in from bottom */}
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
              Reserve Your VIP Table or Private Room
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Currently selected: <strong className="text-amber-400">{activePackage.name}</strong> ({activePackage.capacity})
            </p>
          </div>

          {booked ? (
            <div className="p-8 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white">VIP Table Reserved at Masters Lounge!</h4>
              <p className="text-xs sm:text-sm text-slate-300 font-normal max-w-md mx-auto">
                Hello <strong className="text-amber-400">{clientName}</strong>, your VIP booth is confirmed for <strong className="text-amber-400">{resDate} at {resTime}</strong> for {guestCount} guests. Our lounge manager will call you right away.
              </p>
              <button
                type="button"
                onClick={() => setBooked(false)}
                className="text-xs text-amber-400 font-bold underline mt-2 inline-block cursor-pointer"
              >
                Book Another Table
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chief Emeka Okoro"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/20 text-white text-xs outline-none focus:border-amber-400 shadow-sm"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">Phone Number (Nigeria) *</label>
                <input
                  type="tel"
                  required
                  placeholder="0803 000 0000"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/20 text-white text-xs outline-none focus:border-amber-400 shadow-sm"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">Reservation Date</label>
                <input
                  type="date"
                  value={resDate}
                  onChange={(e) => setResDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/20 text-white text-xs outline-none focus:border-amber-400 shadow-sm"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">Arrival Time</label>
                <select
                  value={resTime}
                  onChange={(e) => setResTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/20 text-white text-xs outline-none focus:border-amber-400 shadow-sm"
                >
                  <option value="18:00">6:00 PM (Sunset Chilling)</option>
                  <option value="20:00">8:00 PM (Dinner &amp; Drinks)</option>
                  <option value="21:30">9:30 PM (Prime Nightlife)</option>
                  <option value="23:00">11:00 PM (Late Night Vault)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">Number of Guests</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/20 text-white text-xs outline-none focus:border-amber-400 shadow-sm"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">Preferred Drink Preference</label>
                <select
                  value={specialDrink}
                  onChange={(e) => setSpecialDrink(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/20 text-white text-xs outline-none focus:border-amber-400 shadow-sm"
                >
                  <option value="Hennessy VSOP / Martell">Hennessy VSOP / Martell</option>
                  <option value="Don Julio / Tequila Reposado">Don Julio / Casamigos Tequila</option>
                  <option value="Moët &amp; Chandon / Veuve Clicquot">Moët &amp; Chandon / Champagne</option>
                  <option value="Glenfiddich / Macallan Scotch">Glenfiddich / Macallan Single Malt</option>
                  <option value="Cold Premium Beers &amp; Cocktails">Cold Premium Beers &amp; Cocktails</option>
                </select>
              </div>

              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-500/20 hover:scale-102"
                >
                  Confirm VIP Table Booking
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};
