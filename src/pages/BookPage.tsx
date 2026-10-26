import React, { useState } from 'react';
import { CalendarCheck, Sparkles, Wine, Trees, UtensilsCrossed, Check } from 'lucide-react';
import { WASH_SERVICES, LOUNGE_PACKAGES, KITCHEN_MENU } from '../data/hubData';

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

  const handleBook = (serviceName: string) => (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(serviceName);
  };

  return (
    <div className="py-10 sm:py-16 bg-[#04060a]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="border-b border-white/10 pb-8 space-y-3 text-center">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-amber-400 font-bold uppercase tracking-wider">
            <CalendarCheck className="w-4 h-4" />
            <span>CENTRAL BOOKING DESK · MASTER ENERGY NAZE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
            Book Your Service in Advance
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-normal leading-relaxed">
            Choose what you want to reserve ahead of your arrival so you don&apos;t wait in line.
          </p>

          {/* Service Switcher Tabs */}
          <div className="pt-4 flex flex-wrap justify-center gap-2">
            {[
              { id: 'wash', label: 'Car Wash Bay', icon: Sparkles },
              { id: 'lounge', label: 'VIP Lounge Table', icon: Wine },
              { id: 'garden', label: 'Garden Cabana', icon: Trees },
              { id: 'kitchen', label: 'Kitchen Takeaway', icon: UtensilsCrossed }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id as typeof activeTab);
                    setConfirmed(null);
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
                      : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Booking Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#090d16] border border-white/10 shadow-2xl">
          {confirmed ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white font-display">
                {confirmed} Reserved!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto font-light leading-relaxed">
                Thank you <strong className="text-white">{name || 'Guest'}</strong>. Your appointment for <strong className="text-white">{date} at {time}</strong> is saved. Our desk will send an SMS or call <strong className="text-amber-400">{phone}</strong>.
              </p>
              <button
                type="button"
                onClick={() => setConfirmed(null)}
                className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer mt-4"
              >
                Make Another Booking
              </button>
            </div>
          ) : (
            <form onSubmit={handleBook(activeTab === 'wash' ? 'Car Wash Bay' : activeTab === 'lounge' ? 'VIP Lounge Table' : activeTab === 'garden' ? 'Garden Cabana' : 'Kitchen Meal')} className="space-y-5">
              <div className="font-mono text-xs uppercase tracking-wider text-amber-400 font-bold">
                {activeTab === 'wash' && 'BOOKING FOR: MASTERS AUTOMATED CAR WASH'}
                {activeTab === 'lounge' && 'BOOKING FOR: MASTERS UPSTAIRS VIP LOUNGE'}
                {activeTab === 'garden' && 'BOOKING FOR: MASTERS BAR & OPEN-AIR GARDEN'}
                {activeTab === 'kitchen' && 'BOOKING FOR: MASTERS KITCHEN RESTAURANT'}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chief Emeka"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Phone Number (Nigeria) *</label>
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
                  <label className="text-xs text-slate-400 block mb-1">Booking Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Arrival Time</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs outline-none focus:border-amber-400"
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
                <label className="text-xs text-slate-400 block mb-1">
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  Confirm Reservation Now
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
