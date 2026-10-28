import React, { useState } from 'react';
import { DepartmentId, PageId } from '../../types/hub';
import { DEPARTMENTS } from '../../data/hubData';
import {
  ArrowRight,
  Compass,
  Phone,
  Clock,
  Sparkles,
  Info,
  CheckCircle2,
  ChevronRight,
  Fuel
} from 'lucide-react';

interface ThreeDExplorerSectionProps {
  activeDept: DepartmentId;
  onSelectDept: (deptId: DepartmentId) => void;
  onOpenDeptDetail: (deptId: DepartmentId) => void;
  onNavigatePage: (page: PageId) => void;
}

interface Hotspot {
  id: string;
  deptId: DepartmentId;
  xPercent: number;
  yPercent: number;
  title: string;
  tag: string;
  description: string;
  stat: string;
}

export const ThreeDExplorerSection: React.FC<ThreeDExplorerSectionProps> = ({
  activeDept,
  onSelectDept,
  onOpenDeptDetail,
  onNavigatePage
}) => {
  const [activeLivingScene, setActiveLivingScene] = useState<'forecourt' | 'garden'>('forecourt');
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);

  const currentDept = DEPARTMENTS[activeDept] || DEPARTMENTS['oil-gas'];

  // Hotspots for Forecourt Photoreal Twin (Calibrated to Modern Architectural Station)
  const forecourtHotspots: Hotspot[] = [
    {
      id: 'hs-canopy',
      deptId: 'oil-gas',
      xPercent: 32,
      yPercent: 32,
      title: 'Architectural Geometric LED Canopy',
      tag: 'FLAGSHIP ROOF · 16 NOZZLES',
      description: 'Ultra-modern high-clearance canopy with illuminated chevron fascia and signature diamond-grid recessed LED ceiling channels.',
      stat: '16 High-Flow DPR Dispensers'
    },
    {
      id: 'hs-pump',
      deptId: 'oil-gas',
      xPercent: 42,
      yPercent: 74,
      title: 'Digital High-Speed Dispensers & Attendants',
      tag: 'FORECOURT EQUIPMENT · ZERO SHORT-CHANGE',
      description: 'DPR-calibrated digital volume meters with tamper-proof electronic seals showing real-time liters and amount.',
      stat: 'PMS ₦710/L · AGO ₦1,050/L'
    },
    {
      id: 'hs-totem',
      deptId: 'oil-gas',
      xPercent: 3,
      yPercent: 55,
      title: 'Roadside LED Price Totem Billboard',
      tag: 'PRICING TRANSPARENCY',
      description: 'High-visibility digital price LED beacon positioned along Aba-Owerri Expressway for incoming motorists.',
      stat: 'Live 24/7 Digital Rates'
    },
    {
      id: 'hs-cafe',
      deptId: 'kitchen',
      xPercent: 62,
      yPercent: 60,
      title: 'Masters Café & Espresso Bar',
      tag: 'GROUND FLOOR CULINARY',
      description: 'Artisan coffee, meat pies, fresh snacks, cold juices, and quick breakfast for motorists on the go.',
      stat: 'Open 6:00 AM – Midnight'
    },
    {
      id: 'hs-kitchen',
      deptId: 'kitchen',
      xPercent: 72,
      yPercent: 60,
      title: 'Masters Bar & Restaurant',
      tag: 'AUTHENTIC DINE-IN HALL',
      description: 'Air-conditioned dining hall serving hot authentic Ofe Owerri, party jollof rice, and freshly fried fish.',
      stat: 'Breakfast, Lunch & Dinner'
    },
    {
      id: 'hs-store',
      deptId: 'oil-gas',
      xPercent: 84,
      yPercent: 60,
      title: '24/7 Mega Convenience Store',
      tag: 'RETAIL SUPERMARKET',
      description: 'Fully stocked forecourt supermarket with groceries, ice-cold beverages, automotive fluids, and travel accessories.',
      stat: 'Open 24 Hours Daily'
    }
  ];

  // Hotspots for Garden Photoreal Twin
  const gardenHotspots: Hotspot[] = [
    {
      id: 'hs-suya',
      deptId: 'garden',
      xPercent: 84,
      yPercent: 64,
      title: 'Live Charcoal Suya & Asun Master',
      tag: 'AUTHENTIC STREET CUISINE',
      description: 'Master grill chef searing spiced beef suya, roasted chicken, and peppered goat meat on glowing coals.',
      stat: 'Fresh Hot Off The Grill'
    },
    {
      id: 'hs-patrons',
      deptId: 'garden',
      xPercent: 46,
      yPercent: 68,
      title: 'Open-Air Lawn & Big Screen Sports',
      tag: 'COMMUNITY & ENTERTAINMENT',
      description: 'Family tables and sports fans gathering under ambient evening festoon lighting for live Premier League matches.',
      stat: 'Matchday Screening 4K'
    },
    {
      id: 'hs-carwash',
      deptId: 'carwash',
      xPercent: 12,
      yPercent: 52,
      title: 'Automated Car Wash & Valet Bay',
      tag: 'HIGH-PRESSURE VEHICLE CARE',
      description: 'Dedicated high-clearance wash bays for full undercarriage spray, snow foam rinse, and interior leather detailing.',
      stat: '15-Min Express Wash'
    }
  ];

  const currentHotspots = activeLivingScene === 'forecourt' ? forecourtHotspots : gardenHotspots;

  return (
    <section id="photoreal-tour" className="py-12 sm:py-16 lg:py-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#080d1a] relative overflow-hidden font-opensans w-full max-w-full transition-colors duration-300">
      <div className="absolute inset-0 bg-radial from-blue-600/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full min-w-0">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-red-600 dark:text-red-400 mb-2 font-bold">
              <Compass className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span>PHOTOREAL ARCHITECTURAL TWIN · NAZE MEGA HUB</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight font-poppins">
              Interactive Flagship Forecourt &amp; Campus
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl font-normal leading-relaxed mt-2">
              Explore the architectural canopy, inspect the DPR digital pumps, roadside LED price totem, and adjacent commercial complex in real-time.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-3.5 py-2 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Interactive Spatial Hotspots Active</span>
          </div>
        </div>

        {/* Photoreal Interactive Twin Viewport */}
        <div className="space-y-4">
          {/* Living Scene Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold px-2">
                SCENE:
              </span>
              <button
                type="button"
                onClick={() => {
                  setActiveLivingScene('forecourt');
                  setSelectedHotspot(null);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-inter font-bold transition-all cursor-pointer ${
                  activeLivingScene === 'forecourt'
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700'
                }`}
              >
                <Fuel className="w-3.5 h-3.5" />
                <span>Scene 1: Modern Forecourt &amp; Commercial Complex</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveLivingScene('garden');
                  setSelectedHotspot(null);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-inter font-bold transition-all cursor-pointer ${
                  activeLivingScene === 'garden'
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Scene 2: Masters Garden &amp; Lounge Terrace</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span>Tap pulsing numbers to inspect</span>
            </div>
          </div>

          {/* Interactive Image Viewport with Hotspots */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-900 aspect-[16/9] max-h-[640px] group">
            {activeLivingScene === 'forecourt' ? (
              <video
                src="https://res.cloudinary.com/frl7thhq/video/upload/v1793193825/lv_0_20261028141854.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover select-none"
              />
            ) : (
              <img
                src="/images/garden_lounge_living_1792960273668.jpg"
                onError={(e) => {
                  const current = e.currentTarget.getAttribute('src');
                  if (current?.startsWith('/images/')) {
                    e.currentTarget.src = current.replace('/images/', '/assets/images/');
                  }
                }}
                alt="Master Energy Garden & Lounge"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover select-none transition-all duration-500 filter contrast-[1.03]"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

            {/* Pulsing Hotspot Pins */}
            {currentHotspots.map((hs, index) => {
              const isSelected = selectedHotspot?.id === hs.id;
              return (
                <button
                  key={hs.id}
                  type="button"
                  style={{ left: `${hs.xPercent}%`, top: `${hs.yPercent}%` }}
                  onClick={() => {
                    setSelectedHotspot(hs);
                    onSelectDept(hs.deptId);
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group/pin z-20 cursor-pointer focus:outline-none"
                  aria-label={hs.title}
                >
                  <span className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        isSelected ? 'bg-cyan-400' : 'bg-red-500'
                      }`}
                    />
                    <span
                      className={`relative inline-flex items-center justify-center rounded-full h-7 w-7 sm:h-8 sm:w-8 border-2 border-white shadow-xl text-white font-mono font-extrabold text-xs transition-transform group-hover/pin:scale-110 ${
                        isSelected ? 'bg-cyan-500 scale-110 shadow-cyan-500/50' : 'bg-red-600 shadow-red-600/50'
                      }`}
                    >
                      {index + 1}
                    </span>
                  </span>

                  {/* Tooltip on Hover */}
                  <div className="opacity-0 group-hover/pin:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none whitespace-nowrap bg-slate-950/95 backdrop-blur-md text-white text-[11px] font-mono font-bold px-3 py-1.5 rounded-lg border border-cyan-400/50 shadow-2xl">
                    {hs.title}
                  </div>
                </button>
              );
            })}

            {/* Floating Hotspot Dossier Card (When Clicked) */}
            {selectedHotspot && (
              <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-30 bg-white/95 dark:bg-[#0f1d3d]/95 backdrop-blur-xl border border-cyan-500/40 rounded-2xl p-5 shadow-2xl text-left animate-in slide-in-from-bottom-2 duration-200">
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-blue-900/40">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                    <Info className="w-3.5 h-3.5 shrink-0 text-cyan-500" />
                    <span>{selectedHotspot.tag}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedHotspot(null)}
                    className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-xs font-mono cursor-pointer px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800"
                  >
                    ✕ Close
                  </button>
                </div>

                <h4 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white font-poppins mt-2">
                  {selectedHotspot.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-opensans leading-relaxed mt-1">
                  {selectedHotspot.description}
                </p>

                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-blue-900/40 flex items-center justify-between gap-3">
                  <div className="font-mono text-xs text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>{selectedHotspot.stat}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenDeptDetail(selectedHotspot.deptId)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-inter font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-red-600/25"
                  >
                    <span>Explore</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Scene Description Overlay Badge */}
            <div className="absolute top-4 left-4 z-10 bg-white/90 dark:bg-[#0a1226]/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl text-left pointer-events-none shadow-md">
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-600 dark:text-red-400">
                MASTER ENERGY NAZE
              </div>
              <div className="text-xs font-poppins font-bold text-slate-900 dark:text-white">
                {activeLivingScene === 'forecourt'
                  ? 'Modern Forecourt & Lifestyle Complex · Photoreal Twin'
                  : 'Masters Garden & Lounge Terrace · Evening Dining & Suya'}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Focus Dossier Strip */}
        <div className="mt-6 p-6 sm:p-8 bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 min-w-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-md">
              <img
                src={currentDept.image}
                alt={currentDept.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const current = e.currentTarget.getAttribute('src');
                  if (current?.startsWith('/images/')) {
                    e.currentTarget.src = current.replace('/images/', '/assets/images/');
                  }
                }}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-2 font-mono text-xs text-slate-500 dark:text-slate-400">
                <span className="font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">{currentDept.badge}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {currentDept.hours}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white font-poppins truncate">{currentDept.name}</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl font-opensans font-normal truncate">{currentDept.headline}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${currentDept.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-medium text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
              <span>Call Desk</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenDeptDetail(activeDept)}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-inter font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all shadow-md shadow-red-600/20 cursor-pointer"
            >
              <span>Explore Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
