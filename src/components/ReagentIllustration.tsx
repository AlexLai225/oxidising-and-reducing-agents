import React from 'react';
import { IllustrationType } from '../types/chemistry';

interface ReagentIllustrationProps {
  type: IllustrationType;
  className?: string;
}

export const ReagentIllustration: React.FC<ReagentIllustrationProps> = ({ type, className = '' }) => {
  switch (type) {
    case 'flask_purple':
    case 'flask_orange': {
      const liquidColor = type === 'flask_purple' ? '#9333EA' : '#F97316';
      const liquidTop = type === 'flask_purple' ? '#A855F7' : '#FB923C';
      return (
        <svg viewBox="0 0 180 140" className={className} aria-hidden="true">
          <ellipse cx="90" cy="122" rx="46" ry="7" fill="rgba(15,23,42,0.22)" />
          {/* Conical Flask Body */}
          <path
            d="M74 22 H106 V46 L132 108 C135 114 130 120 123 120 H57 C50 120 45 114 48 108 L74 46 Z"
            fill="#F8FAFC"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Liquid inside */}
          <path
            d="M64 74 L116 74 L129 107 C131 112 128 117 122 117 H58 C52 117 49 112 51 107 Z"
            fill={liquidColor}
          />
          <ellipse cx="90" cy="74" rx="26" ry="4.5" fill={liquidTop} stroke="#1E293B" strokeWidth="2.5" />
          {/* Rim */}
          <rect x="70" y="16" width="40" height="8" rx="4" fill="#E2E8F0" stroke="#1E293B" strokeWidth="3" />
          {/* Glass shine */}
          <path d="M63 90 L57 106" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.65" />
          <circle cx="84" cy="96" r="3" fill="#FFFFFF" opacity="0.45" />
          <circle cx="98" cy="104" r="2" fill="#FFFFFF" opacity="0.45" />
        </svg>
      );
    }

    case 'bottle_acid': {
      return (
        <svg viewBox="0 0 180 140" className={className} aria-hidden="true">
          <ellipse cx="90" cy="122" rx="42" ry="7" fill="rgba(15,23,42,0.22)" />
          {/* Cap */}
          <rect x="77" y="14" width="26" height="14" rx="3" fill="#DC2626" stroke="#1E293B" strokeWidth="3" />
          {/* Neck */}
          <rect x="80" y="28" width="20" height="14" fill="#E2E8F0" stroke="#1E293B" strokeWidth="3" />
          {/* Bottle body */}
          <path
            d="M80 42 L60 54 C56 57 54 61 54 66 V112 C54 117 58 120 63 120 H117 C122 120 126 117 126 112 V66 C126 61 124 57 120 54 L100 42 Z"
            fill="#F8FAFC"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Clear liquid */}
          <path
            d="M57 82 H123 V111 C123 115 120 117 116 117 H64 C60 117 57 115 57 111 Z"
            fill="#BAE6FD"
            opacity="0.7"
          />
          {/* Hazard diamond label */}
          <rect x="66" y="64" width="48" height="34" rx="4" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
          <polygon points="90,69 100,81 90,93 80,81" fill="#FEF08A" stroke="#DC2626" strokeWidth="2" />
          <path d="M90 75 V83" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="90" cy="87" r="1.4" fill="#1E293B" />
        </svg>
      );
    }

    case 'gas_jar_brown':
    case 'gas_jar_green':
    case 'gas_jar_clear': {
      const gasColor =
        type === 'gas_jar_brown' ? '#B45309' : type === 'gas_jar_green' ? '#A3E635' : '#E2E8F0';
      const gasOpacity = type === 'gas_jar_clear' ? 0.45 : 0.72;
      return (
        <svg viewBox="0 0 180 140" className={className} aria-hidden="true">
          <ellipse cx="90" cy="122" rx="40" ry="7" fill="rgba(15,23,42,0.22)" />
          {/* Glass Jar */}
          <rect
            x="60"
            y="26"
            width="60"
            height="94"
            rx="10"
            fill="#F8FAFC"
            stroke="#1E293B"
            strokeWidth="3.5"
          />
          {/* Gas fill */}
          <rect x="63" y="30" width="54" height="87" rx="7" fill={gasColor} opacity={gasOpacity} />
          {/* Gas swirl / molecules */}
          <circle cx="78" cy="58" r="5" fill="#FFFFFF" opacity="0.35" />
          <circle cx="102" cy="76" r="7" fill="#FFFFFF" opacity="0.3" />
          <circle cx="82" cy="96" r="4.5" fill="#FFFFFF" opacity="0.35" />
          {/* Lid plate */}
          <rect x="54" y="18" width="72" height="9" rx="3" fill="#CBD5E1" stroke="#1E293B" strokeWidth="3" />
          {/* Highlight */}
          <path d="M69 40 V104" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.65" />
        </svg>
      );
    }

    case 'beaker_amber':
    case 'beaker_yellow':
    case 'beaker_green':
    case 'beaker_clear': {
      const fillMap: Record<string, string> = {
        beaker_amber: '#D97706',
        beaker_yellow: '#FACC15',
        beaker_green: '#6EE7B7',
        beaker_clear: '#E0F2FE',
      };
      const topMap: Record<string, string> = {
        beaker_amber: '#F59E0B',
        beaker_yellow: '#FDE047',
        beaker_green: '#A7F3D0',
        beaker_clear: '#F0F9FF',
      };
      const liq = fillMap[type];
      const top = topMap[type];
      return (
        <svg viewBox="0 0 180 140" className={className} aria-hidden="true">
          <ellipse cx="90" cy="122" rx="44" ry="7" fill="rgba(15,23,42,0.22)" />
          {/* Beaker body */}
          <path
            d="M52 26 H124 L120 112 C120 117 116 120 111 120 H65 C60 120 56 117 56 112 L52 26 Z"
            fill="#FFFFFF"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Pour spout */}
          <path d="M52 26 L46 21 H58" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" strokeLinejoin="round" />
          {/* Liquid */}
          <path
            d="M57 62 H119 L117 111 C117 115 114 117 110 117 H66 C62 117 59 115 59 111 Z"
            fill={liq}
          />
          <ellipse cx="88" cy="62" rx="31" ry="5" fill={top} stroke="#1E293B" strokeWidth="2.5" />
          {/* Graduation marks */}
          <path d="M98 78 H110 M100 90 H110 M98 102 H110" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" opacity="0.55" />
          {/* Glass shine */}
          <path d="M64 72 V106" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        </svg>
      );
    }

    case 'silver_ion': {
      return (
        <svg viewBox="0 0 180 140" className={className} aria-hidden="true">
          <ellipse cx="90" cy="122" rx="44" ry="7" fill="rgba(15,23,42,0.22)" />
          <path
            d="M54 26 H126 L122 112 C122 117 118 120 113 120 H67 C62 120 58 117 58 112 Z"
            fill="#FFFFFF"
            stroke="#1E293B"
            strokeWidth="3.5"
          />
          <path d="M59 62 H121 L119 112 C119 115 116 117 112 117 H68 C64 117 61 115 61 112 Z" fill="#E0F2FE" />
          <ellipse cx="90" cy="62" rx="31" ry="4.5" fill="#F0F9FF" stroke="#1E293B" strokeWidth="2.5" />
          {/* Ag+ ion badge */}
          <circle cx="90" cy="90" r="17" fill="#E2E8F0" stroke="#1E293B" strokeWidth="2.8" />
          <text x="90" y="95" textAnchor="middle" fontSize="14" fontWeight="800" fill="#0F172A">
            Ag⁺
          </text>
        </svg>
      );
    }

    case 'metal_block': {
      return (
        <svg viewBox="0 0 180 140" className={className} aria-hidden="true">
          <ellipse cx="90" cy="116" rx="46" ry="7" fill="rgba(15,23,42,0.25)" />
          {/* Isometric 3D metallic block matching reference image */}
          <polygon
            points="90,26 130,44 130,90 112,110 68,110 50,90 50,44"
            fill="#CBD5E1"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Top face */}
          <polygon points="90,26 130,44 110,58 70,58 50,44" fill="#F1F5F9" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Right darker facet */}
          <polygon points="110,58 130,44 130,90 112,110 95,110 95,58" fill="#94A3B8" stroke="#1E293B" strokeWidth="2.2" strokeLinejoin="round" />
          {/* Specular sheen */}
          <polygon points="78,34 108,42 96,50 70,44" fill="#FFFFFF" opacity="0.7" />
        </svg>
      );
    }

    case 'coke_solid': {
      return (
        <svg viewBox="0 0 180 140" className={className} aria-hidden="true">
          <ellipse cx="90" cy="116" rx="48" ry="7" fill="rgba(15,23,42,0.3)" />
          {/* Carbon / Coke chunk */}
          <polygon
            points="64,42 98,30 126,52 132,90 104,110 62,108 48,78"
            fill="#334155"
            stroke="#0F172A"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <polygon points="64,42 98,30 108,56 76,66" fill="#475569" stroke="#0F172A" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="108,56 126,52 132,90 104,110 96,80" fill="#1E293B" stroke="#0F172A" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M72 48 L92 40" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
        </svg>
      );
    }
  }
};
