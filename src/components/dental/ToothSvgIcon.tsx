import React from 'react';
import { DentalToothCondition, DentalToothState, DentalToothSurface } from '../../types';

interface ToothSvgIconProps {
  toothNumber: number;
  toothState?: DentalToothState;
  isSelected?: boolean;
  isUpper?: boolean;
  onToothClick?: (toothNumber: number) => void;
  onSurfaceClick?: (toothNumber: number, surface: DentalToothSurface) => void;
  size?: 'sm' | 'md' | 'lg';
  showSurfaces?: boolean;
  showRoots?: boolean;
  showAnnotationsBadge?: boolean;
}

export const ToothSvgIcon: React.FC<ToothSvgIconProps> = ({
  toothNumber,
  toothState,
  isSelected = false,
  isUpper = true,
  onToothClick,
  onSurfaceClick,
  size = 'md',
  showSurfaces = true,
  showRoots = true,
  showAnnotationsBadge = true
}) => {
  const condition: DentalToothCondition = toothState?.condition || 'saine';
  const surfaces: DentalToothSurface[] = toothState?.surfaces || [];
  const hasNotes = !!toothState?.notes && toothState.notes.trim().length > 0;
  const pocketDepth = toothState?.periodontalPocketDepthMm || 2;
  const hasBleeding = !!toothState?.bleedingOnProbing;

  // Determine tooth type from FDI number
  const lastDigit = toothNumber % 10;
  const isMolar = lastDigit === 6 || lastDigit === 7 || lastDigit === 8 || lastDigit === 4 || lastDigit === 5 && toothNumber > 50;
  const isPremolar = (lastDigit === 4 || lastDigit === 5) && toothNumber < 50;
  const isCanine = lastDigit === 3;
  const isIncisor = lastDigit === 1 || lastDigit === 2;

  // Dimensions based on size
  const width = size === 'sm' ? 44 : size === 'lg' ? 68 : 54;
  const height = size === 'sm' ? 78 : size === 'lg' ? 116 : 94;

  // Color logic for crown and surface states
  const getSurfaceFill = (surface: DentalToothSurface): string => {
    const isSurfaceMarked = surfaces.includes(surface);
    if (!isSurfaceMarked) {
      if (condition === 'couronne') return '#fde68a'; // Amber crown
      if (condition === 'implant') return '#e9d5ff'; // Purple/titanium implant
      if (condition === 'devitalisee') return '#e0e7ff'; // Indigo endo
      if (condition === 'appareil') return '#ccfbf1'; // Teal ortho
      if (condition === 'absente' || condition === 'extraire') return '#f1f5f9';
      return '#ffffff';
    }

    // Surface is marked
    if (condition === 'carie') return '#ef4444'; // Red for caries
    if (condition === 'obturée') return '#3b82f6'; // Blue for composite
    if (condition === 'fracture') return '#dc2626';
    return '#3b82f6';
  };

  const getSurfaceStroke = (surface: DentalToothSurface): string => {
    if (surfaces.includes(surface)) {
      if (condition === 'carie') return '#b91c1c';
      return '#1d4ed8';
    }
    return '#94a3b8';
  };

  // Base crown outline color
  const getCrownBorderColor = (): string => {
    if (isSelected) return '#0d9488'; // Teal active ring
    switch (condition) {
      case 'carie': return '#ef4444';
      case 'obturée': return '#3b82f6';
      case 'couronne': return '#d97706';
      case 'implant': return '#9333ea';
      case 'devitalisee': return '#6366f1';
      case 'extraire': return '#dc2626';
      case 'absente': return '#cbd5e1';
      case 'appareil': return '#0d9488';
      case 'fracture': return '#dc2626';
      default: return '#10b981'; // Green healthy
    }
  };

  // Surface click handler
  const handleSurfaceClick = (e: React.MouseEvent, surface: DentalToothSurface) => {
    e.stopPropagation();
    if (onSurfaceClick) {
      onSurfaceClick(toothNumber, surface);
    } else if (onToothClick) {
      onToothClick(toothNumber);
    }
  };

  // Lingual / Palatal label based on upper / lower
  const lingualOrPalatalSurface: DentalToothSurface = isUpper ? 'P' : 'L';

  return (
    <div
      className={`relative inline-flex flex-col items-center justify-between transition-all duration-150 select-none cursor-pointer rounded-xl p-1 ${
        isSelected
          ? 'bg-teal-50/90 dark:bg-teal-950/60 ring-2 ring-teal-500 shadow-md scale-105 z-10'
          : 'hover:bg-slate-100/80 dark:hover:bg-slate-800/80 hover:scale-[1.02]'
      }`}
      style={{ width: `${width}px` }}
      onClick={() => onToothClick && onToothClick(toothNumber)}
      title={`Dent FDI #${toothNumber} (${condition})`}
    >
      {/* Top FDI number tag */}
      <div className="flex items-center justify-between w-full px-1">
        <span
          className={`font-mono text-[10px] font-extrabold ${
            isSelected
              ? 'text-teal-700 dark:text-teal-300'
              : 'text-slate-700 dark:text-slate-300'
          }`}
        >
          {toothNumber}
        </span>

        {/* Small badge if notes exist */}
        {showAnnotationsBadge && hasNotes && (
          <span
            className="w-2 h-2 rounded-full bg-amber-500 ring-1 ring-white"
            title={`Note clinique : ${toothState?.notes}`}
          />
        )}
      </div>

      {/* Main SVG Tooth Graphic */}
      <svg
        width={width - 8}
        height={height - 24}
        viewBox="0 0 100 150"
        className="overflow-visible my-0.5"
      >
        <defs>
          {/* Metallic gradient for implants */}
          <linearGradient id={`implant-grad-${toothNumber}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="30%" stopColor="#cbd5e1" />
            <stop offset="70%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* Gold gradient for crowns */}
          <linearGradient id={`gold-grad-${toothNumber}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
        </defs>

        {/* Group with vertical orientation based on Upper (roots on top, crown bottom) or Lower (crown top, roots bottom) */}
        <g transform={isUpper ? 'translate(0, 0)' : 'translate(0, 150) scale(1, -1)'}>
          {/* ------------------------------------------------------------- */}
          {/* 1. ROOTS DRAWING */}
          {/* ------------------------------------------------------------- */}
          {showRoots && condition !== 'absente' && condition !== 'implant' && (
            <g className="transition-all duration-200">
              {/* Molars with 2 or 3 roots */}
              {isMolar && (
                <>
                  {/* Left root */}
                  <path
                    d="M 28 65 Q 22 25 32 10 Q 38 30 42 65 Z"
                    fill={condition === 'devitalisee' ? '#fecdd3' : '#f8fafc'}
                    stroke={getCrownBorderColor()}
                    strokeWidth="2"
                  />
                  {/* Right root */}
                  <path
                    d="M 58 65 Q 62 28 68 10 Q 78 25 72 65 Z"
                    fill={condition === 'devitalisee' ? '#fecdd3' : '#f8fafc'}
                    stroke={getCrownBorderColor()}
                    strokeWidth="2"
                  />
                  {/* Center root (for upper 3-rooted molars) */}
                  {isUpper && (
                    <path
                      d="M 44 65 Q 48 35 50 15 Q 52 35 56 65 Z"
                      fill={condition === 'devitalisee' ? '#fecdd3' : '#f1f5f9'}
                      stroke={getCrownBorderColor()}
                      strokeWidth="1.5"
                    />
                  )}
                  {/* Root canal obturation lines for devitalized teeth */}
                  {condition === 'devitalisee' && (
                    <>
                      <path d="M 35 65 Q 28 30 35 15" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M 65 65 Q 70 30 65 15" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                    </>
                  )}
                </>
              )}

              {/* Premolars with 1-2 roots */}
              {isPremolar && (
                <>
                  <path
                    d="M 34 65 Q 36 25 44 12 Q 52 25 56 65 Q 62 30 66 65 Z"
                    fill={condition === 'devitalisee' ? '#fecdd3' : '#f8fafc'}
                    stroke={getCrownBorderColor()}
                    strokeWidth="2"
                  />
                  {condition === 'devitalisee' && (
                    <path d="M 50 65 Q 45 35 48 18" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                  )}
                </>
              )}

              {/* Canines (long strong single root) */}
              {isCanine && (
                <>
                  <path
                    d="M 35 65 Q 40 18 50 6 Q 60 18 65 65 Z"
                    fill={condition === 'devitalisee' ? '#fecdd3' : '#f8fafc'}
                    stroke={getCrownBorderColor()}
                    strokeWidth="2"
                  />
                  {condition === 'devitalisee' && (
                    <path d="M 50 65 Q 50 30 50 10" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                  )}
                </>
              )}

              {/* Incisors (single straight root) */}
              {isIncisor && (
                <>
                  <path
                    d="M 36 65 Q 42 22 50 10 Q 58 22 64 65 Z"
                    fill={condition === 'devitalisee' ? '#fecdd3' : '#f8fafc'}
                    stroke={getCrownBorderColor()}
                    strokeWidth="2"
                  />
                  {condition === 'devitalisee' && (
                    <path d="M 50 65 Q 50 32 50 14" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                  )}
                </>
              )}
            </g>
          )}

          {/* ------------------------------------------------------------- */}
          {/* IMPLANT TITANIUM FIXTURE (IF CONDITION IS IMPLANT) */}
          {/* ------------------------------------------------------------- */}
          {condition === 'implant' && (
            <g>
              {/* Threaded screw fixture */}
              <rect x="38" y="15" width="24" height="48" rx="4" fill={`url(#implant-grad-${toothNumber})`} stroke="#475569" strokeWidth="2" />
              {/* Threads */}
              <line x1="36" y1="23" x2="64" y2="23" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
              <line x1="36" y1="31" x2="64" y2="31" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
              <line x1="36" y1="39" x2="64" y2="39" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
              <line x1="36" y1="47" x2="64" y2="47" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
              <line x1="36" y1="55" x2="64" y2="55" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
              {/* Titanium abutment collar */}
              <polygon points="36,65 64,65 60,59 40,59" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
            </g>
          )}

          {/* ------------------------------------------------------------- */}
          {/* 2. CROWN & 5 ANATOMICAL SURFACES (OCCLUSAL, M, D, V, L/P) */}
          {/* ------------------------------------------------------------- */}
          {condition !== 'absente' ? (
            <g className="transition-all duration-150">
              {/* External Crown Shape base */}
              <rect
                x="18"
                y="65"
                width="64"
                height="68"
                rx={isMolar ? 12 : isPremolar ? 10 : isIncisor ? 8 : 10}
                fill="#f8fafc"
                stroke={getCrownBorderColor()}
                strokeWidth={isSelected ? 3 : 2}
                className="transition-colors"
              />

              {showSurfaces && (
                <g id={`surfaces-${toothNumber}`}>
                  {/* TOP SURFACE: VESTIBULAR (V) */}
                  <polygon
                    points="18,65 82,65 68,82 32,82"
                    fill={getSurfaceFill('V')}
                    stroke={getSurfaceStroke('V')}
                    strokeWidth="1.2"
                    className="hover:opacity-80 transition-colors cursor-pointer"
                    onClick={(e) => handleSurfaceClick(e, 'V')}
                  />

                  {/* BOTTOM SURFACE: LINGUAL / PALATAL (L or P) */}
                  <polygon
                    points="32,116 68,116 82,133 18,133"
                    fill={getSurfaceFill(lingualOrPalatalSurface)}
                    stroke={getSurfaceStroke(lingualOrPalatalSurface)}
                    strokeWidth="1.2"
                    className="hover:opacity-80 transition-colors cursor-pointer"
                    onClick={(e) => handleSurfaceClick(e, lingualOrPalatalSurface)}
                  />

                  {/* LEFT SURFACE: MESIAL (M) or DISTAL (D) */}
                  <polygon
                    points="18,65 32,82 32,116 18,133"
                    fill={getSurfaceFill('M')}
                    stroke={getSurfaceStroke('M')}
                    strokeWidth="1.2"
                    className="hover:opacity-80 transition-colors cursor-pointer"
                    onClick={(e) => handleSurfaceClick(e, 'M')}
                  />

                  {/* RIGHT SURFACE: DISTAL (D) or MESIAL (M) */}
                  <polygon
                    points="82,65 82,133 68,116 68,82"
                    fill={getSurfaceFill('D')}
                    stroke={getSurfaceStroke('D')}
                    strokeWidth="1.2"
                    className="hover:opacity-80 transition-colors cursor-pointer"
                    onClick={(e) => handleSurfaceClick(e, 'D')}
                  />

                  {/* CENTER SURFACE: OCCLUSAL (O) / INCISIF */}
                  <rect
                    x="32"
                    y="82"
                    width="36"
                    height="34"
                    rx="4"
                    fill={getSurfaceFill('O')}
                    stroke={getSurfaceStroke('O')}
                    strokeWidth="1.5"
                    className="hover:opacity-80 transition-colors cursor-pointer"
                    onClick={(e) => handleSurfaceClick(e, 'O')}
                  />

                  {/* Small Letter in Center if marked */}
                  {surfaces.length > 0 && (
                    <text
                      x="50"
                      y="103"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={condition === 'carie' ? '#991b1b' : '#1e3a8a'}
                      fontSize="14"
                      fontWeight="bold"
                      fontFamily="monospace"
                      pointerEvents="none"
                      transform={isUpper ? '' : 'translate(0, 206) scale(1, -1)'}
                    >
                      {surfaces.join('')}
                    </text>
                  )}
                </g>
              )}

              {/* OVERLAY: CROWN (GOLD/CERAMIC) */}
              {condition === 'couronne' && (
                <g pointerEvents="none">
                  <rect
                    x="16"
                    y="63"
                    width="68"
                    height="72"
                    rx="12"
                    fill="none"
                    stroke="#d97706"
                    strokeWidth="3"
                    strokeDasharray="4 2"
                  />
                  <circle cx="50" cy="99" r="8" fill="#f59e0b" opacity="0.6" />
                </g>
              )}

              {/* OVERLAY: ORTHO BRACKET */}
              {condition === 'appareil' && (
                <g pointerEvents="none">
                  {/* Ortho wire */}
                  <line x1="5" y1="99" x2="95" y2="99" stroke="#0d9488" strokeWidth="3" />
                  {/* Metal bracket square */}
                  <rect x="42" y="91" width="16" height="16" rx="2" fill="#0f766e" stroke="#ffffff" strokeWidth="1.5" />
                </g>
              )}

              {/* OVERLAY: FRACTURE LIGHTNING */}
              {condition === 'fracture' && (
                <path
                  d="M 50 65 L 44 85 L 56 95 L 42 120 L 52 133"
                  stroke="#dc2626"
                  strokeWidth="3.5"
                  fill="none"
                  strokeLinecap="round"
                  pointerEvents="none"
                />
              )}

              {/* OVERLAY: À EXTRAIRE (RED CROSS) */}
              {condition === 'extraire' && (
                <g pointerEvents="none">
                  <line x1="20" y1="67" x2="80" y2="131" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
                  <line x1="80" y1="67" x2="20" y2="131" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
                </g>
              )}
            </g>
          ) : (
            /* ABSENT / EXTRACTED TOOTH (GREY HATCHED X) */
            <g pointerEvents="none">
              <rect x="20" y="67" width="60" height="64" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeDasharray="3 3" />
              <line x1="24" y1="71" x2="76" y2="127" stroke="#94a3b8" strokeWidth="3" />
              <line x1="76" y1="71" x2="24" y2="127" stroke="#94a3b8" strokeWidth="3" />
              <text x="50" y="103" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">ABS</text>
            </g>
          )}
        </g>
      </svg>

      {/* Bottom Info Ribbon: Periodontal Pocket & Bleeding on Probing Indicator */}
      <div className="w-full flex items-center justify-between px-0.5 pt-0.5 mt-0.5 border-t border-slate-200 dark:border-slate-800">
        {/* Pocket depth badge */}
        <span
          className={`text-[9px] font-mono font-bold px-1 rounded ${
            pocketDepth >= 5
              ? 'bg-rose-100 text-rose-700 font-extrabold ring-1 ring-rose-400'
              : pocketDepth >= 4
              ? 'bg-amber-100 text-amber-800'
              : 'text-slate-400'
          }`}
          title={`Profondeur poche : ${pocketDepth}mm`}
        >
          {pocketDepth}mm
        </span>

        {/* Bleeding indicator dot */}
        {hasBleeding ? (
          <span
            className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"
            title="Saignement au sondage (BOP)"
          />
        ) : (
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-60" />
        )}
      </div>
    </div>
  );
};
