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
    <div className="w-full max-w-full overflow-hidden bg-slate-50/95 border-b border-slate-200 backdrop-blur-xl py-2.5 sticky top-18 sm:top-20 z-40 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-w-0">
        <div className="flex items-center justify-between gap-3 overflow-x-auto no-scrollbar w-full min-w-0 py-0.5">
          <div className="items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-slate-500 shrink-0 hidden xl:flex font-bold">
            <span>DIVISION SELECTOR</span>
            <span className="text-orange-500">/</span>
          </div>

          {/* Interactive White & Orange Segmented Tabs */}
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
                      ? 'bg-orange-500 text-slate-950 font-bold border border-orange-600 shadow-sm shadow-orange-500/20'
                      : 'bg-white text-slate-700 hover:text-slate-950 hover:bg-orange-50/80 border border-slate-200'
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-75">{dept.roman}.</span>
                  <Icon className="w-3.5 h-3.5" />
                  <span className="tracking-wide">{dept.name}</span>
                </button>
              );
            })}
          </div>

          {/* Leased Promenade Jump Link */}
          <button
            type="button"
            onClick={onJumpToLeases}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-mono text-orange-950 hover:text-black bg-orange-100 hover:bg-orange-200 rounded-lg border border-orange-300 transition-all whitespace-nowrap shrink-0 cursor-pointer font-bold"
          >
            <Store className="w-3.5 h-3.5 text-orange-700" />
            <span className="uppercase text-[11px] tracking-wider">Micro: Leases</span>
          </button>
        </div>
      </div>
    </div>
  );
};
