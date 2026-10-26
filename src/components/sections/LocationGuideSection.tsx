import React from 'react';
import { NAZE_HUB_INFO } from '../../data/hubData';
import { MapPin, Navigation, Phone, Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const LocationGuideSection: React.FC = () => {
  return (
    <section id="location" className="py-16 lg:py-24 bg-white dark:bg-[#080d1a] border-t border-slate-200 dark:border-slate-800 relative w-full max-w-full overflow-hidden font-opensans transition-colors duration-250">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Location & Transit Details */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-blue-900 dark:text-blue-400 mb-3 font-bold flex items-center gap-2">
                <Navigation className="w-3.5 h-3.5 text-red-600" />
                <span>GEOGRAPHIC ARTERY · NAZE, IMO STATE</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight font-display">
                Strategic Transit Location
              </h2>
              <p className="mt-4 text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                Directly positioned along the Aba-Owerri Expressway at Naze Junction, Master Energy serves as the essential gateway uniting Owerri municipal center with the regional trade corridors of Abia and Rivers State.
              </p>
            </div>

            {/* Address Card */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">PHYSICAL ADDRESS</div>
                  <div className="font-display font-bold text-slate-950 dark:text-white text-base mt-1">{NAZE_HUB_INFO.address}</div>
                  <div className="font-mono text-xs text-blue-900 dark:text-blue-400 mt-1 font-semibold">{NAZE_HUB_INFO.landmark}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-blue-900 dark:text-blue-400" />
                  <span>24/7 Monitored Forecourt</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-blue-900 dark:text-blue-400" />
                  <span>{NAZE_HUB_INFO.contactCenter}</span>
                </div>
              </div>
            </div>

            {/* Transit Distances */}
            <div className="space-y-3">
              <div className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                TRANSIT TIMELINES &amp; ACCESS POINTS
              </div>
              <div className="space-y-2.5">
                {NAZE_HUB_INFO.transitNotes.map((note, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-700 dark:text-slate-300 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Map & GPS Terminal */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#091224] border border-blue-900/50 flex flex-col justify-between p-8 shadow-xl">
              <div className="absolute inset-0 bg-radial from-blue-500/10 via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between font-mono text-xs">
                <span className="text-white bg-blue-900 font-bold px-3.5 py-1.5 rounded-lg shadow-md border border-blue-700">
                  GPS {NAZE_HUB_INFO.coordinates}
                </span>
                <span className="text-emerald-950 bg-emerald-400 font-bold px-3.5 py-1.5 rounded-lg shadow-md">
                  DISPENSING LIVE
                </span>
              </div>

              {/* Graphic Station Landmark Pin */}
              <div className="relative z-10 my-auto text-center p-8 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl border border-slate-200 dark:border-slate-800 max-w-sm mx-auto shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center mx-auto mb-4 shadow-md shadow-red-600/30">
                  <MapPin className="w-7 h-7" />
                </div>
                <div className="text-xl font-bold text-slate-950 dark:text-white font-display">Master Energy Ltd</div>
                <div className="font-mono text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">KM 3 Aba-Owerri Expressway, Naze</div>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <a
                    href="https://maps.google.com/?q=Naze,Owerri,Imo+State"
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all cursor-pointer inline-flex items-center gap-2 shadow-md shadow-red-600/25 hover:scale-105"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Open in Maps</span>
                  </a>
                </div>
              </div>

              <div className="relative z-10 flex items-center justify-between font-mono text-xs text-slate-300 font-medium">
                <span>OWERRI &larr; 8 KM</span>
                <span className="text-amber-300 font-bold">NAZE CORRIDOR</span>
                <span>&rarr; ABA 55 KM</span>
              </div>
            </div>

            {/* Emergency & Fleet Desk */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 font-mono text-xs shadow-xs">
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-4 h-4 text-blue-900 dark:text-blue-400 shrink-0" />
                <span className="text-slate-700 dark:text-slate-300 font-medium">Commercial fleet accounts &amp; bulk fuel dispatch:</span>
              </div>
              <a
                href={`tel:${NAZE_HUB_INFO.emergencyDesk.replace(/\s+/g, '')}`}
                className="text-red-600 dark:text-red-400 font-bold hover:underline shrink-0"
              >
                {NAZE_HUB_INFO.emergencyDesk}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
