import React, { useState } from 'react';
import { PageId } from '../../types/hub';
import { Menu, X, Fuel, UtensilsCrossed, Wine, Sparkles, Trees, Store, CalendarCheck, MapPin } from 'lucide-react';
import { MasterEnergyLogo } from '../common/MasterEnergyLogo';
import { ThemeToggle } from '../common/ThemeToggle';

interface HeaderProps {
  currentPage: PageId;
  onNavigatePage: (page: PageId) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigatePage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Navigation Items with "Book" prominently listed
  const navItems: { id: PageId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Fuel },
    { id: 'oil-gas', label: 'Fuel & Gas', icon: Fuel },
    { id: 'kitchen', label: 'Kitchen', icon: UtensilsCrossed },
    { id: 'lounge', label: 'VIP Lounge', icon: Wine },
    { id: 'carwash', label: 'Car Wash', icon: Sparkles },
    { id: 'garden', label: 'Bar & Garden', icon: Trees },
    { id: 'promenade', label: 'Leased Shops', icon: Store },
    { id: 'book', label: 'Book', icon: CalendarCheck },
    { id: 'location', label: 'Directions', icon: MapPin }
  ];

  const handleSelectPage = (page: PageId) => {
    onNavigatePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#080d1a]/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-250 shadow-xs w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3 px-3 sm:px-6 lg:px-8 h-18 sm:h-20 w-full min-w-0">
        {/* Brand logo & location tag */}
        <button
          type="button"
          onClick={() => handleSelectPage('home')}
          className="flex items-center gap-2 sm:gap-3 text-left group cursor-pointer shrink-0 min-w-0 py-1"
        >
          <MasterEnergyLogo size="md" showText={true} />
          <div className="hidden md:flex flex-col justify-center border-l border-slate-200 dark:border-slate-800 pl-2.5">
            <span className="text-xs text-blue-900 dark:text-blue-400 font-mono font-extrabold tracking-wider whitespace-nowrap">
              Naze · Imo State
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono font-medium whitespace-nowrap">
              Mega Forecourt · KM 3
            </span>
          </div>
        </button>

        {/* Desktop Navigation Menu */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 font-inter shrink-0">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            const isBook = item.id === 'book';

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectPage(item.id)}
                className={`px-3 py-2 text-xs rounded-lg transition-all whitespace-nowrap cursor-pointer font-semibold ${
                  isActive
                    ? 'bg-blue-900 dark:bg-blue-600 text-white font-bold shadow-xs shadow-blue-900/30'
                    : isBook
                    ? 'text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/50 font-bold border border-red-300 dark:border-red-800/60 shadow-xs'
                    : 'text-slate-700 dark:text-slate-200 hover:text-blue-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action strip: Dark/Light Mode Toggle, Station Status Badge & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* THEME TOGGLE (Top Bar - Desktop & Mobile) */}
          <ThemeToggle />

          {/* Station Status Tag */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 text-[11px] font-roboto font-bold text-emerald-700 dark:text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Forecourt 24/7</span>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-800 dark:text-slate-100 hover:text-blue-900 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors cursor-pointer shrink-0"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-slate-900 dark:text-slate-100" />
            ) : (
              <Menu className="w-5 h-5 text-slate-900 dark:text-slate-100" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#0a0f1d] border-b border-slate-200 dark:border-slate-800 px-4 py-4 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200 w-full max-w-full">
          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
              Menu Navigation:
            </span>
            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Active 24/7
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              const isBook = item.id === 'book';
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectPage(item.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-900 dark:bg-blue-600 text-white font-bold shadow-xs'
                      : isBook
                      ? 'bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800/60 font-bold'
                      : 'bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-700/60'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0 text-slate-600 dark:text-slate-300" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400 px-2">
            <span>Aba-Owerri Road, Naze</span>
            <span className="text-blue-900 dark:text-blue-400 font-bold">Master Energy Hub</span>
          </div>
        </div>
      )}
    </header>
  );
};
