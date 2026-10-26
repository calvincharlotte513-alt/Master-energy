import React from 'react';

interface MasterEnergyLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const MasterEnergyLogo: React.FC<MasterEnergyLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const sizeMap = {
    sm: { img: 'h-8 w-8', text: 'text-sm' },
    md: { img: 'h-10 w-10 sm:h-11 sm:w-11', text: 'text-base' },
    lg: { img: 'h-14 w-14 sm:h-16 sm:w-16', text: 'text-lg' },
    xl: { img: 'h-20 w-20 sm:h-24 sm:w-24', text: 'text-xl' },
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Precision SVG Vector Emblem of Masters Energy Logo */}
      <div className={`relative ${sizeMap[size].img} shrink-0 aspect-square rounded-full transition-transform group-hover:scale-105`}>
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-md select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gear gradient matching the steel navy blue in logo */}
            <linearGradient id="gearNavy" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2e487f" />
              <stop offset="50%" stopColor="#1e3a8a" />
              <stop offset="100%" stopColor="#172554" />
            </linearGradient>

            {/* Inner disc champagne cream */}
            <radialGradient id="discCream" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fdf6e2" />
              <stop offset="70%" stopColor="#f4e8c1" />
              <stop offset="100%" stopColor="#e5d09b" />
            </radialGradient>

            {/* Flame Crimson Red */}
            <linearGradient id="flameRed" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="45%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>

            {/* Curved text paths */}
            <path
              id="mastersTopPath"
              d="M 40,100 A 60,60 0 0,1 160,100"
              fill="none"
            />
            <path
              id="energyBottomPath"
              d="M 160,100 A 60,60 0 0,1 40,100"
              fill="none"
            />
          </defs>

          {/* Cog teeth (24 teeth around perimeter) */}
          <g fill="url(#gearNavy)">
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i * 360) / 24;
              return (
                <rect
                  key={i}
                  x="96"
                  y="2"
                  width="8"
                  height="14"
                  rx="2"
                  transform={`rotate(${angle} 100 100)`}
                />
              );
            })}
            {/* Outer solid gear ring */}
            <circle cx="100" cy="100" r="90" />
          </g>

          {/* Dark inner ring */}
          <circle cx="100" cy="100" r="74" fill="#080e1d" />

          {/* Curved Text: MASTERS (Top) */}
          <text
            fill="#3b60a8"
            fontSize="15"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            letterSpacing="3"
          >
            <textPath href="#mastersTopPath" startOffset="50%" textAnchor="middle">
              MASTERS
            </textPath>
          </text>

          {/* Curved Text: ENERGY (Bottom) */}
          <text
            fill="#3b60a8"
            fontSize="14"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            letterSpacing="3"
          >
            <textPath href="#energyBottomPath" startOffset="50%" textAnchor="middle">
              ENERGY
            </textPath>
          </text>

          {/* Central Champagne Golden Disc */}
          <circle cx="100" cy="100" r="48" fill="url(#discCream)" stroke="#111827" strokeWidth="2.5" />

          {/* Flame / Droplet Shape */}
          <path
            d="M 100,60 C 104,74 122,86 122,105 C 122,120 111,130 98,130 C 85,130 78,119 78,107 C 78,92 94,80 97,60 Z"
            fill="url(#flameRed)"
            filter="drop-shadow(0 1px 2px rgba(0,0,0,0.3))"
          />

          {/* Central void in flame */}
          <circle cx="98" cy="116" r="4.5" fill="#111827" />
        </svg>
      </div>

      {/* Brand Name & Tag */}
      {showText && (
        <div className="flex flex-col justify-center min-w-0">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="font-display font-black tracking-tight text-slate-900 dark:text-white uppercase text-sm sm:text-base">
              Masters
            </span>
            <span className="font-display font-black tracking-tight text-red-600 dark:text-red-500 uppercase text-sm sm:text-base">
              Energy
            </span>
          </div>
          <span className="text-[10px] font-mono tracking-wider uppercase text-blue-900 dark:text-blue-300 font-bold mt-0.5">
            Mega Station · Naze
          </span>
        </div>
      )}
    </div>
  );
};
