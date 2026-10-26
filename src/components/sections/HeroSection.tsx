import React, { useState, useEffect } from 'react';
import { ArrowRight, Compass, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { PageId } from '../../types/hub';

interface HeroSectionProps {
  onExplore3D: () => void;
  onNavigatePage: (page: PageId) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore3D, onNavigatePage }) => {
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
    <section className="relative min-h-[85vh] flex flex-col justify-between pt-8 pb-14 sm:pt-12 sm:pb-18 lg:pt-14 lg:pb-20 overflow-hidden border-b border-slate-200 font-opensans w-full max-w-full bg-slate-50">
      {/* Station Background Image with Daylight Scrim */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/src/assets/images/station_3d_twin_living_1792960257471.jpg"
          alt="Master Energy Ltd Living Forecourt in Naze Imo State"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-105 contrast-95 scale-100"
        />
        {/* Crisp white & soft amber overlay for daylight luxury reading */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/85 to-amber-50/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto min-w-0">
        {/* Nigerian Location Kicker */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 text-xs pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2 font-mono text-amber-700 font-bold uppercase text-[11px] sm:text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
            <span>KM 3 Aba-Owerri Road</span>
            <span className="text-slate-400">·</span>
            <span>Naze, Imo State</span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px] text-slate-700">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>WAT {currentTime || '12:00 PM'}</span>
            </div>
            <span className="text-slate-300 hidden sm:inline">·</span>
            <span className="text-emerald-700 font-bold hidden sm:inline">Active 24/7 Day &amp; Night</span>
          </div>
        </div>

        {/* 2-Column Responsive Layout in White & Yellow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Card */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-md border border-amber-200 shadow-xl space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-xs font-mono font-bold uppercase tracking-wider text-amber-900 border border-amber-300">
              Welcome to Master Energy Mega Station
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-slate-950 leading-[1.1] font-display">
              Clean Fuel, Good Food &amp; Cool Chilling in Naze.
            </h1>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              Everything you need in one clean stop along Aba-Owerri Road. We give you accurate fuel meters that never cheat, sweet hot food at Masters Kitchen, executive drinks upstairs at Masters Lounge, quick car wash, and cool open-air garden relaxation with hot suya.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onExplore3D}
                className="flex items-center gap-2 px-5 sm:px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-yellow-400 rounded-xl transition-all shadow-md shadow-amber-400/30 border border-amber-500 whitespace-nowrap cursor-pointer hover:scale-105 active:scale-95"
              >
                <Compass className="w-4 h-4 shrink-0" />
                <span>Explore Station in 3D</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigatePage('oil-gas')}
                className="flex items-center gap-2 px-4 sm:px-5 py-3 text-xs sm:text-sm font-bold text-slate-900 hover:text-black bg-white hover:bg-amber-50 rounded-xl border border-slate-300 shadow-xs transition-all whitespace-nowrap cursor-pointer"
              >
                <span>Check Today&apos;s Fuel Price</span>
                <ArrowRight className="w-4 h-4 text-amber-600 shrink-0" />
              </button>
            </div>

            {/* Reassurance points */}
            <div className="pt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>10 Liters is 10 Liters (No Under-dispensing)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>24/7 Standby Generator &amp; Solar Light</span>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Services Overview Card */}
          <div className="lg:col-span-5 min-w-0">
            <div className="p-5 sm:p-7 rounded-3xl bg-white/95 backdrop-blur-md border border-amber-200 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="font-mono text-xs font-bold text-amber-800 uppercase tracking-wider">
                  Inside Master Energy Naze
                </span>
                <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-300 font-bold">
                  Open 24 Hours
                </span>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  { page: 'oil-gas' as PageId, name: 'Fuel Forecourt', desc: 'Petrol, Diesel, Kerosene & Gas' },
                  { page: 'kitchen' as PageId, name: 'Masters Kitchen', desc: 'Party Jollof, Ofe Owerri & Fish' },
                  { page: 'lounge' as PageId, name: 'Masters Lounge', desc: 'VIP Drinks, Cocktails & Private Pods' },
                  { page: 'carwash' as PageId, name: 'Masters Car Wash', desc: 'Foam Wash, Underbody & Vacuum' },
                  { page: 'garden' as PageId, name: 'Masters Bar & Garden', desc: 'Hot Suya, Asun & Football Matches' },
                  { page: 'promenade' as PageId, name: 'Leased Shops', desc: 'Zena Foodies & Presh Arabian Tea' }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onNavigatePage(item.page)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 transition-all text-left cursor-pointer group"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="font-bold text-slate-900 text-xs group-hover:text-amber-800 transition-colors truncate">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-slate-600 truncate">
                        {item.desc}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI Strip - White & Yellow Luxury Metrics */}
        <div className="mt-8 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 p-4 sm:p-6 rounded-2xl bg-white/95 backdrop-blur-md border border-amber-200 shadow-lg">
          <div className="min-w-0 space-y-1">
            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-950 font-display tracking-tight truncate">
              16 Pumps
            </div>
            <div className="text-[11px] sm:text-xs text-slate-600 font-mono truncate">Fast Digital Nozzles</div>
          </div>

          <div className="min-w-0 space-y-1">
            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-amber-600 font-display tracking-tight truncate">
              5 Spots
            </div>
            <div className="text-[11px] sm:text-xs text-slate-600 font-mono truncate">Original Services</div>
          </div>

          <div className="min-w-0 space-y-1">
            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-950 font-display tracking-tight truncate">
              24/7 Power
            </div>
            <div className="text-[11px] sm:text-xs text-slate-600 font-mono truncate">Standby Light Always</div>
          </div>

          <div className="min-w-0 space-y-1">
            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-emerald-700 font-display tracking-tight truncate">
              100% Correct
            </div>
            <div className="text-[11px] sm:text-xs text-slate-600 font-mono truncate">Guaranteed Liters</div>
          </div>
        </div>
      </div>
    </section>
  );
};
