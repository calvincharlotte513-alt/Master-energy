import React from 'react';
import { DepartmentId } from '../../types/hub';
import { DEPARTMENTS } from '../../data/hubData';
import { ArrowUpRight, Compass, Clock, CheckCircle2 } from 'lucide-react';

interface DepartmentsGridProps {
  onSelectDept: (deptId: DepartmentId) => void;
  onOpenDeptDetail: (deptId: DepartmentId) => void;
}

export const DepartmentsGrid: React.FC<DepartmentsGridProps> = ({
  onSelectDept,
  onOpenDeptDetail
}) => {
  const deptList = Object.values(DEPARTMENTS);

  return (
    <section id="departments" className="py-14 sm:py-20 lg:py-24 bg-[#060910] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-6 sm:pb-8 border-b border-white/10">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-amber-400 mb-2 font-semibold">
              OUR 5 ORIGINAL SERVICES · ALL IN ONE COMPOUND
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
              The Five Services at Master Energy
            </h2>
          </div>
          <p className="text-sm text-slate-300 max-w-md font-normal leading-relaxed">
            Every service inside our Naze complex is run by trained staff to give you clean fuel, good food, cool chilling, and honest value.
          </p>
        </div>

        {/* Famous Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10">
          {deptList.map((dept, idx) => {
            const isMarquee = idx === 0;
            const colSpan = isMarquee ? 'lg:col-span-12' : 'lg:col-span-6';
            const indexStr = `0${idx + 1} / 05`;

            return (
              <div
                key={dept.id}
                className={`${colSpan} group relative rounded-3xl overflow-hidden bg-[#090d16] border border-white/10 hover:border-amber-400/30 transition-all flex flex-col justify-between shadow-2xl`}
              >
                {/* Media Container with Zoom on Hover */}
                <div className={`relative w-full ${isMarquee ? 'h-64 sm:h-80 lg:h-96' : 'h-60 sm:h-72'} overflow-hidden bg-slate-950`}>
                  <img
                    src={dept.image}
                    alt={dept.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/30 to-transparent pointer-events-none" />

                  {/* Top Bar inside Card */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="font-mono text-xs font-bold text-amber-400 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                      {indexStr} · {dept.badge}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDept(dept.id);
                        document.getElementById('3d-tour')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="pointer-events-auto flex items-center gap-1.5 text-xs font-mono text-slate-200 bg-black/75 hover:bg-amber-400 hover:text-slate-950 px-3 py-1.5 rounded-lg border border-white/15 transition-all cursor-pointer"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>3D View</span>
                    </button>
                  </div>
                </div>

                {/* Editorial Details Container */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow space-y-6">
                  <div>
                    <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mb-2">
                      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{dept.hours}</span>
                      <span>·</span>
                      <span>{dept.phone}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight group-hover:text-amber-400 transition-colors">
                      {dept.name}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-amber-300/90">{dept.subtitle}</p>
                    <p className="mt-3 text-sm text-slate-300 leading-relaxed font-normal">{dept.description}</p>

                    {/* Highlights */}
                    <div className="mt-5 pt-4 border-t border-white/10 space-y-2">
                      {dept.highlights.slice(0, 3).map((item, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Strip with Zero Overlapping */}
                  <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="grid grid-cols-2 gap-3 min-w-0">
                      {dept.keyStats.slice(0, 2).map((st, sIdx) => (
                        <div key={sIdx} className="min-w-0">
                          <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 truncate">{st.label}</div>
                          <div className="text-sm sm:text-base font-extrabold text-white font-display tabular-nums truncate">{st.value}</div>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectDept(dept.id)}
                      className="flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md shadow-amber-500/20 whitespace-nowrap cursor-pointer hover:scale-105"
                    >
                      <span>View {dept.name.replace('Master Energy ', '').replace('Masters ', '')} Page</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
