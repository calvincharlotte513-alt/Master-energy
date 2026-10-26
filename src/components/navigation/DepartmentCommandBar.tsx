import React from 'react';
import { DepartmentId } from '../../types/hub';
import { Fuel, UtensilsCrossed, Wine, Sparkles, Trees, Store } from 'lucide-react';

interface DepartmentCommandBarProps {
  activeDept: DepartmentId;
  onSelectDept: (deptId: DepartmentId) => void;
  onJumpToLeases: () => void;
}

export const DepartmentCommandBar: React.FC<DepartmentCommandBarProps> = ({
  activeDept,
  onSelectDept,
  onJumpToLeases
}) => {
  const departments = [
    { id: 'oil-gas' as DepartmentId, roman: 'I', name: 'Oil & Gas', full: 'Master Energy Oil & Gas', icon: Fuel },
    { id: 'kitchen' as DepartmentId, roman: 'II', name: 'Kitchen', full: 'Masters Kitchen', icon: UtensilsCrossed },
    { id: 'lounge' as DepartmentId, roman: 'III', name: 'VIP Lounge', full: 'Masters Lounge', icon: Wine },
    { id: 'carwash' as DepartmentId, roman: 'IV', name: 'Car Wash', full: 'Masters Car Wash', icon: Sparkles },
    { id: 'garden' as DepartmentId, roman: 'V', name: 'Bar & Garden', full: 'Masters Bar & Garden', icon: Trees }
  ];

  return (
    <div className="w-full max-w-full overflow-hidden bg-slate-50/95 dark:bg-[#0b1020]/95 border-b border-slate-200 dark:border-slate-800/80 backdrop-blur-xl py-2.5 sticky top-18 sm:top-20 z-40 transition-colors duration-250 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-w-0">
        <div className="flex items-center justify-between gap-3 overflow-x-auto no-scrollbar w-full min-w-0 py-0.5">
          <div className="items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 shrink-0 hidden xl:flex font-bold">
            <span>DIVISION SELECTOR</span>
            <span className="text-blue-900 dark:text-blue-400">/</span>
          </div>

          {/* Segmented Department Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {departments.map((dept) => {
              const Icon = dept.icon;
              const isActive = activeDept === dept.id;
              return (
                <button
                  key={dept.id}
                  type="button"
                  onClick={() => onSelectDept(dept.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer font-semibold ${
                    isActive
                      ? 'bg-blue-900 dark:bg-blue-600 text-white font-bold border border-blue-950 dark:border-blue-500 shadow-sm shadow-blue-900/25'
                      : 'bg-white dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:text-blue-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-75">{dept.roman}.</span>
                  <Icon className="w-3.5 h-3.5" />
                  <span className="tracking-wide">{dept.name}</span>
                </button>
              );
            })}
          </div>

          {/* Leased Promenade Jump Link in Warm Gold */}
          <button
            type="button"
            onClick={onJumpToLeases}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-mono text-amber-950 dark:text-amber-200 hover:text-black dark:hover:text-white bg-amber-100/80 dark:bg-amber-950/50 hover:bg-amber-200/90 dark:hover:bg-amber-900/60 rounded-lg border border-amber-300/80 dark:border-amber-700/60 transition-all whitespace-nowrap shrink-0 cursor-pointer font-bold shadow-xs"
          >
            <Store className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
            <span className="uppercase text-[11px] tracking-wider">Micro: Leases</span>
          </button>
        </div>
      </div>
    </div>
  );
};
