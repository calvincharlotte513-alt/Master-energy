import React, { useState } from 'react';
import { GARDEN_FEATURES } from '../data/hubData';
import { Trees, Clock, Check, Flame, Tv, Music, Compass } from 'lucide-react';

export const GardenPage: React.FC = () => {
  const [resDate, setResDate] = useState<string>('2026-10-31');
  const [resTime, setResTime] = useState<string>('18:00');
  const [guestCount, setGuestCount] = useState<number>(6);
  const [cabanaName, setCabanaName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [suyaPreOrder, setSuyaPreOrder] = useState<string>('2kg Beef Suya & 1 Catfish Point & Kill');
  const [booked, setBooked] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  return (
    <div className="py-10 sm:py-16 bg-[#04060a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="border-b border-white/10 pb-8 space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-rose-400 font-bold uppercase tracking-wider">
            <span>DIVISION V · MASTERS BAR &amp; GARDEN</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
            Masters Bar &amp; Garden
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-normal leading-relaxed">
            Open-air relaxation under tall green palm trees in Naze. Eat hot spicy ram suya, asun, fresh point-and-kill catfish, drink cold beer, and watch Premier League football on big screens.
          </p>
        </div>

        {/* Hero Photo */}
        <div className="relative h-64 sm:h-96 rounded-3xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl">
          <img
            src="/src/assets/images/masters_bar_garden_1792957565781.jpg"
            alt="Masters Bar & Garden Palm Terrace"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04060a] via-black/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-rose-400 font-bold uppercase">Fresh Air &amp; Good Music</div>
              <div className="text-xl sm:text-2xl font-bold text-white font-display">Chilled Drinks, Hot Suya &amp; Live Matchday</div>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-black/70 px-3 py-1.5 rounded-lg border border-white/10">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>12:00 PM – 2:00 AM Daily</span>
            </div>
          </div>
        </div>

        {/* Garden Features Grid */}
        <div>
          <div className="font-mono text-xs uppercase tracking-wider text-slate-400 font-bold mb-4">
            WHAT WE OFFER AT THE GARDEN
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GARDEN_FEATURES.map((feat) => {
              const icons = { Flame, Tv, Music, Compass };
              const IconComp = icons[feat.iconName as keyof typeof icons] || Trees;
              return (
                <div
                  key={feat.id}
                  className="p-6 rounded-3xl bg-[#090d16] border border-white/10 space-y-4 hover:border-rose-400/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-base text-white">{feat.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">{feat.description}</p>
                  <div className="text-[11px] font-mono text-amber-400 pt-2 border-t border-white/5">
                    {feat.schedule}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Matchday & Weekend Music Schedule */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#090d16] border border-white/10 space-y-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
            Matchday &amp; Live Band Schedule
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
              <div className="flex items-center justify-between font-mono text-amber-400 font-bold">
                <span>PREMIER LEAGUE &amp; CHAMPIONS LEAGUE</span>
                <span>HD SCREENS</span>
              </div>
              <p className="font-light">Every Tuesday, Wednesday &amp; Weekend. Free entry, ice-cold beer buckets, and fresh suya straight from the grill master.</p>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
              <div className="flex items-center justify-between font-mono text-rose-400 font-bold">
                <span>ACOUSTIC HIGHLIFE &amp; AFROBEATS</span>
                <span>EVERY WEEKEND</span>
              </div>
              <p className="font-light">Fridays &amp; Sundays from 7:00 PM. Live saxophone, sweet Igbo guitar melodies, and cold drinks under palm fairy lights.</p>
            </div>
          </div>
        </div>

        {/* Reserve Garden Cabana Table Form */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#090d16] border border-white/10 shadow-2xl">
          <div className="max-w-2xl mb-6">
            <h3 className="text-2xl font-bold text-white font-display">
              Reserve an Open-Air Garden Cabana
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Perfect for birthday chilling, friends hangout, or football match viewing
            </p>
          </div>

          {booked ? (
            <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white">Garden Cabana Table Reserved!</h4>
              <p className="text-xs sm:text-sm text-slate-300 font-light max-w-md mx-auto">
                Hello <strong className="text-white">{cabanaName}</strong>, your garden cabana table for {guestCount} guests is confirmed for <strong className="text-white">{resDate} at {resTime}</strong>. We will have your fresh grill ready upon arrival.
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
                <label className="text-xs text-slate-400 block mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Obioma Nwachukwu"
                  value={cabanaName}
                  onChange={(e) => setCabanaName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="0803 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Date</label>
                <input
                  type="date"
                  value={resDate}
                  onChange={(e) => setResDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Time</label>
                <select
                  value={resTime}
                  onChange={(e) => setResTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs outline-none focus:border-amber-400"
                >
                  <option value="16:00">4:00 PM (Afternoon Breeze)</option>
                  <option value="18:00">6:00 PM (Sunset &amp; Suya)</option>
                  <option value="20:00">8:00 PM (Matchday Prime)</option>
                  <option value="22:00">10:00 PM (Late Night Chilling)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">How Many People?</label>
                <input
                  type="number"
                  min={2}
                  max={30}
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Grill Pre-Order (Optional)</label>
                <select
                  value={suyaPreOrder}
                  onChange={(e) => setSuyaPreOrder(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs outline-none focus:border-amber-400"
                >
                  <option value="2kg Beef Suya & 1 Catfish Point & Kill">Beef Suya + Point-and-Kill Catfish</option>
                  <option value="Plate of Spicy Goat Meat Asun">Hot Spicy Goat Meat Asun</option>
                  <option value="Bucket of Chilled Nigerian Beers">Bucket of Cold Chilled Beers</option>
                  <option value="Will order when we arrive">Will order when we arrive</option>
                </select>
              </div>

              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-rose-400 hover:bg-rose-300 rounded-xl transition-all cursor-pointer shadow-lg shadow-rose-500/20"
                >
                  Reserve Garden Cabana Spot
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
