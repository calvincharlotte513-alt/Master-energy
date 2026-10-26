import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CalendarCheck, Sparkles, Wine, Trees, UtensilsCrossed, Check } from 'lucide-react';

export const BookPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'wash' | 'lounge' | 'garden' | 'kitchen'>('wash');

  // Common booking success state
  const [confirmed, setConfirmed] = useState<string | null>(null);

  // Forms state
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [date, setDate] = useState<string>('2026-10-27');
  const [time, setTime] = useState<string>('12:00');
  const [detail, setDetail] = useState<string>('Executive Wash (Sedan)');

  const services = [
    {
      id: 'wash' as const,
      name: 'Automated Car Wash',
      desc: 'Reserve a guaranteed bay & high-pressure underbody detailing slot.',
      badge: 'Bay 1 & 2 Available',
      icon: Sparkles,
      defaultDetail: 'Executive Wash (Sedan)'
    },
    {
      id: 'lounge' as const,
      name: 'Masters Upstairs Lounge',
      desc: 'Exclusive booth seating, chilled champagne, cognacs & private AC lounge.',
      badge: 'VIP Section',
      icon: Wine,
      defaultDetail: 'Executive Booth for 6 People + Bottle of Cognac'
    },
    {
      id: 'garden' as const,
      name: 'Beer Garden & Grill',
      desc: 'Outdoor cabana seating, live sports big screen, and sizzling suya feast.',
      badge: 'Open-Air Pergola',
      icon: Trees,
      defaultDetail: 'Palm Cabana Table for 8 + 2kg Beef Suya'
    },
    {
      id: 'kitchen' as const,
      name: 'Masters Kitchen Meal',
      desc: 'Pre-order hot party jollof, smoked catfish, goat meat pepper soup.',
      badge: 'Fresh & Fast',
      icon: UtensilsCrossed,
      defaultDetail: '3 Packs of Party Jollof & Grilled Fish to go'
    }
  ];

  const handleServiceSelect = (serviceId: 'wash' | 'lounge' | 'garden' | 'kitchen', defaultDetailText: string) => {
    setActiveTab(serviceId);
    setConfirmed(null);
    setDetail(defaultDetailText);
  };

  const handleBook = (serviceName: string) => (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(serviceName);
  };

  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-[#080d1a] border-t border-slate-200 dark:border-slate-800 min-h-screen text-slate-900 dark:text-white font-opensans transition-colors duration-250">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-blue-900 dark:text-blue-400 font-bold uppercase tracking-wider">
            <CalendarCheck className="w-4 h-4 text-red-600" />
            <span>CENTRAL BOOKING DESK · MASTER ENERGY NAZE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white font-display">
            Book Your Service in Advance
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto font-normal leading-relaxed">
            Choose what you want to reserve ahead of your arrival so you don&apos;t wait in line. Tap any card below to select your service.
          </p>
        </div>

        {/* 4 Interactive Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-hidden">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            const isSelected = activeTab === svc.id;

            return (
              <motion.button
                key={svc.id}
                type="button"
                onClick={() => handleServiceSelect(svc.id, svc.defaultDetail)}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: idx * 0.04 }}
                style={{ willChange: 'transform, opacity' }}
                className={`p-6 rounded-3xl text-left cursor-pointer transition-all duration-300 relative flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? 'bg-blue-900 text-white border-2 border-blue-950 shadow-xl ring-4 ring-offset-2 ring-blue-900/30 scale-[1.02]'
                    : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-800 shadow-md hover:border-blue-300'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                        isSelected ? 'bg-white text-blue-900' : 'bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                        isSelected
                          ? 'bg-blue-950 text-amber-300'
                          : 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200'
                      }`}
                    >
                      {svc.badge}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-display">
                      {svc.name}
                    </h3>
                    <p className={`text-xs mt-1.5 leading-relaxed ${isSelected ? 'text-blue-100' : 'text-slate-600 dark:text-slate-400'}`}>
                      {svc.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-current/10 flex items-center justify-between">
                  <span className={`text-[11px] font-mono font-bold uppercase tracking-wider ${isSelected ? 'text-amber-300' : 'text-blue-900 dark:text-blue-400'}`}>
                    {isSelected ? '✓ Selected' : 'Tap to Reserve'}
                  </span>
                  <span className="text-xs font-bold">&rarr;</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Dynamic Reservation Form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: 'transform, opacity' }}
          className="p-8 sm:p-12 rounded-3xl bg-[#091224] text-white border-2 border-blue-900/60 shadow-2xl max-w-4xl mx-auto"
        >
          {confirmed ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
                <Check className="w-7 h-7 stroke-[3]" />
              </div>
              <h3 className="text-2xl font-bold text-white font-display">
                {confirmed} Reserved!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto font-normal leading-relaxed">
                Thank you <strong className="text-amber-300">{name || 'Guest'}</strong>. Your appointment for <strong className="text-amber-300">{date} at {time}</strong> is saved. Our desk will send an SMS or call <strong className="text-amber-300">{phone}</strong>.
              </p>
              <button
                type="button"
                onClick={() => setConfirmed(null)}
                className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-blue-900 hover:bg-blue-800 rounded-xl transition-colors cursor-pointer mt-4 shadow-md shadow-blue-900/20"
              >
                Make Another Booking
              </button>
            </div>
          ) : (
            <form onSubmit={handleBook(activeTab === 'wash' ? 'Car Wash Bay' : activeTab === 'lounge' ? 'VIP Lounge Table' : activeTab === 'garden' ? 'Garden Cabana' : 'Kitchen Meal')} className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
                <div className="font-mono text-xs uppercase tracking-wider text-amber-300 font-bold">
                  {activeTab === 'wash' && 'BOOKING FOR: MASTERS AUTOMATED CAR WASH'}
                  {activeTab === 'lounge' && 'BOOKING FOR: MASTERS UPSTAIRS VIP LOUNGE'}
                  {activeTab === 'garden' && 'BOOKING FOR: MASTERS BAR & OPEN-AIR GARDEN'}
                  {activeTab === 'kitchen' && 'BOOKING FOR: MASTERS KITCHEN RESTAURANT'}
                </div>
                <span className="text-[11px] font-mono text-slate-400">Instant SMS Confirmation</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-300 block mb-1 font-medium">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chief Emeka"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none focus:border-blue-400 shadow-sm placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1 font-medium">Phone Number (Nigeria) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0803 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none focus:border-blue-400 shadow-sm placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1 font-medium">Booking Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none focus:border-blue-400 shadow-sm"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1 font-medium">Arrival Time</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none focus:border-blue-400 shadow-sm"
                  >
                    <option value="09:00">09:00 AM (Morning)</option>
                    <option value="12:00">12:00 PM (Afternoon Lunch)</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="18:00">06:00 PM (Evening Sunset)</option>
                    <option value="20:30">08:30 PM (Nightlife)</option>
                    <option value="22:30">10:30 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">
                  {activeTab === 'wash' && 'Service Package & Car Model'}
                  {activeTab === 'lounge' && 'VIP Package Preference'}
                  {activeTab === 'garden' && 'Garden Spot & Drinks Preference'}
                  {activeTab === 'kitchen' && 'Meal Request or Table Size'}
                </label>
                <input
                  type="text"
                  placeholder={
                    activeTab === 'wash'
                      ? 'e.g. Deluxe Wash for Lexus RX 350 (Plate: WER-123-AA)'
                      : activeTab === 'lounge'
                      ? 'e.g. Executive Booth for 6 People + Bottle of Cognac'
                      : activeTab === 'garden'
                      ? 'e.g. Palm Cabana Table for 8 + 2kg Beef Suya'
                      : 'e.g. 3 Packs of Party Jollof & Grilled Fish to go'
                  }
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none focus:border-blue-400 shadow-sm placeholder:text-slate-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all cursor-pointer shadow-md shadow-red-600/25 active:scale-[0.99]"
                >
                  Confirm Reservation Now
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};
