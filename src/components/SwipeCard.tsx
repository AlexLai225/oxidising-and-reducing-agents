import React, { useRef, useState } from 'react';
import {
  QUESTION_FLICK_MIN_DISTANCE,
  QUESTION_SWIPE_DISTANCE,
  resolveHorizontalSwipe,
} from '../game/swipe';
import { AgentRole, Language, ReagentCard } from '../types/chemistry';
import { ReagentIllustration } from './ReagentIllustration';

interface SwipeCardProps {
  card: ReagentCard;
  nextCard?: ReagentCard;
  lang: Language;
  onSwipe: (role: AgentRole) => void;
  disabled?: boolean;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({
  card,
  nextCard,
  lang,
  onSwipe,
  disabled = false,
}) => {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [exitDirection, setExitDirection] = useState<AgentRole | null>(null);
  const startPosRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const pointerIdRef = useRef<number | null>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || exitDirection) return;
    pointerIdRef.current = e.pointerId;
    e.currentTarget.setPointerCapture(e.pointerId);
    startPosRef.current = { x: e.clientX, y: e.clientY, time: performance.now() };
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !startPosRef.current || pointerIdRef.current !== e.pointerId) return;
    const dx = e.clientX - startPosRef.current.x;
    const dy = (e.clientY - startPosRef.current.y) * 0.2;
    setDragOffset({ x: dx, y: dy });
  };

  const finishDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || pointerIdRef.current !== e.pointerId) return;
    const start = startPosRef.current;
    setIsDragging(false);
    startPosRef.current = null;
    pointerIdRef.current = null;

    const dx = start ? e.clientX - start.x : dragOffset.x;
    const elapsed = start ? Math.max(16, performance.now() - start.time) : 300;
    const velocityX = dx / elapsed;

    const decision = resolveHorizontalSwipe(
      dx,
      velocityX,
      QUESTION_SWIPE_DISTANCE,
      QUESTION_FLICK_MIN_DISTANCE
    );

    if (decision === 'left') {
      triggerExit('OA');
    } else if (decision === 'right') {
      triggerExit('RA');
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const triggerExit = (role: AgentRole) => {
    setExitDirection(role);
    setTimeout(() => {
      onSwipe(role);
    }, 150);
  };

  const dragRatio = Math.min(1, Math.abs(dragOffset.x) / QUESTION_SWIPE_DISTANCE);
  const draggingLeft = dragOffset.x < -12;
  const draggingRight = dragOffset.x > 12;

  const translateX = exitDirection
    ? exitDirection === 'OA'
      ? -420
      : 420
    : dragOffset.x;
  const rotateDeg = exitDirection
    ? exitDirection === 'OA'
      ? -18
      : 18
    : dragOffset.x * 0.055;
  const cardOpacity = exitDirection ? 0 : 1;

  return (
    <div className="relative w-full max-w-[380px] mx-auto select-none">
      {/* Subtle Stacked Next Card Preview Behind Active Card */}
      {nextCard && (
        <div
          className="absolute inset-0 translate-y-2.5 scale-[0.96] bg-white/85 rounded-[20px] border border-slate-200/80 shadow-sm pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Active Draggable Card */}
      <div
        data-testid="active-reagent-card"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        style={{
          transform: `translate3d(${translateX}px, ${dragOffset.y}px, 0) rotate(${rotateDeg}deg)`,
          opacity: cardOpacity,
          transition: isDragging
            ? 'none'
            : 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1), opacity 150ms ease-out',
          touchAction: 'none',
        }}
        className="relative bg-white rounded-[20px] border border-slate-200/90 shadow-[0_14px_34px_-10px_rgba(15,23,42,0.12)] overflow-hidden cursor-grab active:cursor-grabbing"
      >
        {/* Top Colored Illustration Area */}
        <div
          className="relative h-44 sm:h-48 w-full flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: card.bannerBg }}
        >
          <ReagentIllustration type={card.illustration} className="w-40 h-32 sm:w-44 sm:h-36 drop-shadow-sm" />

          {/* Live Swipe Stamp Overlay - Left (OA) */}
          {draggingLeft && (
            <div
              style={{ opacity: Math.min(1, dragRatio * 1.2) }}
              className="absolute top-4 right-4 px-3 py-1.5 rounded-xl border-[3px] border-[#F97316] bg-white/95 text-[#EA580C] font-extrabold text-sm tracking-wide shadow-md rotate-[8deg]"
            >
              ← {lang === 'zh' ? '氧化劑 OA' : 'OXIDIZING (OA)'}
            </div>
          )}

          {/* Live Swipe Stamp Overlay - Right (RA) */}
          {draggingRight && (
            <div
              style={{ opacity: Math.min(1, dragRatio * 1.2) }}
              className="absolute top-4 left-4 px-3 py-1.5 rounded-xl border-[3px] border-[#0EA5E9] bg-white/95 text-[#0284C7] font-extrabold text-sm tracking-wide shadow-md rotate-[-8deg]"
            >
              {lang === 'zh' ? '還原劑 RA' : 'REDUCING (RA)'} →
            </div>
          )}
        </div>

        {/* Card Content Body */}
        <div className="px-5 pt-4 pb-4 sm:px-6 sm:pt-5 sm:pb-5">
          {/* Reagent Name & Formula Row */}
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {card.name[lang]}
            </h2>
            <span className="font-mono-chem text-xs sm:text-sm font-bold text-slate-500 whitespace-nowrap shrink-0">
              {card.formula}
            </span>
          </div>

          {/* 1-Line Clue */}
          <p className="mt-2 text-sm text-slate-600 leading-relaxed min-h-[40px]">
            {card.clue[lang]}
          </p>

          {/* Hairline Divider */}
          <div className="my-3.5 border-t border-slate-100" />

          {/* Question Prompt Row (No Table Numbers) */}
          <p className="text-sm sm:text-[15px] font-bold text-slate-900">
            {lang === 'zh' ? '屬於氧化劑還是還原劑？' : 'Oxidizing or Reducing Agent?'}
          </p>

          {/* Subtle Drag Handle + Instruction */}
          <div className="mt-4 flex flex-col items-center gap-1.5">
            <div className="w-16 h-1 rounded-full bg-slate-300/80" aria-hidden="true" />
            <p className="text-[11px] font-medium text-slate-400 text-center">
              {lang === 'zh'
                ? '輕掃向左：氧化劑 · 向右：還原劑 · 或點擊下方按鈕'
                : 'Swipe left for OA · Swipe right for RA · Or tap below'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
