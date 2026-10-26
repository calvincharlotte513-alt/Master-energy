import React from 'react';
import { motion } from 'motion/react';
import { NAZE_HUB_INFO } from '../data/hubData';
import { MapPin, Navigation, Phone, Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const LocationPage: React.FC = () => {
  return (
    <div className="py-10 sm:py-16 bg-white w-full max-w-full overflow-hidden font-opensans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="border-b border-slate-200 pb-8 space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-amber-600 font-bold uppercase tracking-wider">
            <Navigation className="w-3.5 h-3.5 text-amber-500" />
            <span>HOW TO REACH US · NAZE, IMO STATE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 font-display">
            Location &amp; Directions
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl font-normal leading-relaxed">
            Master Energy is located right along the Aba-Owerri Expressway in Naze, easily accessible from Owerri municipal center and interstate highways.
          </p>
        </div>

        {/* 2-Column Directions Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start overflow-hidden">
          <div className="lg:col-span-6 space-y-6">
            {/* Address Card - Luxury Black Box */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="p-8 rounded-3xl bg-slate-950 text-white border-2 border-amber-400/40 space-y-4 shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-mono text-xs text-amber-400 uppercase font-bold tracking-wider">Physical Address:</div>
                  <div className="font-bold text-white text-lg mt-1 font-display">{NAZE_HUB_INFO.address}</div>
                  <div className="font-mono text-xs text-slate-300 mt-1 font-semibold">{NAZE_HUB_INFO.landmark}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Station: Open 24/7 Day &amp; Night</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>{NAZE_HUB_INFO.contactCenter}</span>
                </div>
              </div>
            </motion.div>

            {/* Travel Times - Alternating Black & Yellow Sliding Boxes */}
            <div className="space-y-3">
              <div className="font-mono text-xs uppercase tracking-wider text-slate-500 font-bold">
                DRIVE TIMES FROM KEY POINTS
              </div>
              <div className="space-y-2.5">
                {NAZE_HUB_INFO.transitNotes.map((note, idx) => {
                  const isYellowBox = idx % 2 === 1;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: idx * 0.04 }}
                      style={{ willChange: 'transform, opacity' }}
                      className={`flex items-center gap-3 p-4 rounded-2xl font-mono text-xs font-semibold transition-all shadow-md ${
                        isYellowBox
                          ? 'bg-amber-400 text-slate-950 border-2 border-amber-500 shadow-amber-400/10'
                          : 'bg-slate-950 text-white border-2 border-amber-400/30'
                      }`}
                    >
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ${isYellowBox ? 'text-slate-950 stroke-[2.5]' : 'text-amber-400'}`} />
                      <span>{note}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Emergency Hotline - High Impact Yellow Box */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              style={{ willChange: 'transform, opacity' }}
              className="p-5 rounded-2xl bg-amber-400 text-slate-950 border-2 border-amber-500 flex items-center justify-between gap-4 font-mono text-xs shadow-xl"
            >
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-5 h-5 text-slate-950 shrink-0" />
                <span className="text-slate-950 font-bold">Emergency &amp; Towing Assistance:</span>
              </div>
              <a href={`tel:${NAZE_HUB_INFO.emergencyDesk}`} className="text-slate-950 font-extrabold bg-white/90 hover:bg-white px-3 py-1.5 rounded-lg transition-colors shrink-0 shadow-xs">
                {NAZE_HUB_INFO.emergencyDesk}
              </a>
            </motion.div>
          </div>

          {/* Map Graphic Container - Luxury Black Slate Box */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: 'transform, opacity' }}
            className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-950 border-2 border-amber-400/40 flex flex-col justify-between p-8 shadow-2xl"
          >
            <div className="absolute inset-0 bg-radial from-amber-400/15 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-950 bg-amber-400 font-bold px-3 py-1.5 rounded-lg shadow-md">
                GPS: {NAZE_HUB_INFO.coordinates}
              </span>
              <span className="text-slate-950 bg-emerald-400 font-bold px-3 py-1.5 rounded-lg shadow-md">
                Open 24 Hours
              </span>
            </div>

            <div className="relative z-10 my-auto text-center p-8 bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-amber-400/30 max-w-sm mx-auto shadow-2xl text-white">
              <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/30">
                <MapPin className="w-7 h-7 stroke-[2.5]" />
              </div>
              <div className="text-xl font-bold text-white font-display">Master Energy Ltd</div>
              <div className="font-mono text-xs text-amber-400 mt-1 font-medium">KM 3 Aba-Owerri Expressway, Naze</div>
              <div className="mt-5 flex items-center justify-center">
                <a
                  href="https://maps.google.com/?q=Naze,Owerri,Imo+State"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all cursor-pointer inline-flex items-center gap-2 shadow-md shadow-amber-500/20 active:scale-[0.98]"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between font-mono text-xs text-slate-400 font-medium border-t border-slate-800/80 pt-3">
              <span>Owerri &larr; 8km</span>
              <span className="text-amber-400 font-bold">Naze Junction</span>
              <span>&rarr; Aba 55km</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
