import React from 'react';
import { motion } from 'motion/react';
import { DepartmentId } from '../../types/hub';
import { DEPARTMENTS } from '../../data/hubData';
import { ArrowUpRight, Compass, Clock, CheckCircle2 } from 'lucide-react';

interface DepartmentsGridProps {
  onSelectDept: (deptId: DepartmentId) => void;
  onOpenDeptDetail: (deptId: DepartmentId) => void;
}

export const DepartmentsGrid: React.FC<DepartmentsGridProps> = ({
  onSelectDept
}) => {
  const deptList = Object.values(DEPARTMENTS);

  return (
    <section id="departments" className="py-14 sm:py-20 lg:py-24 bg-white border-t border-slate-200 relative w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-6 sm:pb-8 border-b border-slate-200">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-orange-600 mb-2 font-bold">
              OUR 5 ORIGINAL SERVICES · ALL IN ONE COMPOUND
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight font-display">
              The Five Services at Master Energy
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md font-normal leading-relaxed">
            Every service inside our Naze complex is run by trained staff to give you clean fuel, good food, cool chilling, and honest value.
          </p>
        </div>

        {/* Dynamic Editorial Grid with Alternating Black & Orange Sliding Boxes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 overflow-hidden">
          {deptList.map((dept, idx) => {
            const isMarquee = idx === 0;
            const colSpan = isMarquee ? 'lg:col-span-12' : 'lg:col-span-6';
            const indexStr = `0${idx + 1} / 05`;
            // Alternating Box Theme: Even indexes (0, 2, 4) are Black Boxes; Odd indexes (1, 3) are Orange Boxes
            const isBlackBox = idx % 2 === 0;
            const slideFrom = isBlackBox ? -28 : 28;

            return (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, x: slideFrom, y: 12 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.38, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                style={{ willChange: 'transform, opacity' }}
                className={`${colSpan} group relative rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                  isBlackBox
                    ? 'bg-slate-950 text-white border-2 border-orange-500/40 shadow-2xl hover:border-orange-500 hover:shadow-orange-500/10'
                    : 'bg-orange-500 text-slate-950 border-2 border-orange-600 shadow-2xl hover:border-slate-950 hover:shadow-orange-500/30'
                }`}
              >
                {/* Media Container with Zoom on Hover */}
                <div className={`relative w-full ${isMarquee ? 'h-64 sm:h-80 lg:h-96' : 'h-60 sm:h-72'} overflow-hidden bg-slate-900`}>
                  <img
                    src={dept.image}
                    alt={dept.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const current = e.currentTarget.getAttribute('src');
                      if (current?.startsWith('/images/')) {
                        e.currentTarget.src = current.replace('/images/', '/assets/images/');
                      }
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

                  {/* Top Bar inside Card */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className={`font-mono text-xs font-bold px-3 py-1 rounded-lg shadow-md ${
                      isBlackBox 
                        ? 'text-slate-950 bg-orange-500' 
                        : 'text-orange-400 bg-slate-950 border border-orange-500/30'
                    }`}>
                      {indexStr} · {dept.badge}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDept(dept.id);
                        document.getElementById('3d-tour')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="pointer-events-auto flex items-center gap-1.5 text-xs font-mono text-slate-950 bg-white/95 hover:bg-orange-200 px-3 py-1.5 rounded-lg border border-slate-300 transition-all cursor-pointer shadow-md font-bold"
                    >
                      <Compass className="w-3.5 h-3.5 text-orange-600" />
                      <span>3D View</span>
                    </button>
                  </div>
                </div>

                {/* Editorial Details Container */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow space-y-6">
                  <div>
                    <div className={`flex items-center gap-3 text-xs font-mono mb-2 ${
                      isBlackBox ? 'text-orange-400/90' : 'text-slate-900 font-bold'
                    }`}>
                      <Clock className={`w-3.5 h-3.5 shrink-0 ${isBlackBox ? 'text-orange-400' : 'text-slate-950'}`} />
                      <span>{dept.hours}</span>
                      <span>·</span>
                      <span>{dept.phone}</span>
                    </div>

                    <h3 className={`text-2xl sm:text-3xl font-extrabold font-display tracking-tight transition-colors ${
                      isBlackBox 
                        ? 'text-white group-hover:text-orange-400' 
                        : 'text-slate-950 group-hover:text-black'
                    }`}>
                      {dept.name}
                    </h3>
                    <p className={`mt-1 text-sm font-bold ${
                      isBlackBox ? 'text-orange-400' : 'text-slate-900'
                    }`}>
                      {dept.subtitle}
                    </p>
                    <p className={`mt-3 text-sm leading-relaxed ${
                      isBlackBox ? 'text-slate-300 font-normal' : 'text-slate-950 font-medium'
                    }`}>
                      {dept.description}
                    </p>

                    {/* Highlights */}
                    <div className={`mt-5 pt-4 space-y-2 border-t ${
                      isBlackBox ? 'border-white/10' : 'border-slate-950/20'
                    }`}>
                      {dept.highlights.slice(0, 3).map((item, hIdx) => (
                        <div key={hIdx} className={`flex items-start gap-2.5 text-xs ${
                          isBlackBox ? 'text-slate-200 font-normal' : 'text-slate-950 font-bold'
                        }`}>
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isBlackBox ? 'text-orange-400' : 'text-slate-950'
                          }`} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Strip */}
                  <div className={`pt-5 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isBlackBox ? 'border-white/10' : 'border-slate-950/20'
                  }`}>
                    <div className="grid grid-cols-2 gap-3 min-w-0">
                      {dept.keyStats.slice(0, 2).map((st, sIdx) => (
                        <div key={sIdx} className="min-w-0">
                          <div className={`text-[10px] uppercase font-mono tracking-wider truncate font-semibold ${
                            isBlackBox ? 'text-slate-400' : 'text-slate-800'
                          }`}>
                            {st.label}
                          </div>
                          <div className={`text-sm sm:text-base font-extrabold font-display tabular-nums truncate ${
                            isBlackBox ? 'text-orange-400' : 'text-slate-950'
                          }`}>
                            {st.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectDept(dept.id)}
                      className={`flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg whitespace-nowrap cursor-pointer hover:scale-105 ${
                        isBlackBox
                          ? 'text-slate-950 bg-orange-500 hover:bg-orange-400 shadow-orange-500/20'
                          : 'text-orange-400 bg-slate-950 hover:bg-black hover:text-white shadow-slate-950/30'
                      }`}
                    >
                      <span>View {dept.name.replace('Master Energy ', '').replace('Masters ', '')} Page</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

