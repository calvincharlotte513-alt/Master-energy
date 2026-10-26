import React from 'react';
import { DepartmentId, PageId } from '../types/hub';
import { MainStation3DTwin } from '../components/3d/MainStation3DTwin';
import { HeroSection } from '../components/sections/HeroSection';
import { StationWriteupSection } from '../components/sections/StationWriteupSection';
import { InteractiveHubTools } from '../components/sections/InteractiveHubTools';
import { DepartmentsGrid } from '../components/sections/DepartmentsGrid';
import { LeasedPromenadeSection } from '../components/sections/LeasedPromenadeSection';
import { StorytellingSection } from '../components/sections/StorytellingSection';
import { LocationGuideSection } from '../components/sections/LocationGuideSection';
import { ChevronDown, Fuel, Calculator } from 'lucide-react';

interface HomePageProps {
  activeDept: DepartmentId;
  onSelectDept: (deptId: DepartmentId) => void;
  onOpenDeptDetail: (deptId: DepartmentId) => void;
  onNavigatePage: (page: PageId) => void;
  onOpenLeasingModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  activeDept,
  onSelectDept,
  onOpenDeptDetail,
  onNavigatePage,
  onOpenLeasingModal
}) => {
  return (
    <div className="w-full max-w-full overflow-x-hidden min-w-0">
      {/* 1. FULL-SCREEN UNBOXED 3D DIGITAL TWIN (With wheel-scroll pass-through & minimal dock) */}
      <section id="main-3d-scene" className="relative w-full max-w-full overflow-hidden">
        <MainStation3DTwin
          activeDept={activeDept}
          onSelectDept={onSelectDept}
          onNavigatePage={onNavigatePage}
          onOpenDeptDetail={onOpenDeptDetail}
          onScrollToContent={() => {
            const target = document.getElementById('station-hero') || document.getElementById('station-details');
            if (target) {
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
        />
      </section>

      {/* 2. INSTANT VISUAL ANCHOR STRIP (White & Yellow Luxury Theme with Touch of Black) */}
      <div className="w-full max-w-full overflow-hidden bg-amber-50/90 border-y border-amber-300/80 py-3 px-4 sm:px-8 flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
        <div className="flex items-center gap-2.5 font-roboto text-slate-800">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
          <span className="font-extrabold text-slate-950 uppercase text-[11px] sm:text-xs tracking-wide">
            Master Energy Mega Hub · Naze Forecourt &amp; Campus
          </span>
          <span className="text-slate-300 hidden md:inline">|</span>
          <span className="text-amber-800 font-bold hidden md:inline">
            PMS: ₦710/L · AGO: ₦1,050/L · DPK: ₦1,150/L · LPG: ₦1,400/Kg
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('station-details');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-500 border border-amber-500 text-slate-950 text-xs font-bold rounded-lg transition-all cursor-pointer shadow-xs"
          >
            <Fuel className="w-3.5 h-3.5 text-slate-950" />
            <span>Station Prices</span>
            <ChevronDown className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('calculator');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold rounded-lg transition-all cursor-pointer shadow-xs"
          >
            <Calculator className="w-3.5 h-3.5 text-slate-700" />
            <span>Calculator</span>
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 3. ORIGINAL HERO SECTION (With photo, Nigerian tone, quick links & 4-column KPI strip) */}
      <div id="station-hero">
        <HeroSection
          onExplore3D={() => {
            document.getElementById('main-3d-scene')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onNavigatePage={onNavigatePage}
        />
      </div>

      {/* 3. REAL-TIME NIGERIAN ENERGY METERS & REASSURANCE PILLARS */}
      <StationWriteupSection
        onNavigatePage={onNavigatePage}
      />

      {/* 4. INTERACTIVE HUB TOOLS (Fuel Volumetric Calculator, Detailing Bay Slot, VIP Lounge Booking) */}
      <InteractiveHubTools />

      {/* 5. THE 5 MAIN CAMPUS DIVISIONS BENTO GRID */}
      <DepartmentsGrid
        onSelectDept={(deptId) => {
          onSelectDept(deptId);
          onNavigatePage(deptId as PageId);
        }}
        onOpenDeptDetail={onOpenDeptDetail}
      />

      {/* 6. LEASED PROMENADE MICRO-SECTION */}
      <LeasedPromenadeSection
        onOpenLeasingModal={onOpenLeasingModal}
      />

      {/* 7. STORY OF MASTER ENERGY NAZE */}
      <StorytellingSection />

      {/* 8. LOCATION GUIDE & ROADMAP */}
      <LocationGuideSection />
    </div>
  );
};
