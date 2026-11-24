import React from 'react';
import { Award, Home, RotateCcw, TriangleAlert } from 'lucide-react';
import { calculateAccuracy, getMasteryRank, getMistakes } from '../game/engine';
import { GameState, Language } from '../types/chemistry';

interface EndScreenProps {
  state: GameState;
  lang: Language;
  bestScore: number;
  onPlayAgain: () => void;
  onBackToTitle: () => void;
}

export const EndScreen: React.FC<EndScreenProps> = ({
  state,
  lang,
  bestScore,
  onPlayAgain,
  onBackToTitle,
}) => {
  const accuracy = calculateAccuracy(state.records);
  const mistakes = getMistakes(state.records);
  const defeated = state.mode !== 'practice' && state.hearts <= 0;
  const rank = getMasteryRank(accuracy, defeated);

  return (
    <div className="w-full max-w-[460px] mx-auto px-4 py-4">
      <div className="bg-white rounded-[24px] border border-slate-200/90 shadow-[0_16px_40px_-14px_rgba(15,23,42,0.14)] overflow-hidden">
        {/* Top Outcome Header */}
        <div
          className={`px-6 py-6 text-center ${
            defeated ? 'bg-rose-600 text-white' : 'bg-slate-900 text-white'
          }`}
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/15 mb-3">
            {defeated ? (
              <TriangleAlert className="w-6 h-6 text-white" aria-hidden="true" />
            ) : (
              <Award className="w-6 h-6 text-amber-300" aria-hidden="true" />
            )}
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">
            {defeated
              ? lang === 'zh'
                ? '心心用完了！'
                : 'Out of Hearts!'
              : lang === 'zh'
                ? '完成挑戰！'
                : 'Round Complete!'}
          </h2>
          <p className="mt-1 text-sm font-semibold text-white/85">
            {lang === 'zh' ? rank.zh : rank.en}
          </p>
        </div>

        {/* 3 Metrics Row */}
        <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100 text-center py-4">
          <div className="px-2">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {lang === 'zh' ? '總分' : 'Score'}
            </p>
            <p className="mt-1 text-xl font-extrabold text-slate-900 tabular-nums">{state.score}</p>
            <p className="text-[10px] font-semibold text-slate-400 tabular-nums">
              {lang === 'zh' ? `最高 ${bestScore}` : `Best ${bestScore}`}
            </p>
          </div>
          <div className="px-2">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {lang === 'zh' ? '準確率' : 'Accuracy'}
            </p>
            <p className="mt-1 text-xl font-extrabold text-slate-900 tabular-nums">{accuracy}%</p>
            <p className="text-[10px] font-semibold text-slate-400 tabular-nums">
              {state.records.filter((r) => r.correct).length}/{state.records.length}
            </p>
          </div>
          <div className="px-2">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {lang === 'zh' ? '最長連勝' : 'Best Streak'}
            </p>
            <p className="mt-1 text-xl font-extrabold text-amber-600 tabular-nums">
              {state.bestStreak}x
            </p>
            <p className="text-[10px] font-semibold text-slate-400">
              {lang === 'zh' ? `等級 ${rank.grade}` : `Tier ${rank.grade}`}
            </p>
          </div>
        </div>

        {/* Mistake Review Section */}
        <div className="p-5 space-y-4">
          {mistakes.length > 0 ? (
            <div>
              <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2.5">
                {lang === 'zh'
                  ? `錯題重溫 (${mistakes.length} 項)`
                  : `Reagents to Review (${mistakes.length})`}
              </h3>
              <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1">
                {mistakes.map((m) => {
                  const isOA = m.card.role === 'OA';
                  return (
                    <div
                      key={m.card.id}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-extrabold text-xs sm:text-sm text-slate-900">
                          {m.card.name[lang]} ({m.card.formula})
                        </span>
                        <span
                          className={`text-xs font-extrabold whitespace-nowrap ${
                            isOA ? 'text-[#EA580C]' : 'text-[#0284C7]'
                          }`}
                        >
                          {isOA
                            ? lang === 'zh'
                              ? '氧化劑 OA'
                              : 'OA'
                            : lang === 'zh'
                              ? '還原劑 RA'
                              : 'RA'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{m.card.observation[lang]}</p>
                      <p className="font-mono-chem text-[11px] font-bold text-slate-800">
                        {m.card.halfEquation}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/80 text-center">
              <p className="text-sm font-extrabold text-emerald-900">
                {lang === 'zh'
                  ? '全對過關！所有氧化劑與還原劑均已掌握！'
                  : 'Flawless run! All oxidizing and reducing agents mastered!'}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2.5 pt-1">
            <button
              type="button"
              onClick={onBackToTitle}
              className="min-h-[48px] px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm flex items-center justify-center gap-1.5 transition-colors"
            >
              <Home className="w-4 h-4" aria-hidden="true" />
              <span>{lang === 'zh' ? '主頁' : 'Menu'}</span>
            </button>
            <button
              type="button"
              data-start="true"
              onClick={onPlayAgain}
              className="flex-1 min-h-[48px] px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>{lang === 'zh' ? '再玩一次' : 'Play Again'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
