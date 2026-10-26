import React from 'react';
import { MapPin, Phone, ArrowUp } from 'lucide-react';
import { DepartmentId } from '../../types/hub';
import { MasterEnergyLogo } from '../common/MasterEnergyLogo';

interface FooterProps {
  onSelectDept: (deptId: DepartmentId) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectDept, onNavigateSection }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#060a14] border-t border-white/5 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <MasterEnergyLogo size="md" showText={false} />
              <div className="border-l border-white/10 pl-3">
                <span className="block text-xs font-mono font-bold text-red-500 uppercase tracking-wider">
                  Naze · Imo State
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Mega Forecourt Hub</span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-light">
              Eastern Nigeria’s flagship fueling station &amp; integrated lifestyle complex. Bringing certified calibrated energy, authentic dining, VIP nightlife, auto detailing, and garden hospitality to Naze, Imo State.
            </p>
            <div className="pt-2 text-slate-400 space-y-2 font-mono text-[11px]">
              <div className="flex items-center gap-2.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>KM 3 Aba-Owerri Expressway, Naze, Imo State</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>+234 803 456 7890</span>
              </div>
            </div>
          </div>

          {/* Quick Nav Col */}
          <div className="lg:col-span-3 space-y-4">
            <div className="font-mono font-bold text-white uppercase tracking-widest text-[11px]">
              Major Hub Divisions
            </div>
            <ul className="space-y-2.5 font-light">
              {[
                { id: 'oil-gas' as DepartmentId, name: 'Master Energy Oil & Gas Forecourt' },
                { id: 'kitchen' as DepartmentId, name: 'Masters Kitchen Dining & Takeout' },
                { id: 'lounge' as DepartmentId, name: 'Masters Lounge VIP Executive Bar' },
                { id: 'carwash' as DepartmentId, name: 'Masters Car Wash & Detailing' },
                { id: 'garden' as DepartmentId, name: 'Masters Bar & Tropical Garden' }
              ].map((d) => (
                <li key={d.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectDept(d.id);
                      document.getElementById('departments')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                  >
                    {d.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Leased & Commercial Col */}
          <div className="lg:col-span-3 space-y-4">
            <div className="font-mono font-bold text-white uppercase tracking-widest text-[11px]">
              Promenade &amp; Leases
            </div>
            <ul className="space-y-2.5 font-light">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('promenade')}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Zena Foodies (Pastries &amp; Waffles)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('promenade')}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Presh Arabian Premium Tea (Karak Chai &amp; Majlis)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('calculator')}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Live Fuel &amp; Gas Price Terminal
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('location')}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Transit Times &amp; Directions
                </button>
              </li>
            </ul>
          </div>

          {/* Standards & Back to Top */}
          <div className="lg:col-span-2 space-y-5 flex flex-col justify-between">
            <div>
              <div className="font-mono font-bold text-white uppercase tracking-widest text-[11px]">
                Standards
              </div>
              <p className="mt-2 text-[11px] text-slate-400 font-light leading-relaxed">
                NMDPRA Licensed · DPR Calibrated Dispensers · Standard Organization of Nigeria (SON) Certified Lubricants.
              </p>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors w-fit cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5 text-red-400" />
              <span>Top</span>
            </button>
          </div>
        </div>

        {/* Sub-footer */}
        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Master Energy Ltd. Naze Mega Complex, Imo State.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-slate-300">Forecourt Standards</span>
            <span>·</span>
            <span className="hover:text-slate-300">Retail Leasing</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
