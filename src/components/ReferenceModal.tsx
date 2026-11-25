import React, { useState } from 'react';
import { X } from 'lucide-react';
import { HKDSE_REAGENTS } from '../data/reagents';
import { AgentRole, Language } from '../types/chemistry';

interface ReferenceModalProps {
  lang: Language;
  onClose: () => void;
}

export const ReferenceModal: React.FC<ReferenceModalProps> = ({ lang, onClose }) => {
  const [filter, setFilter] = useState<'ALL' | AgentRole>('ALL');

  const items = HKDSE_REAGENTS.filter((item) => (filter === 'ALL' ? true : item.role === filter));

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ref-modal-title"
    >
      <div className="w-full sm:max-w-2xl bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[86vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <div>
            <h2 id="ref-modal-title" className="text-base sm:text-lg font-extrabold text-slate-900">
              {lang === 'zh' ? 'HKDSE 常見氧化劑及還原劑速查表' : 'HKDSE Redox Reagents Reference'}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {lang === 'zh' ? '氧化劑及還原劑核心溫習重點' : 'Core Oxidizing & Reducing Agents Summary'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={lang === 'zh' ? '關閉速查表' : 'Close reference'}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-200/80 flex items-center gap-2 shrink-0">
          {(
            [
              { id: 'ALL', zh: `全部 (${HKDSE_REAGENTS.length})`, en: `All (${HKDSE_REAGENTS.length})` },
              { id: 'OA', zh: '氧化劑', en: 'Oxidizing Agent' },
              { id: 'RA', zh: '還原劑', en: 'Reducing Agent' },
            ] as const
          ).map((tab) => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-colors whitespace-nowrap ${
                  active
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
                }`}
              >
                {lang === 'zh' ? tab.zh : tab.en}
              </button>
            );
          })}
        </div>

        {/* Reagent List */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3">
          {items.map((item) => {
            const isOA = item.role === 'OA';
            return (
              <div
                key={item.id}
                className="p-3.5 rounded-xl border border-slate-200/90 bg-white space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-sm text-slate-900">{item.name[lang]}</span>
                      <span className="font-mono-chem text-xs font-bold text-slate-500">
                        {item.formula}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">{item.observation[lang]}</p>
                  </div>
                  <span
                    className={`text-xs font-extrabold whitespace-nowrap shrink-0 ${
                      isOA ? 'text-[#EA580C]' : 'text-[#0284C7]'
                    }`}
                  >
                    {isOA ? (lang === 'zh' ? '氧化劑' : 'Oxidizing Agent') : lang === 'zh' ? '還原劑' : 'Reducing Agent'}
                  </span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-slate-100 font-mono-chem text-[11px] sm:text-xs font-bold text-slate-800 overflow-x-auto">
                  {item.halfEquation}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
