import React, { useState } from 'react';
import { LOUNGE_PACKAGES } from '../data/hubData';
import { Wine, Clock, Check, ShieldCheck, Sparkles, Phone } from 'lucide-react';

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
    <div className="py-10 sm:py-16 bg-[#04060a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="border-b border-white/10 pb-8 space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider">
            <span>DIVISION III · MASTERS VIP LOUNGE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
            Masters Lounge
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-normal leading-relaxed">
            Our luxury upstairs VIP lounge in Naze. Enjoy original cognacs, chilled champagne, private soundproof booths, and good music with maximum security.
          </p>
        </div>

        {/* Hero Photo Banner */}
        <div className="relative h-64 sm:h-96 rounded-3xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl">
          <img
            src="/src/assets/images/masters_lounge_1792957565345.jpg"
            alt="Masters Lounge VIP Interior"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04060a] via-black/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-emerald-400 font-bold uppercase">Executive Nightlife</div>
              <div className="text-xl sm:text-2xl font-bold text-white font-display">Class, Cold Drinks &amp; Peace of Mind</div>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-black/70 px-3 py-1.5 rounded-lg border border-white/10">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>4:00 PM – 4:00 AM Nightly</span>
            </div>
          </div>
        </div>

        {/* The 3 VIP Packages */}
        <div>
          <div className="font-mono text-xs uppercase tracking-wider text-slate-400 font-bold mb-4">
            SELECT YOUR VIP EXPERIENCE
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LOUNGE_PACKAGES.map((pkg) => {
              const isSelected = selectedPkg === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPkg(pkg.id)}
                  className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-6 ${
                    isSelected
                      ? 'bg-amber-400/10 border-amber-400 text-white shadow-xl shadow-amber-400/10'
                      : 'bg-[#090d16] border-white/10 text-slate-300 hover:border-white/20'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-emerald-400 uppercase">{pkg.category}</span>
                      <span className="font-mono text-xs text-slate-400">{pkg.capacity}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white font-display">{pkg.name}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">{pkg.description}</p>
                    <div className="pt-3 border-t border-white/5 space-y-1.5 text-xs">
                      {pkg.perks.map((p, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-slate-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <div className="text-[10px] font-mono uppercase text-slate-400">Minimum Spend</div>
                    <div className="text-lg font-bold font-mono text-amber-400">
                      ₦{pkg.minSpend.toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Table Reservation Form */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#090d16] border border-white/10 shadow-2xl">
          <div className="max-w-2xl mb-6">
            <h3 className="text-2xl font-bold text-white font-display">
              Reserve Your VIP Table or Private Room
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Currently selected: <strong className="text-amber-400">{activePackage.name}</strong> ({activePackage.capacity})
            </p>
          </div>

          {booked ? (
            <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white">VIP Table Reserved at Masters Lounge!</h4>
              <p className="text-xs sm:text-sm text-slate-300 font-light max-w-md mx-auto">
                Hello <strong className="text-white">{clientName}</strong>, your VIP booth is confirmed for <strong className="text-white">{resDate} at {resTime}</strong> for {guestCount} guests. Our lounge manager will call you right away.
              </p>
              <button
                type="button"
                onClick={() => setBooked(false)}
                className="text-xs text-emerald-400 font-bold underline mt-2 inline-block cursor-pointer"
              >
                Book Another Table
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chief Emeka Okoro"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Phone Number (Nigeria) *</label>
                <input
                  type="tel"
                  required
                  placeholder="0803 000 0000"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Reservation Date</label>
                <input
                  type="date"
                  value={resDate}
                  onChange={(e) => setResDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Arrival Time</label>
                <select
                  value={resTime}
                  onChange={(e) => setResTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs outline-none focus:border-amber-400"
                >
                  <option value="18:00">6:00 PM (Sunset Chilling)</option>
                  <option value="20:00">8:00 PM (Dinner &amp; Drinks)</option>
                  <option value="21:30">9:30 PM (Prime Nightlife)</option>
                  <option value="23:00">11:00 PM (Late Night Vault)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Number of Guests</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Preferred Drink Preference</label>
                <select
                  value={specialDrink}
                  onChange={(e) => setSpecialDrink(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs outline-none focus:border-amber-400"
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
                  className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  Confirm VIP Table Booking
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
