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
  ShoppingBag,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Wine,
  Car,
  Trees,
  Store,
  ExternalLink
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
  serviceNumber: number;
  deptId?: DepartmentId;
  pageId: PageId;
  xPercent: number;
  yPercent: number;
  title: string;
  shortLabel: string;
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

  // The 6 Real Operating Services of Master Energy Mega Station Naze
  const hotspots: PhotorealHotspot[] = [
    {
      id: 'service-fuel',
      serviceNumber: 1,
      deptId: 'oil-gas',
      pageId: 'oil-gas',
      xPercent: 26,
      yPercent: 44,
      title: 'Oil & Gas Fuel Forecourt & Gas Plant',
      shortLabel: '1. Fuel & Gas Plant',
      tag: 'SERVICE 1 · 16 CALIBRATED DIGITAL PUMPS',
      description: '16 digital DPR-calibrated pumps with zero under-dispensing for PMS (Petrol), AGO (Diesel), DPK (Kerosene), plus certified digital scales for LPG cooking gas refill.',
      stat: 'PMS ₦710/L · AGO ₦1,050/L · 24/7',
      icon: Fuel
    },
    {
      id: 'service-kitchen',
      serviceNumber: 2,
      deptId: 'kitchen',
      pageId: 'kitchen',
      xPercent: 48,
      yPercent: 52,
      title: 'Masters Kitchen Restaurant',
      shortLabel: '2. Masters Kitchen',
      tag: 'SERVICE 2 · HOT NIGERIAN FOOD & GRILLS',
      description: 'Air-conditioned dining hall serving freshly prepared authentic Ofe Owerri, smokey firewood party jollof rice, live point-and-kill catfish, and swift highway takeaway boxes.',
      stat: 'Open 6:00 AM – 11:30 PM Daily',
      icon: UtensilsCrossed
    },
    {
      id: 'service-lounge',
      serviceNumber: 3,
      deptId: 'lounge',
      pageId: 'lounge',
      xPercent: 66,
      yPercent: 34,
      title: 'Masters VIP Lounge',
      shortLabel: '3. VIP Lounge',
      tag: 'SERVICE 3 · EXECUTIVE COCKTAILS & BOOTHS',
      description: 'Luxury upstairs VIP lounge with private soundproof velvet booths, original cognacs, chilled champagnes, curated small chops, and discreet VIP security.',
      stat: '4:00 PM – 4:00 AM Nightly',
      icon: Wine
    },
    {
      id: 'service-carwash',
      serviceNumber: 4,
      deptId: 'carwash',
      pageId: 'carwash',
      xPercent: 82,
      yPercent: 50,
      title: 'Masters Car Wash & Detailing Bay',
      shortLabel: '4. Car Wash Bay',
      tag: 'SERVICE 4 · SNOW FOAM & CHASSIS BLASTER',
      description: '6-bay auto detailing center with paint-friendly snow foam, high-pressure underbody mud wash, engine steam wash, and air-conditioned customer waiting room with free Wi-Fi.',
      stat: '6 Active Bays · 15 Min Wash',
      icon: Car
    },
    {
      id: 'service-garden',
      serviceNumber: 5,
      deptId: 'garden',
      pageId: 'garden',
      xPercent: 78,
      yPercent: 72,
      title: 'Masters Bar & Open-Air Garden',
      shortLabel: '5. Bar & Garden',
      tag: 'SERVICE 5 · SUYA, COLD BEER & MATCHDAY',
      description: 'Open-air green terrace with sizzling charcoal-grilled beef suya, spicy goat meat asun, iced beers, and 4 HD big screens for live Premier League and Champions League matches.',
      stat: '250 Seats · 4 HD Live Match Screens',
      icon: Trees
    },
    {
      id: 'service-promenade',
      serviceNumber: 6,
      pageId: 'promenade',
      xPercent: 14,
      yPercent: 68,
      title: 'Commercial Promenade & Supermarket',
      shortLabel: '6. Shops & Mini-Mart',
      tag: 'SERVICE 6 · 24/7 SUPERMARKET & PHARMACY',
      description: 'Highway traveler shopping arcade featuring a 24/7 supermarket, registered pharmacy, multi-bank ATM gallery, pastry bakery, and logistics service desk.',
      stat: '24/7 Convenience · 8 Retail Suites',
      icon: Store
    }
  ];

  const handleSelectHotspot = (hs: PhotorealHotspot) => {
    setSelectedHotspot(hs);
    if (hs.deptId) {
      onSelectDept(hs.deptId);
    }
  };

  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Guarantee mobile autoPlay without relying on poster image
  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      if (!nextMuted && videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="relative w-full max-w-full overflow-hidden h-[74vh] sm:h-[82vh] min-h-[520px] max-h-[780px] bg-slate-950 select-none transition-all duration-300">
      {/* FULL-SCREEN VIDEO BACKGROUND (NO STATIC POSTER IMAGE) */}
      <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-black">
        <video
          ref={videoRef}
          src="https://res.cloudinary.com/frl7thhq/video/upload/v1793102146/b_Use_a_black_chef.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center select-none"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Ambient Top & Bottom Depth Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 pointer-events-none" />

        {/* Pulsing Interactive Hotspot Pins - REAL SERVICES 1, 2, 3, 4, 5, 6 */}
        {hotspots.map((hs) => {
          const isSelected = selectedHotspot?.id === hs.id;
          const ServiceIcon = hs.icon;
          return (
            <button
              key={hs.id}
              type="button"
              style={{ left: `${hs.xPercent}%`, top: `${hs.yPercent}%` }}
              onClick={() => handleSelectHotspot(hs)}
              className="absolute -translate-x-1/2 -translate-y-1/2 group/pin z-20 cursor-pointer focus:outline-none"
              aria-label={hs.title}
            >
              <span className="relative flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    isSelected ? 'bg-cyan-400' : 'bg-orange-500'
                  }`}
                />
                <span
                  className={`relative inline-flex items-center justify-center rounded-full h-8 w-8 sm:h-9 sm:w-9 border-2 border-white shadow-2xl text-white font-mono font-black text-xs sm:text-sm transition-transform group-hover/pin:scale-115 ${
                    isSelected
                      ? 'bg-cyan-500 scale-110 shadow-cyan-500/60 ring-2 ring-cyan-300'
                      : 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/60'
                  }`}
                >
                  {hs.serviceNumber}
                </span>
              </span>

              {/* Hover Micro-Badge with Real Service Name */}
              <div className="opacity-0 group-hover/pin:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none whitespace-nowrap bg-slate-950/95 backdrop-blur-md text-white text-[11px] font-mono font-bold px-3 py-1.5 rounded-lg border border-orange-500/50 shadow-2xl flex items-center gap-2 z-30">
                <ServiceIcon className="w-3.5 h-3.5 text-orange-400" />
                <span>{hs.title}</span>
              </div>
            </button>
          );
        })}

        {/* Detailed Real Service Dossier Card Modal */}
        {selectedHotspot && (
          <div className="absolute bottom-20 sm:bottom-24 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-30 bg-[#090d16]/95 backdrop-blur-xl border border-orange-500/40 rounded-2xl p-5 shadow-2xl text-left animate-in slide-in-from-bottom-2 duration-200 text-white">
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-white/10">
              <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-orange-400 uppercase tracking-wider">
                <span className="w-5 h-5 rounded-full bg-orange-500 text-slate-950 flex items-center justify-center text-[10px] font-black">
                  {selectedHotspot.serviceNumber}
                </span>
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

            <div className="flex items-center gap-2.5 mt-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-500/15 border border-orange-500/30 text-orange-400 flex items-center justify-center shrink-0">
                <selectedHotspot.icon className="w-4 h-4" />
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white font-poppins">
                {selectedHotspot.title}
              </h4>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-opensans leading-relaxed mt-2">
              {selectedHotspot.description}
            </p>

            <div className="mt-3.5 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="font-mono text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{selectedHotspot.stat}</span>
              </div>
              <div className="flex items-center gap-2">
                {selectedHotspot.deptId && (
                  <button
                    type="button"
                    onClick={() => onOpenDeptDetail(selectedHotspot.deptId!)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-inter font-bold text-xs transition-all cursor-pointer border border-white/15"
                  >
                    <span>Quick Order</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onNavigatePage(selectedHotspot.pageId)}
                  className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-inter font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-orange-500/30"
                >
                  <span>Open Page</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
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
            6 REAL SERVICES &amp; DIVISIONS · NAZE MEGA COMPLEX
          </span>
        </div>

        {/* Controls: Audio, Play/Pause & Live Certification Tag */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Audio toggle */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
            className="flex items-center gap-1.5 bg-[#090d16]/90 hover:bg-slate-800 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full text-[11px] font-mono text-white font-semibold shadow-md transition-colors cursor-pointer"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline text-slate-300">Unmute</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span className="hidden sm:inline text-emerald-400">Audio On</span>
              </>
            )}
          </button>

          {/* Play/Pause toggle */}
          <button
            type="button"
            onClick={togglePlayPause}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            className="flex items-center gap-1 bg-[#090d16]/90 hover:bg-slate-800 backdrop-blur-md border border-white/15 px-2.5 py-1.5 rounded-full text-[11px] font-mono text-white font-semibold shadow-md transition-colors cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 text-slate-300" />
            ) : (
              <Play className="w-3.5 h-3.5 text-emerald-400" />
            )}
          </button>

          {/* Live Certification Tag */}
          <div className="hidden sm:flex items-center gap-1.5 bg-[#090d16]/90 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-[11px] font-mono text-emerald-400 font-semibold shadow-md">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>DPR Certified 24/7 Facility</span>
          </div>
        </div>
      </div>

      {/* BOTTOM FLOATING SECTOR DOCK */}
      <div className="absolute bottom-5 left-0 right-0 z-30 pointer-events-none flex flex-col items-center gap-2.5 px-3 w-full max-w-full">
        {/* Quick Sector Filter Chips - REAL SERVICES 1 to 6 */}
        <div className="pointer-events-auto flex items-center gap-1.5 p-1.5 bg-[#090d16]/90 backdrop-blur-xl border border-white/15 rounded-full shadow-xl max-w-[calc(100vw-2rem)] overflow-x-auto no-scrollbar">
          {hotspots.map((hs) => {
            const isSelected = selectedHotspot?.id === hs.id;
            const ServiceIcon = hs.icon;
            return (
              <button
                key={hs.id}
                type="button"
                onClick={() => handleSelectHotspot(hs)}
                className={`px-3 py-1 text-xs font-inter font-semibold rounded-full transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-orange-500 text-white font-bold shadow-md shadow-orange-500/30 ring-1 ring-white/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <ServiceIcon className="w-3.5 h-3.5 shrink-0 text-current" />
                <span>{hs.shortLabel}</span>
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
          className="pointer-events-auto flex items-center justify-center gap-2 px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-xs font-inter font-bold transition-all shadow-lg shadow-orange-500/30 hover:scale-105 cursor-pointer active:scale-95 border border-orange-400 max-w-[calc(100vw-2rem)]"
        >
          <span className="truncate">Scroll down for station details &amp; live prices</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-white shrink-0" />
        </button>
      </div>
    </div>
  );
};
