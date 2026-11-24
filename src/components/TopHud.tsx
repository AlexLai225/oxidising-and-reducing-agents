import React from 'react';
import { BookOpen, Heart, Infinity as InfinityIcon, Pause, Volume2, VolumeX } from 'lucide-react';
import { GameMode, Language } from '../types/chemistry';

interface TopHudProps {
  lang: Language;
  onToggleLang: () => void;
  hearts: number;
  maxHearts: number;
  mode: GameMode;
  score: number;
  streak: number;
  currentIndex: number;
  totalCards: number;
  showProgress: boolean;
  muted: boolean;
  onToggleMute: () => void;
  onOpenReference: () => void;
  onPause: () => void;
  showPauseButton: boolean;
}

export const TopHud: React.FC<TopHudProps> = ({
  lang,
  onToggleLang,
  hearts,
  maxHearts,
  mode,
  score,
  streak,
  currentIndex,
  totalCards,
  showProgress,
  muted,
  onToggleMute,
  onOpenReference,
  onPause,
  showPauseButton,
}) => {
  return (
    <header className="w-full bg-white border-b border-slate-200/80 px-2.5 sm:px-6 h-14 flex items-center justify-between gap-1.5 sm:gap-3 shrink-0 z-30">
      {/* Left Brand + HKDSE Tag (Matches Reference) */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
        <div
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-50 border border-amber-300 flex items-center justify-center shrink-0 shadow-[0_1px_0_rgba(217,119,6,0.2)]"
          aria-hidden="true"
        >
          <span className="font-extrabold text-xs sm:text-sm text-amber-700 tracking-tight">Ox</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <h1 className="font-extrabold text-[14px] sm:text-base text-slate-900 tracking-tight whitespace-nowrap">
            <span className="sm:hidden">{lang === 'zh' ? '氧化×還原' : 'OA × RA'}</span>
            <span className="hidden sm:inline">
              {lang === 'zh' ? '氧化劑 × 還原劑' : 'Oxidizing × Reducing'}
            </span>
          </h1>
          <span className="px-1.5 py-0.5 rounded bg-[#E11D48] text-white text-[9px] sm:text-[10px] font-extrabold tracking-wider shrink-0">
            HKDSE
          </span>
        </div>
      </div>

      {/* Right Utility Cluster (Hearts, Score/Progress, Lang, Book, Audio, Pause) */}
      <div className="flex items-center gap-0.5 sm:gap-1.5 shrink-0">
        {/* Live Progress & Score readout during play (Desktop / Tablet) */}
        {showProgress && (
          <div className="hidden sm:flex items-center gap-2.5 mr-1.5 text-xs font-bold text-slate-600 tabular-nums">
            <span>
              {Math.min(currentIndex + 1, totalCards)}/{totalCards}
            </span>
            <span className="text-slate-300" aria-hidden="true">
              ·
            </span>
            <span className="text-slate-900">{score} pts</span>
            {streak >= 2 && (
              <span className="text-amber-600 font-extrabold">
                {streak}x
              </span>
            )}
          </div>
        )}

        {/* Hearts / Practice Infinity */}
        {showProgress && (
          <div
            className="flex items-center gap-0.5 px-1"
            aria-label={
              mode === 'practice'
                ? lang === 'zh'
                  ? '無限練習模式'
                  : 'Unlimited practice mode'
                : lang === 'zh'
                  ? `剩餘 ${hearts} 顆心`
                  : `${hearts} hearts remaining`
            }
          >
            {mode === 'practice' ? (
              <span className="flex items-center gap-1 text-sky-600 font-bold text-xs px-1">
                <InfinityIcon className="w-4 h-4" />
              </span>
            ) : (
              Array.from({ length: maxHearts }).map((_, i) => {
                const active = i < hearts;
                return (
                  <Heart
                    key={i}
                    className={`w-3.5 h-3.5 sm:w-[18px] sm:h-[18px] transition-transform duration-200 ${
                      active
                        ? 'fill-[#EF4444] text-[#EF4444] scale-100'
                        : 'fill-slate-200 text-slate-300 scale-90'
                    }`}
                  />
                );
              })
            )}
          </div>
        )}

        {/* Language Toggle */}
        <button
          type="button"
          onClick={onToggleLang}
          aria-label={lang === 'zh' ? 'Switch to English' : '切換至繁體中文'}
          className="min-w-[36px] sm:min-w-[40px] min-h-[44px] px-1.5 sm:px-2 rounded-lg text-xs font-extrabold text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition-colors flex items-center justify-center whitespace-nowrap"
        >
          {lang === 'zh' ? 'EN' : '繁'}
        </button>

        {/* Reference Sheet */}
        <button
          type="button"
          onClick={onOpenReference}
          aria-label={lang === 'zh' ? '開啟常見試劑速查表' : 'Open HKDSE Reagent Reference'}
          className="w-9 sm:w-10 min-h-[44px] rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 transition-colors flex items-center justify-center"
        >
          <BookOpen className="w-[17px] h-[17px] sm:w-[18px] sm:h-[18px]" />
        </button>

        {/* Sound Mute Toggle */}
        <button
          type="button"
          onClick={onToggleMute}
          aria-label={
            muted
              ? lang === 'zh'
                ? '開啟音效'
                : 'Unmute sound'
              : lang === 'zh'
                ? '靜音'
                : 'Mute sound'
          }
          className="w-9 sm:w-10 min-h-[44px] rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 transition-colors flex items-center justify-center"
        >
          {muted ? (
            <VolumeX className="w-[17px] h-[17px] sm:w-[18px] sm:h-[18px]" />
          ) : (
            <Volume2 className="w-[17px] h-[17px] sm:w-[18px] sm:h-[18px]" />
          )}
        </button>

        {/* Pause Button */}
        {showPauseButton && (
          <button
            type="button"
            onClick={onPause}
            aria-label={lang === 'zh' ? '暫停遊戲' : 'Pause game'}
            className="w-9 sm:w-10 min-h-[44px] rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 transition-colors flex items-center justify-center"
          >
            <Pause className="w-[17px] h-[17px] sm:w-[18px] sm:h-[18px]" />
          </button>
        )}
      </div>
    </header>
  );
};
