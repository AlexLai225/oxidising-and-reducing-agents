import React from 'react';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';
import { GameMode, Language } from '../types/chemistry';

interface TitleScreenProps {
  lang: Language;
  selectedMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  onStart: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  lang,
  selectedMode,
  onSelectMode,
  onStart,
}) => {
  const modes: { id: GameMode; titleZh: string; titleEn: string; descZh: string; descEn: string }[] = [
    {
      id: 'sprint',
      titleZh: '10 題速戰',
      titleEn: '10-Card Sprint',
      descZh: '3 顆心 · 平衡題組',
      descEn: '3 Hearts · Balanced mix',
    },
    {
      id: 'full',
      titleZh: '全套 18 題',
      titleEn: 'Full 18-Card Deck',
      descZh: '3 顆心 · 全部常見試劑',
      descEn: '3 Hearts · All HKDSE reagents',
    },
    {
      id: 'practice',
      titleZh: '無限溫習',
      titleEn: 'Practice Mode',
      descZh: '不扣心 · 逐題看詳解',
      descEn: 'No lives lost · Study mode',
    },
  ];

  return (
    <div className="w-full max-w-[440px] mx-auto px-4 py-4 flex flex-col items-center justify-center">
      <div className="w-full bg-white rounded-[24px] border border-slate-200/90 shadow-[0_16px_40px_-14px_rgba(15,23,42,0.12)] overflow-hidden">
        {/* Hero Chemistry Banner */}
        <div className="bg-[#4F6D8A] px-6 py-7 flex flex-col items-center text-center text-white relative">
          {/* Custom SVG Chemistry Crest Emblem */}
          <svg viewBox="0 0 120 76" className="w-28 h-[72px] mb-3" aria-hidden="true">
            <ellipse cx="60" cy="68" rx="44" ry="5.5" fill="rgba(15,23,42,0.28)" />
            {/* Left Orange Flask (OA) */}
            <path
              d="M32 14 H44 V26 L56 58 C57.5 62 54.5 65 50.5 65 H25.5 C21.5 65 18.5 62 20 58 L32 26 Z"
              fill="#FFF7ED"
              stroke="#1E293B"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
            <path d="M25.5 44 H50.5 L54.5 58 C55.5 61 53.5 63 50 63 H26 C22.5 63 20.5 61 21.5 58 Z" fill="#F97316" />
            {/* Right Sky-Blue Flask (RA) */}
            <path
              d="M76 14 H88 V26 L100 58 C101.5 62 98.5 65 94.5 65 H69.5 C65.5 65 62.5 62 64 58 L76 26 Z"
              fill="#F0F9FF"
              stroke="#1E293B"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
            <path d="M69.5 44 H94.5 L98.5 58 C99.5 61 97.5 63 94 63 H70 C66.5 63 64.5 61 65.5 58 Z" fill="#0EA5E9" />
            {/* Electron Transfer Arc */}
            <path
              d="M72 22 C65 10 55 10 48 22"
              fill="none"
              stroke="#FDE047"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <polygon points="45,21 52,25 46,27" fill="#FDE047" />
          </svg>

          <h2 className="text-2xl font-extrabold tracking-tight">
            {lang === 'zh' ? '常見氧化劑與還原劑' : 'Oxidizing & Reducing Agents'}
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-100/90 font-medium max-w-xs">
            {lang === 'zh'
              ? 'HKDSE 化學氧化還原 · 滑動辨識試劑並即時重溫顏色變化及半方程式'
              : 'HKDSE Chemistry Redox · Swipe to classify reagents with instant equations'}
          </p>
        </div>

        {/* Mode Selector & Swipe Rule */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Swipe Rule Cue */}
          <div className="grid grid-cols-2 gap-3">
            <div className="px-3 py-2.5 rounded-xl bg-orange-50/80 border border-orange-200/80 flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 text-[#EA580C] shrink-0" aria-hidden="true" />
              <div className="min-w-0">
                <p className="text-[11px] sm:text-xs font-extrabold text-[#EA580C] leading-tight">
                  {lang === 'zh' ? (
                    <>
                      <span className="block">左滑</span>
                      <span className="block whitespace-nowrap">氧化劑</span>
                    </>
                  ) : (
                    <>
                      <span className="block">Left:</span>
                      <span className="block whitespace-nowrap">Oxidizing Agent</span>
                    </>
                  )}
                </p>
                <p className="text-[11px] text-orange-800/80 truncate">
                  {lang === 'zh' ? '獲得電子 · 本身被還原' : 'Gains e⁻ · Reduced'}
                </p>
              </div>
            </div>

            <div className="px-3 py-2.5 rounded-xl bg-sky-50/80 border border-sky-200/80 flex items-center justify-end gap-2 text-right">
              <div className="min-w-0">
                <p className="text-[11px] sm:text-xs font-extrabold text-[#0284C7] leading-tight">
                  {lang === 'zh' ? (
                    <>
                      <span className="block">右滑</span>
                      <span className="block whitespace-nowrap">還原劑</span>
                    </>
                  ) : (
                    <>
                      <span className="block">Right:</span>
                      <span className="block whitespace-nowrap">Reducing Agent</span>
                    </>
                  )}
                </p>
                <p className="text-[11px] text-sky-800/80 truncate">
                  {lang === 'zh' ? '失去電子 · 本身被氧化' : 'Loses e⁻ · Oxidized'}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#0284C7] shrink-0" aria-hidden="true" />
            </div>
          </div>

          {/* Mode Tabs */}
          <div>
            <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
              {lang === 'zh' ? '選擇挑戰模式' : 'Select Game Mode'}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {modes.map((m) => {
                const active = selectedMode === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => onSelectMode(m.id)}
                    className={`px-2.5 py-2.5 rounded-xl border text-left transition-all min-h-[58px] ${
                      active
                        ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <p className="text-xs font-extrabold leading-tight">
                      {lang === 'zh' ? m.titleZh : m.titleEn}
                    </p>
                    <p className={`text-[10px] mt-1 leading-tight ${active ? 'text-slate-300' : 'text-slate-500'}`}>
                      {lang === 'zh' ? m.descZh : m.descEn}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary Start CTA */}
          <button
            type="button"
            data-start="true"
            onClick={onStart}
            className="w-full min-h-[52px] px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white font-extrabold text-base flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <Play className="w-4 h-4 fill-current" aria-hidden="true" />
            <span>{lang === 'zh' ? '開始挑戰' : 'Start Game'}</span>
          </button>

          <p className="text-center text-[11px] font-medium text-slate-400">
            {lang === 'zh'
              ? '支援手機觸控滑動 · 鍵盤 ← / → 亦可作答'
              : 'Touch swipe supported · Arrow keys ← / → also work'}
          </p>
        </div>
      </div>
    </div>
  );
};
