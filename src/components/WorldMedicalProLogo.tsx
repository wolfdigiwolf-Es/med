import React from 'react';
import worldMedicalLogoImg from '../assets/images/world_medical_pro_logo_1787955377584.jpg';

interface WorldMedicalProLogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'light' | 'dark' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  subtitle?: string;
}

export const WorldMedicalProLogo: React.FC<WorldMedicalProLogoProps> = ({
  className = '',
  showText = false,
  variant = 'light',
  size = 'md',
  subtitle = 'Operating System Médical Universel'
}) => {
  const sizeMap = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14'
  };

  const currentSize = className.includes('w-') ? className : sizeMap[size];

  const logoVisual = (
    <div className={`relative shrink-0 rounded-2xl overflow-hidden shadow-sm border border-blue-100/80 bg-white group flex items-center justify-center p-0.5 ${currentSize}`}>
      {/* Dynamic Aura Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/15 via-cyan-400/20 to-emerald-400/10 opacity-70 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Generated High-Res Emblem Image */}
      <img
        src={worldMedicalLogoImg}
        alt="World Medical Pro Logo"
        className="w-full h-full object-cover rounded-xl relative z-10 transition-transform duration-300 group-hover:scale-105"
        referrerPolicy="no-referrer"
        onError={(e) => {
          // Fallback SVG if image is ever missing
          e.currentTarget.style.display = 'none';
        }}
      />

      {/* Futuristic corner radar dot */}
      <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping pointer-events-none" />
      <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-cyan-500 rounded-full pointer-events-none" />
    </div>
  );

  if (!showText) {
    return logoVisual;
  }

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {logoVisual}
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="font-black text-sm sm:text-base tracking-tight text-slate-900 leading-tight">
            World Medical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500">Pro</span>
          </span>
          <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 tracking-wider">
            v3.0
          </span>
        </div>
        <span className="text-[10px] sm:text-[11px] text-slate-500 font-semibold leading-tight truncate">
          {subtitle}
        </span>
      </div>
    </div>
  );
};
