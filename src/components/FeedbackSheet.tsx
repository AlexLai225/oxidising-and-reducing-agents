import React, { useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  FlaskConical,
  Lightbulb,
  XCircle,
} from 'lucide-react';
import {
  detectGestureAxis,
  FEEDBACK_FLICK_MIN_DISTANCE,
  FEEDBACK_SWIPE_DISTANCE,
  GestureAxis,
  resolveHorizontalSwipe,
  SwipeDirection,
} from '../game/swipe';
import { AnswerRecord, Language } from '../types/chemistry';

interface FeedbackSheetProps {
  record: AnswerRecord;
  lang: Language;
  isFinalStep: boolean;
  onNext: () => void;
}

export const FeedbackSheet: React.FC<FeedbackSheetProps> = ({
  record,
  lang,
  isFinalStep,
  onNext,
}) => {
  const { card, correct, pointsEarned } = record;
  const isOA = card.role === 'OA';

  const [dragX, setDragX] = useState(0);
  const [isDraggingHorizontal, setIsDraggingHorizontal] = useState(false);
  const [exitDirection, setExitDirection] = useState<SwipeDirection | null>(null);

  const startRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const axisRef = useRef<GestureAxis>(null);
  const pointerIdRef = useRef<number | null>(null);

  const triggerNext = (direction: SwipeDirection) => {
    if (exitDirection) return;
    setExitDirection(direction);
    setTimeout(() => {
      onNext();
    }, 150);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (exitDirection) return;
    const target = e.target as HTMLElement | null;
    if (target?.closest('button')) return;

    pointerIdRef.current = e.pointerId;
    startRef.current = { x: e.clientX, y: e.clientY, time: performance.now() };
    axisRef.current = null;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!startRef.current || pointerIdRef.current !== e.pointerId || exitDirection) return;
    const dx = e.clientX - startRef.current.x;
    const dy = e.clientY - startRef.current.y;

    if (!axisRef.current) {
      const detected = detectGestureAxis(dx, dy);
      if (!detected) return;
      axisRef.current = detected;
      if (detected === 'horizontal') {
        e.currentTarget.setPointerCapture(e.pointerId);
        setIsDraggingHorizontal(true);
      }
    }

    if (axisRef.current === 'horizontal') {
      setDragX(dx);
    }
  };

  const finishDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== e.pointerId) return;
    const start = startRef.current;
    const lockedAxis = axisRef.current;

    startRef.current = null;
    axisRef.current = null;
    pointerIdRef.current = null;
    setIsDraggingHorizontal(false);

    if (lockedAxis !== 'horizontal' || !start) {
      setDragX(0);
      return;
    }

    const dx = e.clientX - start.x;
    const elapsed = Math.max(16, performance.now() - start.time);
    const velocityX = dx / elapsed;

    const decision = resolveHorizontalSwipe(
      dx,
      velocityX,
      FEEDBACK_SWIPE_DISTANCE,
      FEEDBACK_FLICK_MIN_DISTANCE
    );

    if (decision) {
      triggerNext(decision);
    } else {
      setDragX(0);
    }
  };

  const dragRatio = Math.min(1, Math.abs(dragX) / FEEDBACK_SWIPE_DISTANCE);
  const translateX = exitDirection ? (exitDirection === 'left' ? -420 : 420) : dragX;
  const rotateDeg = exitDirection
    ? exitDirection === 'left'
      ? -12
      : 12
    : dragX * 0.03;
  const cardOpacity = exitDirection ? 0 : 1;
  const nextLabel = isFinalStep
    ? lang === 'zh'
      ? '查看成績單'
      : 'View Results'
    : lang === 'zh'
      ? '下一題'
      : 'Next Reagent';

  return (
    <div
      data-testid="feedback-sheet"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
      style={{
        transform: `translate3d(${translateX}px, 0, 0) rotate(${rotateDeg}deg)`,
        opacity: cardOpacity,
        transition: isDraggingHorizontal
          ? 'none'
          : 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1), opacity 150ms ease-out',
        touchAction: 'pan-y',
      }}
      className="relative w-full max-w-[440px] mx-auto bg-white rounded-[20px] border border-slate-200/90 shadow-[0_16px_40px_-12px_rgba(15,23,42,0.14)] overflow-hidden select-none cursor-grab active:cursor-grabbing"
    >
      {/* Floating Swipe-to-Advance Cue Badge */}
      {Math.abs(dragX) > 14 && (
        <div
          style={{ opacity: Math.min(1, dragRatio * 1.15) }}
          className={`absolute top-3.5 z-20 px-3 py-1 rounded-xl border-2 border-slate-900 bg-slate-900 text-white font-extrabold text-xs tracking-wide shadow-md pointer-events-none flex items-center gap-1.5 ${
            dragX < 0 ? 'right-3.5' : 'left-3.5'
          }`}
        >
          {dragX < 0 ? (
            <>
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{nextLabel}</span>
            </>
          ) : (
            <>
              <span>{nextLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </>
          )}
        </div>
      )}

      {/* Top Result Header Banner */}
      <div
        className={`px-5 py-3.5 flex items-center justify-between gap-3 ${
          correct ? 'bg-emerald-50 border-b border-emerald-200/80' : 'bg-rose-50 border-b border-rose-200/80'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {correct ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
          ) : (
            <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
          )}
          <div className="min-w-0">
            <p className={`font-extrabold text-base leading-tight ${correct ? 'text-emerald-900' : 'text-rose-900'}`}>
              {correct
                ? lang === 'zh'
                  ? '答對了！'
                  : 'Correct!'
                : lang === 'zh'
                  ? '答錯了！'
                  : 'Not Quite!'}
            </p>
            <p className={`text-xs font-semibold mt-0.5 ${correct ? 'text-emerald-700' : 'text-rose-700'}`}>
              {card.name[lang]} ·{' '}
              <span className={isOA ? 'text-[#EA580C]' : 'text-[#0284C7]'}>
                {isOA
                  ? lang === 'zh'
                    ? '常見氧化劑'
                    : 'Oxidizing Agent'
                  : lang === 'zh'
                    ? '常見還原劑'
                    : 'Reducing Agent'}
              </span>
            </p>
          </div>
        </div>

        {correct && (
          <span className="font-mono-chem text-sm font-extrabold text-emerald-700 tabular-nums shrink-0">
            +{pointsEarned}
          </span>
        )}
      </div>

      {/* Chemical Explanation Body */}
      <div className="px-5 py-4 space-y-3.5 max-h-[54vh] overflow-y-auto">
        {/* Observation & Colour Swatch */}
        <section>
          <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 mb-2">
            <h3 className="flex items-center gap-1.5 text-xs font-extrabold text-slate-500 uppercase tracking-wider">
              <Eye className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{lang === 'zh' ? '主要反應與顏色變化' : 'Observation & Colour Change'}</span>
            </h3>
            <span className="font-mono-chem text-[11px] font-bold text-slate-500 whitespace-nowrap">
              {card.speciesChange}
            </span>
          </div>

          {/* Visual Colour Transition Swatches */}
          <div className="flex items-center justify-between gap-2 py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200/70 mb-2">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="w-5 h-5 rounded-full shrink-0 shadow-inner"
                style={{
                  backgroundColor: card.beforeColor,
                  border: `1.5px solid ${card.beforeColorBorder ?? 'rgba(15,23,42,0.18)'}`,
                }}
                aria-hidden="true"
              />
              <span className="text-[11px] sm:text-xs font-bold text-slate-700 leading-tight">
                {card.beforeLabel[lang]}
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
            <div className="flex items-center gap-2 min-w-0 justify-end text-right">
              <span
                className="w-5 h-5 rounded-full shrink-0 shadow-inner"
                style={{
                  backgroundColor: card.afterColor,
                  border: `1.5px solid ${card.afterColorBorder ?? 'rgba(15,23,42,0.18)'}`,
                }}
                aria-hidden="true"
              />
              <span className="text-[11px] sm:text-xs font-bold text-slate-900 leading-tight">
                {card.afterLabel[lang]}
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed">{card.observation[lang]}</p>
        </section>

        <div className="border-t border-slate-100" />

        {/* Half Equation & Oxidation State */}
        <section>
          <h3 className="flex items-center gap-1.5 text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-1.5">
            <FlaskConical className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{lang === 'zh' ? '半方程式與氧化數變化' : 'Half Equation & Oxidation No.'}</span>
          </h3>
          <div className="px-3.5 py-2.5 rounded-xl bg-slate-900 text-white font-mono-chem text-xs sm:text-[13px] font-bold leading-relaxed overflow-x-auto">
            {card.halfEquation}
          </div>
          <p className="mt-1.5 text-xs font-bold text-slate-600">{card.oxidationChange[lang]}</p>
          <p className="mt-1 text-sm text-slate-600 leading-relaxed">{card.explanation[lang]}</p>
        </section>

        {/* HKDSE Exam Tip (No Past Paper References) */}
        {card.examTip && (
          <section className="pt-1">
            <div className="px-3.5 py-2.5 rounded-xl bg-amber-50/90 border border-amber-200/80 text-amber-950">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-xs leading-relaxed font-semibold">{card.examTip[lang]}</p>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Bottom Sticky Thumb Action + Swipe Hint */}
      <div className="px-5 pt-3 pb-3.5 bg-slate-50/80 border-t border-slate-100 space-y-2">
        <button
          type="button"
          onClick={() => triggerNext('left')}
          className="w-full min-h-[48px] px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-sm"
        >
          <span>{nextLabel}</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
        <p className="text-center text-[11px] font-medium text-slate-400">
          {lang === 'zh'
            ? '← 左右滑動卡片亦可直接前往下一題 →'
            : '← Swipe left or right on card to continue →'}
        </p>
      </div>
    </div>
  );
};
