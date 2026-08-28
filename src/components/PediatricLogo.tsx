import React from 'react';

interface PediatricLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
}

export const PediatricLogo: React.FC<PediatricLogoProps> = ({
  className = 'w-10 h-10',
  showText = false
}) => {
  const svgContent = (
    <svg
      viewBox="0 0 200 200"
      className={showText ? 'w-10 h-10 shrink-0 block drop-shadow-xs' : `${className} shrink-0 block drop-shadow-xs`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ aspectRatio: '1 / 1' }}
    >
      {/* Outer Ring */}
      <circle cx="100" cy="100" r="94" stroke="#00bcd4" strokeWidth="7" fill="#ffffff" />
      {/* Main Cyan Circle Background */}
      <circle cx="100" cy="100" r="86" fill="#00b4c8" />
      {/* Inner Accent Ring */}
      <circle cx="100" cy="100" r="82" stroke="#ffffff" strokeWidth="4" fill="none" opacity="0.9" />

      {/* Stylized Adult Arm & Hand holding Child's Small Hand */}
      <g fill="#ffffff">
        {/* Adult Arm coming from bottom left */}
        <path
          d="M 35 155 C 45 145, 60 135, 78 122 C 92 110, 100 95, 105 75 C 108 60, 108 45, 102 32 C 98 25, 90 28, 88 36 C 85 50, 84 70, 75 90 C 68 105, 50 120, 35 130 Z"
          opacity="0.95"
        />
        {/* Adult Palm & Central Finger */}
        <path
          d="M 102 32 C 104 22, 114 20, 118 28 C 122 36, 124 55, 122 75 C 120 90, 115 105, 105 120 C 95 135, 80 150, 60 165 L 75 178 C 100 160, 120 140, 132 115 C 140 95, 142 70, 138 45 C 135 30, 128 15, 115 12 C 100 8, 90 18, 92 30 Z"
        />
        {/* Adult Index & Middle Fingers arching downward */}
        <path
          d="M 118 28 C 126 30, 138 45, 144 65 C 150 85, 155 110, 148 135 C 140 160, 125 180, 100 190 L 92 178 C 112 170, 128 150, 134 130 C 138 110, 135 90, 130 75 C 125 60, 118 45, 112 36 Z"
        />
        {/* Child's Hand grasping adult palm/finger */}
        <path
          d="M 112 115 C 116 112, 122 114, 124 118 C 126 122, 125 128, 120 132 C 115 136, 108 134, 106 130 C 104 126, 106 120, 112 115 Z"
        />
        <path
          d="M 116 128 C 121 126, 128 128, 130 133 C 132 138, 130 144, 124 147 C 118 150, 112 147, 110 142 C 108 137, 111 131, 116 128 Z"
        />
        <path
          d="M 122 142 C 128 140, 134 143, 136 148 C 138 153, 135 159, 129 161 C 123 163, 117 160, 115 155 C 113 150, 117 144, 122 142 Z"
        />
        {/* Child Arm extending downwards */}
        <path
          d="M 120 155 C 130 165, 145 178, 160 188 L 150 196 C 135 185, 120 170, 110 158 Z"
        />
      </g>

      {/* Soft Highlight Glow */}
      <circle cx="70" cy="60" r="35" fill="#ffffff" opacity="0.12" />
    </svg>
  );

  if (!showText) {
    return svgContent;
  }

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {svgContent}
      <div className="flex flex-col min-w-0">
        <span className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight truncate">
          Dr. Yassine EL QYAMI
        </span>
        <span className="text-[11px] text-teal-700 font-semibold leading-tight truncate">
          Pédiatrie & Néonatalogie · Agadir
        </span>
      </div>
    </div>
  );
};
