import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Clock,
  CheckCircle2,
  MapPin,
  Briefcase,
  Truck,
  ArrowRight,
  Phone,
  Flame,
  UtensilsCrossed,
  Wine,
  Sparkles,
  Trees,
  CalendarCheck
} from 'lucide-react';
import { PageId } from '../../types/hub';

interface StationWriteupSectionProps {
  onNavigatePage: (page: PageId) => void;
}

export const StationWriteupSection: React.FC<StationWriteupSectionProps> = ({ onNavigatePage }) => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Lagos',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="station-details" className="relative py-14 sm:py-20 lg:py-24 bg-[#04060a] border-t border-white/10 text-white font-opensans">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Milestone Kicker: Nigerian Location & Real Time */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 font-roboto text-xs uppercase tracking-wider text-amber-400 font-bold">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <span>KM 3 Aba-Owerri Road</span>
            <span className="text-white/40">·</span>
            <span>Naze, Owerri, Imo State</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-roboto text-slate-300">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>West Africa Time: {currentTime || '12:00 PM'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Station Open 24/7</span>
            </div>
          </div>
        </div>

        {/* Real-time Dynamic Digital Energy Meters Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12">
          {/* PMS Petrol Meter */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#090d16] border border-amber-400/30 shadow-xl space-y-1">
            <div className="flex items-center justify-between text-xs font-roboto font-bold text-slate-400 uppercase tracking-wider">
              <span>PMS (Petrol)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">
                Pumps 1-8
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-roboto">
              ₦710 <span className="text-xs font-normal text-slate-400">/ Liter</span>
            </div>
            <div className="text-[11px] text-slate-400 font-opensans">
              DPR Calibrated · 10 Liters is 10 Liters
            </div>
          </div>

          {/* AGO Diesel Meter */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#090d16] border border-emerald-400/30 shadow-xl space-y-1">
            <div className="flex items-center justify-between text-xs font-roboto font-bold text-slate-400 uppercase tracking-wider">
              <span>AGO (Diesel)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-400/10 text-emerald-300 border border-emerald-400/20">
                Heavy Flow
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-roboto">
              ₦1,050 <span className="text-xs font-normal text-slate-400">/ Liter</span>
            </div>
            <div className="text-[11px] text-slate-400 font-opensans">
              Clean High-Cetane For Trucks &amp; Gen
            </div>
          </div>

          {/* DPK Kerosene & Gas Meter */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#090d16] border border-sky-400/30 shadow-xl space-y-1">
            <div className="flex items-center justify-between text-xs font-roboto font-bold text-slate-400 uppercase tracking-wider">
              <span>DPK &amp; Gas</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-sky-400/10 text-sky-300 border border-sky-400/20">
                Domestic
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-sky-400 font-roboto">
              ₦890 <span className="text-xs font-normal text-slate-400">/ Liter</span>
            </div>
            <div className="text-[11px] text-slate-400 font-opensans">
              DPK ₦890 · Cooking Gas ₦1,250/Kg
            </div>
          </div>

          {/* Station Status Meter */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#090d16] border border-white/10 shadow-xl space-y-1">
            <div className="flex items-center justify-between text-xs font-roboto font-bold text-slate-400 uppercase tracking-wider">
              <span>Power &amp; Status</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-400/30">
                Online
              </span>
            </div>
            <div className="text-base sm:text-lg font-extrabold text-white font-roboto pt-1 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Standby Light 24/7</span>
            </div>
            <div className="text-[11px] text-slate-400 font-opensans">
              Dedicated Generator + Solar Inverters
            </div>
          </div>
        </div>

        {/* Core Nigerian Headline & Simple Human Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-roboto font-bold uppercase tracking-wider">
              <span>Welcome to Master Energy Naze</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight font-poppins">
              Clean Fuel, Good Food &amp; Cool Chilling in Naze.
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-opensans font-normal">
              Everything you need in one clean stop along Aba-Owerri Road. We give you accurate fuel meters that never cheat (10 liters is 10 liters), sweet hot food at Masters Kitchen, executive drinks upstairs at Masters Lounge, quick car wash, and cool open-air garden relaxation with hot suya.
            </p>

            {/* Quick Action Navigation Pills */}
            <div className="flex flex-wrap items-center gap-3 pt-2 font-inter">
              <button
                type="button"
                onClick={() => onNavigatePage('oil-gas')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-amber-500/25 cursor-pointer"
              >
                <span>Check Today&apos;s Fuel Rates</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigatePage('kitchen')}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/15 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              >
                <UtensilsCrossed className="w-4 h-4 text-amber-400" />
                <span>Masters Kitchen Menu</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigatePage('book')}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 text-amber-300 border border-amber-400/40 text-xs sm:text-sm font-bold transition-all cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book VIP Table or Service</span>
              </button>
            </div>
          </div>

          {/* Right Column: Station Overview Services Panel */}
          <div className="lg:col-span-5 bg-[#090d16] border border-white/10 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="font-roboto text-xs font-bold text-amber-400 uppercase tracking-wider">
                Inside Master Energy Compound
              </span>
              <span className="text-[11px] font-roboto text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-md font-bold">
                Fully Operational
              </span>
            </div>

            <div className="space-y-2.5">
              {[
                { id: 'oil-gas' as PageId, name: 'Fuel Forecourt', desc: '16 digital nozzles · PMS, AGO, DPK & LPG Gas', icon: Flame },
                { id: 'kitchen' as PageId, name: 'Masters Kitchen', desc: 'Hot party jollof rice, Ofe Owerri, fresh catfish & pepper soup', icon: UtensilsCrossed },
                { id: 'lounge' as PageId, name: 'Masters VIP Lounge', desc: 'Upstairs executive lounge, champagne, cocktails & private pods', icon: Wine },
                { id: 'carwash' as PageId, name: 'Automated Car Wash', desc: 'High-pressure foam wash, chassis wash & interior vacuuming', icon: Sparkles },
                { id: 'garden' as PageId, name: 'Masters Bar & Garden', desc: 'Live charcoal suya, roasted chicken, cold drinks & matchday screens', icon: Trees },
                { id: 'promenade' as PageId, name: 'Leased Promenade', desc: 'Zena Foodies, Presh Arabian Tea, supermarket & salons', icon: Briefcase }
              ].map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onNavigatePage(item.id)}
                    className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-amber-400/15 border border-white/10 hover:border-amber-400/40 transition-all text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-poppins font-bold text-white text-xs sm:text-sm group-hover:text-amber-300 transition-colors truncate">
                          {item.name}
                        </div>
                        <div className="font-opensans text-[11px] text-slate-400 truncate">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4 Reassurance Pillars (The Master Energy Guarantee) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-[#090d16] border border-white/10 shadow-2xl">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-poppins font-bold text-sm sm:text-base text-white">
              10 Liters is 10 Liters
            </h4>
            <p className="font-opensans text-xs text-slate-300 leading-relaxed">
              No under-dispensing. All our 16 meters are sealed with DPR certified digital inspection locks. What you pay for is what enters your tank.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-poppins font-bold text-sm sm:text-base text-white">
              24/7 Power Always
            </h4>
            <p className="font-opensans text-xs text-slate-300 leading-relaxed">
              Our 150kVA standby generator and industrial solar inverters guarantee bright floodlights, running pumps, and ice-cold drinks day and night.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-sky-400">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="font-poppins font-bold text-sm sm:text-base text-white">
              Corporate &amp; Fleet Fuel
            </h4>
            <p className="font-opensans text-xs text-slate-300 leading-relaxed">
              Logistics companies, school buses, and corporate fleets enjoy monthly billing, priority fueling lanes, and electronic consumption receipts.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-400/10 border border-purple-400/20 flex items-center justify-center text-purple-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="font-poppins font-bold text-sm sm:text-base text-white">
              Safe &amp; Clean Compound
            </h4>
            <p className="font-opensans text-xs text-slate-300 leading-relaxed">
              Paved spacious parking, 24-hour uniformed security guards, CCTV cameras, modern clean tiled restrooms, and courteous station staff.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
