import React, { useState } from 'react';
import { motion } from 'motion/react';
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
    <div className="py-10 sm:py-16 bg-white w-full max-w-full overflow-hidden font-opensans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="border-b border-slate-200 pb-8 space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-amber-600 font-bold uppercase tracking-wider">
            <span>DIVISION V · MASTERS BAR &amp; GARDEN</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 font-display">
            Masters Bar &amp; Garden
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl font-normal leading-relaxed">
            Open-air relaxation under tall green palm trees in Naze. Eat hot spicy ram suya, asun, fresh point-and-kill catfish, drink cold beer, and watch Premier League football on big screens.
          </p>
        </div>

        {/* Hero Photo */}
        <div className="relative h-64 sm:h-96 rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xl">
          <img
            src="/images/masters_bar_garden_1792957565781.jpg"
            onError={(e) => {
              const current = e.currentTarget.getAttribute('src');
              if (current?.startsWith('/images/')) {
                e.currentTarget.src = current.replace('/images/', '/assets/images/');
              }
            }}
            alt="Masters Bar & Garden Palm Terrace"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-amber-400 font-bold uppercase">Fresh Air &amp; Good Music</div>
              <div className="text-xl sm:text-2xl font-bold text-white font-display">Chilled Drinks, Hot Suya &amp; Live Matchday</div>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-950 bg-amber-400 font-bold px-3 py-1.5 rounded-lg shadow-md">
              <Clock className="w-3.5 h-3.5" />
              <span>12:00 PM – 2:00 AM Daily</span>
            </div>
          </div>
        </div>

        {/* Garden Features Grid - Alternating Black & Yellow Sliding Boxes */}
        <div>
          <div className="font-mono text-xs uppercase tracking-wider text-slate-500 font-bold mb-4">
            WHAT WE OFFER AT THE GARDEN
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-hidden">
            {GARDEN_FEATURES.map((feat, idx) => {
              const icons = { Flame, Tv, Music, Compass };
              const IconComp = icons[feat.iconName as keyof typeof icons] || Trees;
              const isBlackBox = idx % 2 === 0;
              const slideX = isBlackBox ? -24 : 24;

              return (
                <motion.div
                  key={feat.id}
                  initial={{ opacity: 0, x: slideX, y: 12 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.35, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  style={{ willChange: 'transform, opacity' }}
                  className={`p-6 rounded-3xl transition-all duration-300 space-y-4 ${
                    isBlackBox
                      ? 'bg-slate-950 text-white border-2 border-amber-400/40 shadow-xl hover:border-amber-400 hover:shadow-2xl'
                      : 'bg-amber-400 text-slate-950 border-2 border-amber-500 shadow-xl hover:border-slate-950 hover:shadow-2xl'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-xs ${
                    isBlackBox
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-slate-950 text-amber-400'
                  }`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className={`font-display font-bold text-base ${isBlackBox ? 'text-white' : 'text-slate-950'}`}>
                    {feat.title}
                  </h3>
                  <p className={`text-xs leading-relaxed ${isBlackBox ? 'text-slate-300 font-normal' : 'text-slate-950 font-medium'}`}>
                    {feat.description}
                  </p>
                  <div className={`text-[11px] font-mono font-bold pt-2 border-t ${
                    isBlackBox ? 'border-white/10 text-amber-400' : 'border-slate-950/20 text-slate-950'
                  }`}>
                    {feat.schedule}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Live Matchday & Weekend Music Schedule */}
        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-950 font-display">
            Matchday &amp; Live Band Schedule
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs overflow-hidden">
            {/* Box 1: Yellow Box sliding from left */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="p-7 rounded-3xl bg-amber-400 text-slate-950 border-2 border-amber-500 space-y-3 shadow-xl hover:border-slate-950 font-bold"
            >
              <div className="flex items-center justify-between font-mono text-slate-950 font-black">
                <span>PREMIER LEAGUE &amp; CHAMPIONS LEAGUE</span>
                <span className="bg-slate-950 text-amber-400 px-2 py-0.5 rounded text-[10px]">HD SCREENS</span>
              </div>
              <p className="font-medium text-slate-950 leading-relaxed">
                Every Tuesday, Wednesday &amp; Weekend. Free entry, ice-cold beer buckets, and fresh suya straight from the grill master.
              </p>
            </motion.div>

            {/* Box 2: Black Box sliding from right */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="p-7 rounded-3xl bg-slate-950 text-white border-2 border-amber-400/40 space-y-3 shadow-xl hover:border-amber-400"
            >
              <div className="flex items-center justify-between font-mono text-amber-400 font-bold">
                <span>ACOUSTIC HIGHLIFE &amp; AFROBEATS</span>
                <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded text-[10px]">EVERY WEEKEND</span>
              </div>
              <p className="font-normal text-slate-300 leading-relaxed">
                Fridays &amp; Sundays from 7:00 PM. Live saxophone, sweet Igbo guitar melodies, and cold drinks under palm fairy lights.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Reserve Garden Cabana Table Form: Luxury Black Box sliding in from bottom */}
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
              Reserve an Open-Air Garden Cabana
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Perfect for birthday chilling, friends hangout, or football match viewing
            </p>
          </div>

          {booked ? (
            <div className="p-8 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white">Garden Cabana Table Reserved!</h4>
              <p className="text-xs sm:text-sm text-slate-300 font-normal max-w-md mx-auto">
                Hello <strong className="text-amber-400">{cabanaName}</strong>, your garden cabana table for {guestCount} guests is confirmed for <strong className="text-amber-400">{resDate} at {resTime}</strong>. We will have your fresh grill ready upon arrival.
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
                <label className="text-xs text-slate-300 block mb-1 font-medium">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Obioma Nwachukwu"
                  value={cabanaName}
                  onChange={(e) => setCabanaName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/20 text-white text-xs outline-none focus:border-amber-400 shadow-sm"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="0803 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/20 text-white text-xs outline-none focus:border-amber-400 shadow-sm"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">Date</label>
                <input
                  type="date"
                  value={resDate}
                  onChange={(e) => setResDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/20 text-white text-xs outline-none focus:border-amber-400 shadow-sm"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">Time</label>
                <select
                  value={resTime}
                  onChange={(e) => setResTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/20 text-white text-xs outline-none focus:border-amber-400 shadow-sm"
                >
                  <option value="16:00">4:00 PM (Afternoon Breeze)</option>
                  <option value="18:00">6:00 PM (Sunset &amp; Suya)</option>
                  <option value="20:00">8:00 PM (Matchday Prime)</option>
                  <option value="22:00">10:00 PM (Late Night Chilling)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">How Many People?</label>
                <input
                  type="number"
                  min={2}
                  max={30}
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/20 text-white text-xs outline-none focus:border-amber-400 shadow-sm"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">Grill Pre-Order (Optional)</label>
                <select
                  value={suyaPreOrder}
                  onChange={(e) => setSuyaPreOrder(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/20 text-white text-xs outline-none focus:border-amber-400 shadow-sm"
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
                  className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-500/20 hover:scale-102"
                >
                  Reserve Garden Cabana Spot
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};


