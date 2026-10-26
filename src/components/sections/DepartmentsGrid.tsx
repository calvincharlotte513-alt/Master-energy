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
    <section id="departments" className="py-14 sm:py-20 lg:py-24 bg-white dark:bg-[#080d1a] border-t border-slate-200 dark:border-slate-800 relative w-full max-w-full overflow-hidden transition-colors duration-250">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-6 sm:pb-8 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-blue-900 dark:text-blue-400 mb-2 font-bold">
              OUR 5 ORIGINAL SERVICES · ALL IN ONE COMPOUND
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight font-display">
              The Five Services at Master Energy
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md font-normal leading-relaxed">
            Every service inside our Naze complex is run by trained staff to give you clean fuel, good food, cool chilling, and honest value.
          </p>
        </div>

        {/* Dynamic Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 overflow-hidden">
          {deptList.map((dept, idx) => {
            const isMarquee = idx === 0;
            const colSpan = isMarquee ? 'lg:col-span-12' : 'lg:col-span-6';
            const indexStr = `0${idx + 1} / 05`;
            const isDeepCard = idx === 0 || idx === 3;
            const slideFrom = idx % 2 === 0 ? -28 : 28;

            return (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, x: slideFrom, y: 12 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.38, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                style={{ willChange: 'transform, opacity' }}
                className={`${colSpan} group relative rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                  isDeepCard
                    ? 'bg-[#091224] text-white border-2 border-blue-900/60 shadow-2xl hover:border-blue-600'
                    : 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white border-2 border-slate-200 dark:border-slate-800 shadow-xl hover:border-blue-900/60'
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
                    <span className="font-mono text-xs font-bold px-3 py-1 rounded-lg shadow-md text-white bg-blue-900 border border-blue-700">
                      {indexStr} · {dept.badge}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDept(dept.id);
                        document.getElementById('3d-tour')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="pointer-events-auto flex items-center gap-1.5 text-xs font-mono text-slate-950 bg-white/95 hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-300 transition-all cursor-pointer shadow-md font-bold"
                    >
                      <Compass className="w-3.5 h-3.5 text-red-600" />
                      <span>3D View</span>
                    </button>
                  </div>
                </div>

                {/* Editorial Details Container */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow space-y-6">
                  <div>
                    <div className={`flex items-center gap-3 text-xs font-mono mb-2 ${
                      isDeepCard ? 'text-amber-300' : 'text-blue-900 dark:text-blue-400 font-bold'
                    }`}>
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>{dept.hours}</span>
                      <span>·</span>
                      <span>{dept.phone}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight transition-colors">
                      {dept.name}
                    </h3>
                    <p className={`mt-1 text-sm font-bold ${
                      isDeepCard ? 'text-amber-300' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {dept.subtitle}
                    </p>
                    <p className={`mt-3 text-sm leading-relaxed ${
                      isDeepCard ? 'text-slate-300 font-normal' : 'text-slate-700 dark:text-slate-300 font-normal'
                    }`}>
                      {dept.description}
                    </p>

                    {/* Highlights */}
                    <div className={`mt-5 pt-4 space-y-2 border-t ${
                      isDeepCard ? 'border-white/10' : 'border-slate-200 dark:border-slate-800'
                    }`}>
                      {dept.highlights.slice(0, 3).map((item, hIdx) => (
                        <div key={hIdx} className={`flex items-start gap-2.5 text-xs ${
                          isDeepCard ? 'text-slate-200' : 'text-slate-700 dark:text-slate-200'
                        }`}>
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isDeepCard ? 'text-amber-400' : 'text-emerald-600 dark:text-emerald-400'
                          }`} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Strip */}
                  <div className={`pt-5 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isDeepCard ? 'border-white/10' : 'border-slate-200 dark:border-slate-800'
                  }`}>
                    <div className="grid grid-cols-2 gap-3 min-w-0">
                      {dept.keyStats.slice(0, 2).map((st, sIdx) => (
                        <div key={sIdx} className="min-w-0">
                          <div className={`text-[10px] uppercase font-mono tracking-wider truncate font-semibold ${
                            isDeepCard ? 'text-slate-400' : 'text-slate-500 dark:text-slate-400'
                          }`}>
                            {st.label}
                          </div>
                          <div className={`text-sm sm:text-base font-extrabold font-display tabular-nums truncate ${
                            isDeepCard ? 'text-amber-300' : 'text-blue-900 dark:text-blue-400'
                          }`}>
                            {st.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectDept(dept.id)}
                      className="flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md whitespace-nowrap cursor-pointer hover:scale-105 text-white bg-red-600 hover:bg-red-700 shadow-red-600/25"
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
