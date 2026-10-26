import React from 'react';
import { NAZE_HUB_INFO } from '../../data/hubData';
import { MapPin, Navigation, Phone, Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const LocationGuideSection: React.FC = () => {
  return (
    <section id="location" className="py-16 lg:py-24 bg-white border-t border-slate-200 relative w-full max-w-full overflow-hidden font-opensans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Location & Transit Details */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-amber-600 mb-3 font-bold flex items-center gap-2">
                <Navigation className="w-3.5 h-3.5 text-amber-500" />
                <span>GEOGRAPHIC ARTERY · NAZE, IMO STATE</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight font-display">
                Strategic Transit Location
              </h2>
              <p className="mt-4 text-base text-slate-600 font-normal leading-relaxed">
                Directly positioned along the Aba-Owerri Expressway at Naze Junction, Master Energy serves as the essential gateway uniting Owerri municipal center with the regional trade corridors of Abia and Rivers State.
              </p>
            </div>

            {/* Address Card */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 text-amber-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500 font-bold">PHYSICAL ADDRESS</div>
                  <div className="font-display font-bold text-slate-950 text-base mt-1">{NAZE_HUB_INFO.address}</div>
                  <div className="font-mono text-xs text-amber-700 mt-1 font-semibold">{NAZE_HUB_INFO.landmark}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>24/7 Monitored Forecourt</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-600" />
                  <span>{NAZE_HUB_INFO.contactCenter}</span>
                </div>
              </div>
            </div>

            {/* Transit Distances */}
            <div className="space-y-3">
              <div className="font-mono text-xs uppercase tracking-wider text-slate-500 font-bold">
                TRANSIT TIMELINES &amp; ACCESS POINTS
              </div>
              <div className="space-y-2.5">
                {NAZE_HUB_INFO.transitNotes.map((note, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-700 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Map & GPS Terminal */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 flex flex-col justify-between p-8 shadow-xl">
              <div className="absolute inset-0 bg-radial from-amber-400/10 via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between font-mono text-xs">
                <span className="text-slate-950 bg-amber-400 font-bold px-3.5 py-1.5 rounded-lg shadow-md">
                  GPS {NAZE_HUB_INFO.coordinates}
                </span>
                <span className="text-emerald-950 bg-emerald-300 font-bold px-3.5 py-1.5 rounded-lg shadow-md">
                  DISPENSING LIVE
                </span>
              </div>

              {/* Graphic Station Landmark Pin */}
              <div className="relative z-10 my-auto text-center p-8 bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200 max-w-sm mx-auto shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mx-auto mb-4 shadow-md shadow-amber-500/30">
                  <MapPin className="w-7 h-7" />
                </div>
                <div className="text-xl font-bold text-slate-950 font-display">Master Energy Ltd</div>
                <div className="font-mono text-xs text-slate-600 mt-1 font-medium">KM 3 Aba-Owerri Expressway, Naze</div>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <a
                    href="https://maps.google.com/?q=Naze,Owerri,Imo+State"
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all cursor-pointer inline-flex items-center gap-2 shadow-md shadow-amber-500/20"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Open in Maps</span>
                  </a>
                </div>
              </div>

              <div className="relative z-10 flex items-center justify-between font-mono text-xs text-slate-300 font-medium">
                <span>OWERRI &larr; 8 KM</span>
                <span className="text-amber-400 font-bold">NAZE CORRIDOR</span>
                <span>&rarr; ABA 55 KM</span>
              </div>
            </div>

            {/* Emergency & Fleet Desk */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4 font-mono text-xs shadow-sm">
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-slate-700 font-medium">Commercial fleet accounts &amp; bulk fuel dispatch:</span>
              </div>
              <a
                href={`tel:${NAZE_HUB_INFO.emergencyDesk.replace(/\s+/g, '')}`}
                className="text-amber-700 font-bold hover:underline shrink-0"
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
