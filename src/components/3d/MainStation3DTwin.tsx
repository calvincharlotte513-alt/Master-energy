import React, { useState } from 'react';
import { DepartmentId, PageId } from '../../types/hub';
import {
  ChevronDown,
  Sparkles,
  MapPin,
  Info,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Fuel,
  Coffee,
  UtensilsCrossed,
  ShoppingBag
} from 'lucide-react';

interface MainStation3DTwinProps {
  activeDept: DepartmentId;
  onSelectDept: (deptId: DepartmentId) => void;
  onNavigatePage: (page: PageId) => void;
  onOpenDeptDetail: (deptId: DepartmentId) => void;
  onScrollToContent?: () => void;
}

interface PhotorealHotspot {
  id: string;
  deptId: DepartmentId;
  xPercent: number;
  yPercent: number;
  title: string;
  tag: string;
  description: string;
  stat: string;
  icon: React.ElementType;
}

export const MainStation3DTwin: React.FC<MainStation3DTwinProps> = ({
  activeDept,
  onSelectDept,
  onNavigatePage,
  onOpenDeptDetail,
  onScrollToContent
}) => {
  const [selectedHotspot, setSelectedHotspot] = useState<PhotorealHotspot | null>(null);

  // Calibrated Hotspots for the Modern Photoreal Architectural Twin
  const hotspots: PhotorealHotspot[] = [
    {
      id: 'hs-canopy',
      deptId: 'oil-gas',
      xPercent: 32,
      yPercent: 32,
      title: 'Architectural Geometric LED Canopy',
      tag: 'FLAGSHIP ROOF · 16 NOZZLES',
      description: 'Ultra-modern high-clearance canopy with illuminated chevron fascia, vibrant ME crest, and signature diamond-grid recessed LED ceiling channels.',
      stat: '16 High-Flow DPR Dispensers',
      icon: Sparkles
    },
    {
      id: 'hs-pumps',
      deptId: 'oil-gas',
      xPercent: 42,
      yPercent: 74,
      title: 'Digital High-Speed Dispensers & Attendants',
      tag: 'CERTIFIED METERS · ZERO SHORT-CHANGE',
      description: 'Certified DPR digital volume meters with electronic tamper-proof seals dispensing PMS, AGO, and DPK into customer vehicles.',
      stat: 'PMS ₦710/L · AGO ₦1,050/L',
      icon: Fuel
    },
    {
      id: 'hs-cafe',
      deptId: 'kitchen',
      xPercent: 62,
      yPercent: 60,
      title: 'Masters Café & Espresso Bar',
      tag: 'GROUND FLOOR CULINARY',
      description: 'Artisan coffee, warm meat pies, pastries, fresh snacks, cold juices, and quick breakfast for motorists on the go.',
      stat: 'Open 6:00 AM – Midnight',
      icon: Coffee
    },
    {
      id: 'hs-restaurant',
      deptId: 'kitchen',
      xPercent: 72,
      yPercent: 60,
      title: 'Masters Bar & Restaurant',
      tag: 'AUTHENTIC DINE-IN HALL',
      description: 'Air-conditioned dining lounge serving hot authentic Ofe Owerri, party jollof rice, pepper soup, and chilled drinks.',
      stat: 'Lunch & Dinner Full Service',
      icon: UtensilsCrossed
    },
    {
      id: 'hs-store',
      deptId: 'oil-gas',
      xPercent: 84,
      yPercent: 60,
      title: '24/7 Mega Convenience Store & Mini-Mart',
      tag: 'RETAIL SUPERMARKET',
      description: 'Fully stocked forecourt supermarket with groceries, ice-cold beverages, automotive engine oils, and travel accessories.',
      stat: 'Open 24 Hours Daily',
      icon: ShoppingBag
    },
    {
      id: 'hs-totem',
      deptId: 'oil-gas',
      xPercent: 3,
      yPercent: 55,
      title: 'Roadside LED Price Totem Billboard',
      tag: 'HIGHWAY BEACON · TRANSPARENCY',
      description: 'High-visibility digital LED rate totem along Aba-Owerri Expressway for incoming highway motorists.',
      stat: '24/7 Calibrated Live Rates',
      icon: Fuel
    }
  ];

  const handleSelectHotspot = (hs: PhotorealHotspot) => {
    setSelectedHotspot(hs);
    onSelectDept(hs.deptId);
  };

  return (
    <div className="relative w-full max-w-full overflow-hidden h-[74vh] sm:h-[82vh] min-h-[520px] max-h-[780px] bg-slate-950 select-none transition-all duration-300">
      {/* FULL-SCREEN PHOTOREAL ARCHITECTURAL TWIN */}
      <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
        <img
          src="/images/modern_master_energy_reference.png"
          alt="Master Energy Ltd Modern Mega Station Architecture"
          onError={(e) => {
            const current = e.currentTarget.getAttribute('src');
            if (current?.startsWith('/images/')) {
              e.currentTarget.src = current.replace('/images/', '/assets/images/');
            }
          }}
          className="w-full h-full object-cover object-center select-none filter contrast-[1.03]"
        />

        {/* Ambient Top & Bottom Depth Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35 pointer-events-none" />

        {/* Pulsing Interactive Hotspot Pins */}
        {hotspots.map((hs, index) => {
          const isSelected = selectedHotspot?.id === hs.id;
          return (
            <button
              key={hs.id}
              type="button"
              style={{ left: `${hs.xPercent}%`, top: `${hs.yPercent}%` }}
              onClick={() => handleSelectHotspot(hs)}
              className="absolute -translate-x-1/2 -translate-y-1/2 group/pin z-20 cursor-pointer focus:outline-none"
              aria-label={hs.title}
            >
              <span className="relative flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    isSelected ? 'bg-cyan-400' : 'bg-red-500'
                  }`}
                />
                <span
                  className={`relative inline-flex items-center justify-center rounded-full h-7 w-7 sm:h-8 sm:w-8 border-2 border-white shadow-2xl text-white font-mono font-extrabold text-xs transition-transform group-hover/pin:scale-115 ${
                    isSelected ? 'bg-cyan-500 scale-110 shadow-cyan-500/60 ring-2 ring-cyan-300' : 'bg-red-600 shadow-red-600/60'
                  }`}
                >
                  {index + 1}
                </span>
              </span>

              {/* Hover Micro-Badge */}
              <div className="opacity-0 group-hover/pin:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none whitespace-nowrap bg-slate-950/95 backdrop-blur-md text-white text-[11px] font-mono font-bold px-3 py-1.5 rounded-lg border border-cyan-400/50 shadow-2xl">
                {hs.title}
              </div>
            </button>
          );
        })}

        {/* Detailed Dossier Card Modal (When Pin Clicked) */}
        {selectedHotspot && (
          <div className="absolute bottom-20 sm:bottom-24 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-30 bg-[#0a1226]/95 backdrop-blur-xl border border-cyan-500/40 rounded-2xl p-5 shadow-2xl text-left animate-in slide-in-from-bottom-2 duration-200 text-white">
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-blue-900/40">
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                <Info className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
                <span>{selectedHotspot.tag}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedHotspot(null)}
                className="text-slate-400 hover:text-white text-xs font-mono cursor-pointer px-2 py-0.5 rounded bg-slate-800 transition-colors"
              >
                ✕ Close
              </button>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-white font-poppins mt-2">
              {selectedHotspot.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-opensans leading-relaxed mt-1">
              {selectedHotspot.description}
            </p>

            <div className="mt-3 pt-3 border-t border-blue-900/40 flex items-center justify-between gap-3">
              <div className="font-mono text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{selectedHotspot.stat}</span>
              </div>
              <button
                type="button"
                onClick={() => onOpenDeptDetail(selectedHotspot.deptId)}
                className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-inter font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-red-600/30"
              >
                <span>Explore</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* TOP STATUS BAR */}
      <div className="absolute top-4 left-4 sm:top-5 sm:left-6 right-4 sm:right-6 z-20 pointer-events-none flex flex-wrap items-center justify-between gap-3 max-w-[calc(100vw-2rem)]">
        {/* Status Badge */}
        <div className="flex items-center gap-2 bg-[#090d16]/90 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] sm:text-[11px] font-roboto font-bold tracking-wider text-white uppercase">
            FLAGSHIP PHOTOREAL DIGITAL TWIN · NAZE MEGA FORECOURT
          </span>
        </div>

        {/* Live Certification Tag */}
        <div className="hidden sm:flex items-center gap-1.5 bg-[#090d16]/90 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-[11px] font-mono text-emerald-400 font-semibold shadow-md">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>DPR Certified 24/7 Facility</span>
        </div>
      </div>

      {/* BOTTOM FLOATING SECTOR DOCK */}
      <div className="absolute bottom-5 left-0 right-0 z-30 pointer-events-none flex flex-col items-center gap-2.5 px-3 w-full max-w-full">
        {/* Quick Sector Filter Chips */}
        <div className="pointer-events-auto flex items-center gap-1 p-1 bg-[#090d16]/90 backdrop-blur-xl border border-white/15 rounded-full shadow-xl max-w-[calc(100vw-2rem)] overflow-x-auto no-scrollbar">
          {hotspots.map((hs) => {
            const isSelected = selectedHotspot?.id === hs.id;
            return (
              <button
                key={hs.id}
                type="button"
                onClick={() => handleSelectHotspot(hs)}
                className={`px-3 py-1 text-xs font-inter font-semibold rounded-full transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-red-600 text-white font-bold shadow-md shadow-red-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{hs.title.split(' ')[0]} {hs.title.split(' ')[1] || ''}</span>
              </button>
            );
          })}
        </div>

        {/* Prominent Scroll Down Button */}
        <button
          type="button"
          onClick={() => {
            if (onScrollToContent) {
              onScrollToContent();
            } else {
              const el = document.getElementById('station-hero') || document.getElementById('station-details');
              el?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="pointer-events-auto flex items-center justify-center gap-2 px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs font-inter font-bold transition-all shadow-lg shadow-red-600/30 hover:scale-105 cursor-pointer active:scale-95 border border-red-500 max-w-[calc(100vw-2rem)]"
        >
          <span className="truncate">Scroll down for station details &amp; live prices</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-white shrink-0" />
        </button>
      </div>
    </div>
  );
};
