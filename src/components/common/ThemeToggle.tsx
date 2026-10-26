import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  variant?: 'pill' | 'icon' | 'badge';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  variant = 'pill',
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`p-2 rounded-xl transition-all duration-200 cursor-pointer ${
          isDark
            ? 'bg-slate-800 text-amber-300 hover:bg-slate-700 hover:text-amber-200 border border-slate-700'
            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-950 border border-slate-200'
        } ${className}`}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        {isDark ? (
          <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 transition-transform duration-300 -rotate-12 hover:rotate-0" />
        )}
      </button>
    );
  }

  // Default: Interactive Pill Switch with Sun/Moon icons & state text
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`group relative inline-flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full text-xs font-mono font-bold transition-all duration-300 cursor-pointer select-none shadow-xs border ${
        isDark
          ? 'bg-slate-900/90 text-slate-200 border-slate-700 hover:border-amber-400/50 shadow-slate-950/40'
          : 'bg-white text-slate-800 border-slate-200 hover:border-blue-900/40 shadow-slate-200/50'
      } ${className}`}
      aria-label={`Toggle theme (Currently ${theme} mode)`}
      title={`Currently ${isDark ? 'Dark' : 'Light'} Mode. Click to switch.`}
    >
      {/* Sliding indicator bubble */}
      <span
        className={`flex items-center justify-center w-5 h-5 rounded-full transition-all duration-300 ${
          isDark
            ? 'bg-amber-400 text-slate-950 shadow-sm shadow-amber-400/30 translate-x-0'
            : 'bg-blue-900 text-white shadow-sm shadow-blue-900/30'
        }`}
      >
        {isDark ? (
          <Sun className="w-3 h-3 text-slate-950" />
        ) : (
          <Moon className="w-3 h-3 text-white" />
        )}
      </span>

      {/* Label */}
      <span className="text-[11px] font-semibold tracking-wide hidden sm:inline">
        {isDark ? 'Dark Mode' : 'Light Mode'}
      </span>

      {/* Mini indicator dot */}
      <span
        className={`w-1.5 h-1.5 rounded-full transition-colors ${
          isDark ? 'bg-amber-400' : 'bg-blue-900'
        }`}
      />
    </button>
  );
};
