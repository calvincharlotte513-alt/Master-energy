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
    <div className="w-full max-w-full overflow-x-hidden min-w-0 bg-white dark:bg-[#080d1a] transition-colors duration-250">
      {/* 1. FULL-SCREEN 3D DIGITAL TWIN */}
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

      {/* 2. INSTANT VISUAL ANCHOR STRIP (Logo Color Code: Navy, Flame Red, Warm Champagne Cream) */}
      <div className="w-full max-w-full overflow-hidden bg-[#faf7ef] dark:bg-[#0d1424] border-y border-amber-200/80 dark:border-slate-800 py-3 px-4 sm:px-8 flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs transition-colors">
        <div className="flex items-center gap-2.5 font-roboto text-slate-800 dark:text-slate-200">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
          <span className="font-extrabold text-slate-950 dark:text-white uppercase text-[11px] sm:text-xs tracking-wide">
            Master Energy Mega Hub · Naze Forecourt &amp; Campus
          </span>
          <span className="text-slate-300 dark:text-slate-700 hidden md:inline">|</span>
          <span className="text-blue-900 dark:text-blue-300 font-bold hidden md:inline">
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
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-all cursor-pointer shadow-xs border border-blue-950 dark:border-blue-500"
          >
            <Fuel className="w-3.5 h-3.5 text-white" />
            <span>Station Prices</span>
            <ChevronDown className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('calculator');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-lg transition-all cursor-pointer shadow-xs"
          >
            <Calculator className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
            <span>Calculator</span>
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 3. HERO SECTION */}
      <div id="station-hero">
        <HeroSection
          onExplore3D={() => {
            document.getElementById('main-3d-scene')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onNavigatePage={onNavigatePage}
        />
      </div>

      {/* 4. REAL-TIME NIGERIAN ENERGY METERS & REASSURANCE PILLARS */}
      <StationWriteupSection
        onNavigatePage={onNavigatePage}
      />

      {/* 5. INTERACTIVE HUB TOOLS */}
      <InteractiveHubTools />

      {/* 6. THE 5 MAIN CAMPUS DIVISIONS BENTO GRID */}
      <DepartmentsGrid
        onSelectDept={(deptId) => {
          onSelectDept(deptId);
          onNavigatePage(deptId as PageId);
        }}
        onOpenDeptDetail={onOpenDeptDetail}
      />

      {/* 7. LEASED PROMENADE MICRO-SECTION */}
      <LeasedPromenadeSection
        onOpenLeasingModal={onOpenLeasingModal}
      />

      {/* 8. STORY OF MASTER ENERGY NAZE */}
      <StorytellingSection />

      {/* 9. LOCATION GUIDE & ROADMAP */}
      <LocationGuideSection />
    </div>
  );
};
