import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AgentRole, Language } from '../types/chemistry';

interface ActionControlsProps {
  lang: Language;
  onSelect: (role: AgentRole) => void;
  disabled?: boolean;
}

export const ActionControls: React.FC<ActionControlsProps> = ({
  lang,
  onSelect,
  disabled = false,
}) => {
  return (
    <div className="w-full max-w-[380px] mx-auto pt-4 pb-2 flex items-center justify-center gap-12 sm:gap-16">
      {/* Left Button: Oxidizing Agent (OA) - Warm Orange Ring matching Reference */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => onSelect('OA')}
        aria-label={lang === 'zh' ? '向左選擇：氧化劑' : 'Choose Oxidizing Agent'}
        className="group flex flex-col items-center gap-2 focus-visible:outline-none disabled:opacity-50"
      >
        <span className="w-[70px] h-[70px] sm:w-[74px] sm:h-[74px] rounded-full bg-white border-[3.5px] border-[#F97316] shadow-[0_6px_16px_rgba(249,115,22,0.16)] flex items-center justify-center transition-transform duration-150 group-hover:scale-105 group-active:scale-95 group-focus-visible:ring-4 group-focus-visible:ring-orange-200">
          {/* Beaker + Electron Gain Icon */}
          <svg viewBox="0 0 36 36" className="w-9 h-9" aria-hidden="true">
            <path
              d="M11 8 H25 L23 26 C23 27.5 21.8 28.5 20.3 28.5 H15.7 C14.2 28.5 13 27.5 13 26 Z"
              fill="#FFF7ED"
              stroke="#1E293B"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <path d="M12.3 18 H23.7 L22.8 26 C22.8 27 22 27.5 21 27.5 H15 C14 27.5 13.2 27 13.2 26 Z" fill="#FB923C" />
            <circle cx="16" cy="13" r="1.6" fill="#EA580C" />
            <circle cx="20.5" cy="11.5" r="1.3" fill="#EA580C" />
          </svg>
        </span>
        <span className="flex items-center gap-1 text-[15px] font-extrabold text-[#EA580C] whitespace-nowrap">
          <ArrowLeft className="w-3.5 h-3.5 stroke-[2.75]" aria-hidden="true" />
          <span>{lang === 'zh' ? '氧化劑' : 'Oxidizing Agent'}</span>
        </span>
      </button>

      {/* Right Button: Reducing Agent (RA) - Sky Blue Ring matching Reference */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => onSelect('RA')}
        aria-label={lang === 'zh' ? '向右選擇：還原劑' : 'Choose Reducing Agent'}
        className="group flex flex-col items-center gap-2 focus-visible:outline-none disabled:opacity-50"
      >
        <span className="w-[70px] h-[70px] sm:w-[74px] sm:h-[74px] rounded-full bg-white border-[3.5px] border-[#0EA5E9] shadow-[0_6px_16px_rgba(14,165,233,0.16)] flex items-center justify-center transition-transform duration-150 group-hover:scale-105 group-active:scale-95 group-focus-visible:ring-4 group-focus-visible:ring-sky-200">
          {/* Beaker + Electron Release Icon */}
          <svg viewBox="0 0 36 36" className="w-9 h-9" aria-hidden="true">
            <path
              d="M11 8 H25 L23 26 C23 27.5 21.8 28.5 20.3 28.5 H15.7 C14.2 28.5 13 27.5 13 26 Z"
              fill="#F0F9FF"
              stroke="#1E293B"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <path d="M12.3 19 H23.7 L22.8 26 C22.8 27 22 27.5 21 27.5 H15 C14 27.5 13.2 27 13.2 26 Z" fill="#38BDF8" />
            <path d="M18 15 V9 M15.5 11.5 L18 9 L20.5 11.5" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="flex items-center gap-1 text-[15px] font-extrabold text-[#0284C7] whitespace-nowrap">
          <span>{lang === 'zh' ? '還原劑' : 'Reducing Agent'}</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.75]" aria-hidden="true" />
        </span>
      </button>
    </div>
  );
};
