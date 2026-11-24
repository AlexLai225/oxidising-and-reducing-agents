import React from 'react';
import { Home, Play, RotateCcw } from 'lucide-react';
import { Language } from '../types/chemistry';

interface PauseModalProps {
  lang: Language;
  onResume: () => void;
  onRestart: () => void;
  onBackToTitle: () => void;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  lang,
  onResume,
  onRestart,
  onBackToTitle,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pause-title"
    >
      <div className="w-full max-w-xs bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
        <div className="text-center">
          <h2 id="pause-title" className="text-xl font-extrabold text-slate-900">
            {lang === 'zh' ? '遊戲暫停' : 'Game Paused'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'zh' ? '隨時繼續或重新開始本局' : 'Resume or restart your current run'}
          </p>
        </div>

        <div className="space-y-2.5">
          <button
            type="button"
            onClick={onResume}
            className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Play className="w-4 h-4 fill-current" aria-hidden="true" />
            <span>{lang === 'zh' ? '繼續遊戲' : 'Resume'}</span>
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>{lang === 'zh' ? '重新開始' : 'Restart'}</span>
          </button>

          <button
            type="button"
            onClick={onBackToTitle}
            className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            <span>{lang === 'zh' ? '返回主頁' : 'Back to Title'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
