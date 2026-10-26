import React from 'react';
import { NAZE_HUB_INFO } from '../data/hubData';
import { MapPin, Navigation, Phone, Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const LocationPage: React.FC = () => {
  return (
    <div className="py-10 sm:py-16 bg-[#04060a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="border-b border-white/10 pb-8 space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-amber-400 font-bold uppercase tracking-wider">
            <Navigation className="w-3.5 h-3.5" />
            <span>HOW TO REACH US · NAZE, IMO STATE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
            Location &amp; Directions
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-normal leading-relaxed">
            Master Energy is located right along the Aba-Owerri Expressway in Naze, easily accessible from Owerri municipal center and interstate highways.
          </p>
        </div>

        {/* 2-Column Directions Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 rounded-3xl bg-[#090d16] border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-mono text-xs text-slate-400 uppercase font-bold">Physical Address:</div>
                  <div className="font-bold text-white text-base mt-1">{NAZE_HUB_INFO.address}</div>
                  <div className="font-mono text-xs text-amber-400 mt-1">{NAZE_HUB_INFO.landmark}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Station: Open 24/7 Day &amp; Night</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>{NAZE_HUB_INFO.contactCenter}</span>
                </div>
              </div>
            </div>

            {/* Travel Times */}
            <div className="space-y-3">
              <div className="font-mono text-xs uppercase tracking-wider text-slate-400 font-bold">
                DRIVE TIMES FROM KEY POINTS
              </div>
              <div className="space-y-2.5">
                {NAZE_HUB_INFO.transitNotes.map((note, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-black/40 border border-white/5 font-mono text-xs text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Hotline */}
            <div className="p-5 rounded-2xl bg-[#090d16] border border-white/10 flex items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="text-slate-300">Emergency &amp; Towing Assistance:</span>
              </div>
              <a href={`tel:${NAZE_HUB_INFO.emergencyDesk}`} className="text-amber-400 font-bold hover:underline shrink-0">
                {NAZE_HUB_INFO.emergencyDesk}
              </a>
            </div>
          </div>

          {/* Map Graphic Container */}
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#04060a] border border-white/10 flex flex-col justify-between p-8 shadow-2xl">
            <div className="absolute inset-0 bg-grid-lux opacity-40 pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between font-mono text-xs">
              <span className="text-amber-400 bg-black/70 px-3 py-1.5 rounded-lg border border-white/10">
                GPS: {NAZE_HUB_INFO.coordinates}
              </span>
              <span className="text-emerald-400 bg-black/70 px-3 py-1.5 rounded-lg border border-white/10">
                Open 24 Hours
              </span>
            </div>

            <div className="relative z-10 my-auto text-center p-8 bg-[#090d16]/90 backdrop-blur-xl rounded-3xl border border-white/10 max-w-sm mx-auto shadow-2xl">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/30">
                <MapPin className="w-7 h-7" />
              </div>
              <div className="text-xl font-bold text-white font-display">Master Energy Ltd</div>
              <div className="font-mono text-xs text-slate-400 mt-1">KM 3 Aba-Owerri Expressway, Naze</div>
              <div className="mt-5 flex items-center justify-center">
                <a
                  href="https://maps.google.com/?q=Naze,Owerri,Imo+State"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all cursor-pointer inline-flex items-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between font-mono text-xs text-slate-400">
              <span>Owerri &larr; 8km</span>
              <span className="text-amber-400 font-bold">Naze Junction</span>
              <span>&rarr; Aba 55km</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
