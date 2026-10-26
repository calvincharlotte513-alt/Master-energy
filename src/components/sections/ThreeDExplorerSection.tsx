import React, { useState } from 'react';
import { MainStation3DTwin } from '../3d/MainStation3DTwin';
import { DepartmentId, PageId } from '../../types/hub';
import { DEPARTMENTS } from '../../data/hubData';
import {
  ArrowRight,
  Compass,
  Phone,
  Clock,
  Box,
  Users,
  Fuel,
  Sparkles,
  Info,
  CheckCircle2,
  ChevronRight
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
  // Default to webgl-model so the interactive 3D prompt is the core experience on the main website
  const [viewMode, setViewMode] = useState<'webgl-model' | 'living-photo'>('webgl-model');
  const [activeLivingScene, setActiveLivingScene] = useState<'forecourt' | 'garden'>('forecourt');
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);

  const currentDept = DEPARTMENTS[activeDept] || DEPARTMENTS['oil-gas'];

  // Hotspots for Forecourt Living 3D Twin
  const forecourtHotspots: Hotspot[] = [
    {
      id: 'hs-attendant',
      deptId: 'oil-gas',
      xPercent: 63,
      yPercent: 68,
      title: 'Trained Station Fuel Attendants',
      tag: 'HUMAN WORKFORCE · CERTIFIED SAFETY',
      description: 'Attendants in high-visibility Master Energy uniforms dispensing certified liters into customer SUVs and sedans without delays.',
      stat: '16 Nozzles · Zero Under-dispensing'
    },
    {
      id: 'hs-pump',
      deptId: 'oil-gas',
      xPercent: 42,
      yPercent: 58,
      title: 'Digital High-Speed Dispensers',
      tag: 'FORECOURT EQUIPMENT',
      description: 'DPR-calibrated digital volume meters with tamper-proof electronic seals showing real-time liters and amount.',
      stat: 'PMS ₦710/L · AGO ₦1,050/L'
    },
    {
      id: 'hs-totem',
      deptId: 'oil-gas',
      xPercent: 22,
      yPercent: 48,
      title: 'Roadside LED Totem Billboard',
      tag: 'PRICING TRANSPARENCY',
      description: 'High-visibility digital price LED beacon positioned along Aba-Owerri Expressway for incoming motorists.',
      stat: 'Live 24/7 Digital Rates'
    },
    {
      id: 'hs-kitchen',
      deptId: 'kitchen',
      xPercent: 18,
      yPercent: 55,
      title: 'Masters Kitchen Restaurant',
      tag: 'GROUND FLOOR CULINARY',
      description: 'Air-conditioned dining hall serving hot authentic Ofe Owerri, party jollof rice, and freshly fried fish.',
      stat: 'Breakfast, Lunch & Dinner'
    },
    {
      id: 'hs-lounge',
      deptId: 'lounge',
      xPercent: 24,
      yPercent: 42,
      title: 'Masters VIP Lounge & Terrace',
      tag: 'UPSTAIRS EXECUTIVE CLUB',
      description: 'Glass-wrapped luxury cocktail lounge with private booths, champagne service, and executive business pods.',
      stat: 'VIP Bottle Service'
    }
  ];

  // Hotspots for Garden Living 3D Twin
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
      title: 'Open-Air Garden Social Seating',
      tag: 'OUTDOOR HOSPITALITY',
      description: 'Wooden cabana tables under illuminated palm trees where friends gather for ice-cold drinks and relaxation.',
      stat: 'Chilled Chapman & Drinks'
    },
    {
      id: 'hs-match',
      deptId: 'garden',
      xPercent: 55,
      yPercent: 40,
      title: 'Outdoor Matchday Big Screen',
      tag: 'LIVE SPORTS BROADCAST',
      description: 'High-definition stadium screens broadcasting live Premier League and Champions League football games.',
      stat: 'Matchday Atmosphere'
    },
    {
      id: 'hs-rooftop',
      deptId: 'lounge',
      xPercent: 68,
      yPercent: 18,
      title: 'VIP Lounge Upper Terrace',
      tag: 'EXECUTIVE RETREAT',
      description: 'Elevated open-air rooftop deck overlooking the entire compound and Aba-Owerri Expressway.',
      stat: 'Panoramic Night View'
    }
  ];

  const currentHotspots = activeLivingScene === 'forecourt' ? forecourtHotspots : gardenHotspots;

  return (
    <section id="3d-tour" className="py-12 sm:py-16 lg:py-20 border-t border-slate-200 bg-white relative overflow-hidden font-opensans w-full max-w-full">
      <div className="absolute inset-0 bg-radial from-amber-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full min-w-0">
        {/* Section Header with Mode Toggles */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-amber-600 mb-2 font-bold">
              <Compass className="w-4 h-4 text-amber-500" />
              <span>3D FUELING STATION DIGITAL TWIN · NAZE MEGA HUB</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight font-poppins">
              Interactive 3D Digital Twin Forecourt
            </h2>
            <p className="text-sm text-slate-600 max-w-xl font-normal leading-relaxed mt-2">
              Rotate around the canopy, inspect the DPR digital pumps and roadside LED price totem, or explore our attendants and customer vehicles in real-time.
            </p>
          </div>

          {/* Native In-Website View Mode Switcher */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="p-1.5 bg-slate-100 border border-slate-200 rounded-2xl flex items-center gap-1.5 shadow-sm">
              <button
                type="button"
                onClick={() => setViewMode('webgl-model')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-inter font-bold transition-all cursor-pointer ${
                  viewMode === 'webgl-model'
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>3D WebGL Orbit Model</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('living-photo')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-inter font-bold transition-all cursor-pointer ${
                  viewMode === 'living-photo'
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Photoreal Attendants View</span>
              </button>
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/* VIEW 1: INTERACTIVE WEBGL 3D ORBIT MODEL (DEFAULT) */}
        {/* ==================================================== */}
        {viewMode === 'webgl-model' ? (
          <MainStation3DTwin
            activeDept={activeDept}
            onSelectDept={onSelectDept}
            onNavigatePage={onNavigatePage}
            onOpenDeptDetail={onOpenDeptDetail}
          />
        ) : (
          /* ==================================================== */
          /* VIEW 2: LIVING 3D PHOTOREAL SCENE (OPTIONAL TOGGLE) */
          /* ==================================================== */
          <div className="space-y-4">
            {/* Living Scene Switcher Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-wider text-slate-500 font-bold px-2">
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
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  <Fuel className="w-3.5 h-3.5 text-amber-600" />
                  <span>Scene 1: Forecourt &amp; Attendants at Work</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveLivingScene('garden');
                    setSelectedHotspot(null);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-inter font-bold transition-all cursor-pointer ${
                    activeLivingScene === 'garden'
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Scene 2: Masters Garden &amp; Lounge Terrace</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Tap pulsing pins to inspect</span>
              </div>
            </div>

            {/* Interactive Image Viewport with Hotspots */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900 aspect-[16/9] max-h-[640px] group">
              <img
                src={
                  activeLivingScene === 'forecourt'
                    ? '/images/station_3d_twin_living_1792960257471.jpg'
                    : '/images/garden_lounge_living_1792960273668.jpg'
                }
                onError={(e) => {
                  const current = e.currentTarget.getAttribute('src');
                  if (current?.startsWith('/images/')) {
                    e.currentTarget.src = current.replace('/images/', '/assets/images/');
                  }
                }}
                alt="Master Energy 3D Living Digital Twin"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover select-none transition-all duration-500"
              />

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
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        isSelected ? 'bg-emerald-400' : 'bg-amber-400'
                      }`} />
                      <span className={`relative inline-flex items-center justify-center rounded-full h-7 w-7 sm:h-8 sm:w-8 border-2 border-white shadow-xl text-slate-950 font-mono font-extrabold text-xs transition-transform group-hover/pin:scale-110 ${
                        isSelected ? 'bg-emerald-400 scale-110' : 'bg-amber-400'
                      }`}>
                        {index + 1}
                      </span>
                    </span>

                    {/* Tooltip on Hover */}
                    <div className="opacity-0 group-hover/pin:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none whitespace-nowrap bg-slate-950/95 backdrop-blur-md text-white text-[11px] font-mono font-bold px-3 py-1.5 rounded-lg border border-amber-400/50 shadow-2xl">
                      {hs.title}
                    </div>
                  </button>
                );
              })}

              {/* Floating Hotspot Dossier Card (When Clicked) */}
              {selectedHotspot && (
                <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-30 bg-white/95 backdrop-blur-xl border border-amber-400/60 rounded-2xl p-5 shadow-2xl text-left animate-in slide-in-from-bottom-2 duration-200">
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                      <Info className="w-3.5 h-3.5 shrink-0 text-amber-500" />
                      <span>{selectedHotspot.tag}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedHotspot(null)}
                      className="text-slate-500 hover:text-slate-900 text-xs font-mono cursor-pointer px-1.5 py-0.5 rounded bg-slate-100"
                    >
                      ✕ Close
                    </button>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-slate-950 font-poppins mt-2">
                    {selectedHotspot.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 font-opensans leading-relaxed mt-1">
                    {selectedHotspot.description}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div className="font-mono text-xs text-emerald-700 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{selectedHotspot.stat}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenDeptDetail(selectedHotspot.deptId)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-inter font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                    >
                      <span>Explore</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Scene Description Overlay Badge */}
              <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md border border-slate-200 px-3.5 py-2 rounded-xl text-left pointer-events-none shadow-md">
                <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-600">
                  MASTER ENERGY NAZE
                </div>
                <div className="text-xs font-poppins font-bold text-slate-900">
                  {activeLivingScene === 'forecourt'
                    ? 'Living Forecourt · Real Attendants & Customer Vehicles'
                    : 'Masters Garden & Lounge Terrace · Evening Dining & Suya'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Focus Dossier Strip */}
        <div className="mt-6 p-6 sm:p-8 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 min-w-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 border border-slate-200 bg-white shadow-md">
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
              <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
                <span className="font-bold text-amber-700 uppercase tracking-wider">{currentDept.badge}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {currentDept.hours}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-950 font-poppins truncate">{currentDept.name}</h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-opensans font-normal truncate">{currentDept.headline}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${currentDept.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-medium text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-amber-600" />
              <span>Call Desk</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenDeptDetail(activeDept)}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-inter font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md shadow-amber-500/20 cursor-pointer"
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
