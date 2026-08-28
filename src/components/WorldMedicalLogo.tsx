import React, { useState } from 'react';
import generatedLogo from '../assets/images/world_medical_pro_logo_1787955377584.jpg';

interface WorldMedicalLogoProps {
  className?: string;
  showText?: boolean;
  textClassName?: string;
  subtextClassName?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const WorldMedicalLogo: React.FC<WorldMedicalLogoProps> = ({
  className = '',
  showText = false,
  textClassName = '',
  subtextClassName = '',
  size = 'md'
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const currentSizeClass = className || sizeClasses[size];

  const logoGraphic = (
    <div className={`relative shrink-0 rounded-2xl overflow-hidden shadow-xs border border-blue-100/80 bg-white flex items-center justify-center ${currentSizeClass}`}>
      {!imageError ? (
        <img
          src={generatedLogo}
          alt="World Medical Pro"
          className="w-full h-full object-cover select-none"
          onError={() => setImageError(true)}
          referrerPolicy="no-referrer"
        />
      ) : (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full p-1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="46" fill="#f8fafc" stroke="#0284c7" strokeWidth="3" />
          <circle cx="50" cy="50" r="38" fill="url(#blue-grad)" />
          {/* Medical Cross */}
          <path
            d="M 44 26 H 56 V 44 H 74 V 56 H 56 V 74 H 44 V 56 H 26 V 44 H 44 Z"
            fill="#ffffff"
            filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.15))"
          />
          {/* ECG Wave line */}
          <path
            d="M 22 50 H 38 L 43 36 L 50 64 L 57 42 L 62 50 H 78"
            stroke="#38bdf8"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
          </defs>
        </svg>
      )}
      <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl pointer-events-none" />
    </div>
  );

  if (!showText) {
    return logoGraphic;
  }

  return (
    <div className="inline-flex items-center gap-3 select-none">
      {logoGraphic}
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-1.5">
          <span className={`font-black text-slate-900 tracking-tight leading-none ${textClassName || 'text-base sm:text-lg'}`}>
            WORLD MEDICAL <span className="text-blue-600 font-extrabold">PRO</span>
          </span>
          <span className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
            ALL-IN-ONE
          </span>
        </div>
        <span className={`text-[11px] text-slate-500 font-medium leading-tight mt-0.5 ${subtextClassName}`}>
          Logiciel Universel Toutes Spécialités Médicales
        </span>
      </div>
    </div>
  );
};
