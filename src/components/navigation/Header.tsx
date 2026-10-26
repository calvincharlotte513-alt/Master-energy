import React, { useState } from 'react';
import { PageId } from '../../types/hub';
import { Menu, X, Fuel, UtensilsCrossed, Wine, Sparkles, Trees, Store, CalendarCheck, MapPin } from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  onNavigatePage: (page: PageId) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigatePage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // "Book" is in the menu list as requested
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200 transition-all shadow-sm w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 h-18 sm:h-20 w-full min-w-0">
        {/* Brand logo & name */}
        <button
          type="button"
          onClick={() => handleSelectPage('home')}
          className="flex items-center gap-2.5 text-left group cursor-pointer shrink-0 min-w-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-slate-950 font-display font-black text-sm shadow-md shadow-amber-500/20 shrink-0 border border-amber-300">
            ME
          </div>
          <div className="min-w-0">
            <div className="font-display font-extrabold text-sm sm:text-base text-slate-950 tracking-wide group-hover:text-amber-600 transition-colors whitespace-nowrap truncate">
              MASTER ENERGY
            </div>
            <div className="text-[10px] text-amber-600 font-mono font-bold tracking-wider -mt-0.5 whitespace-nowrap truncate">
              NAZE · IMO STATE
            </div>
          </div>
        </button>

        {/* Desktop Navigation Menu (Includes Book) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 font-inter shrink-0">
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
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-sm shadow-amber-400/30'
                    : isBook
                    ? 'text-amber-800 bg-amber-400/20 hover:bg-amber-400/30 font-bold border border-amber-400/40'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Station Status Tag & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] font-roboto font-bold text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Forecourt 24/7</span>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 hover:text-slate-950 hover:bg-amber-100 transition-colors cursor-pointer shrink-0"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Includes Book in the menu) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200 w-full max-w-full">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 px-2 py-1 font-bold">
            Menu Navigation:
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
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-sm shadow-amber-400/20'
                      : isBook
                      ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold'
                      : 'bg-slate-50 text-slate-800 hover:bg-amber-50 border border-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0 text-slate-700" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 mt-3 flex items-center justify-between text-xs font-mono text-slate-600 px-2">
            <span>Aba-Owerri Road, Naze</span>
            <span className="text-emerald-700 font-bold">Active 24/7</span>
          </div>
        </div>
      )}
    </header>
  );
};
