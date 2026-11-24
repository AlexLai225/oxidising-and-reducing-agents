/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { ActionControls } from './components/ActionControls';
import { EndScreen } from './components/EndScreen';
import { FeedbackSheet } from './components/FeedbackSheet';
import { PauseModal } from './components/PauseModal';
import { ReferenceModal } from './components/ReferenceModal';
import { SwipeCard } from './components/SwipeCard';
import { TitleScreen } from './components/TitleScreen';
import { TopHud } from './components/TopHud';
import { HKDSE_REAGENTS } from './data/reagents';
import {
  advanceAfterFeedback,
  createInitialGameState,
  evaluateSwipe,
} from './game/engine';
import { AgentRole, GameMode, GamePhase, GameState, Language } from './types/chemistry';
import { sound } from './utils/sound';

const BEST_SCORE_KEY = 'hkdse_redox_best_score_v1';

function getInitialBestScore(): number {
  try {
    const raw = localStorage.getItem(BEST_SCORE_KEY);
    return raw ? Number(raw) || 0 : 0;
  } catch {
    return 0;
  }
}

export default function App() {
  const [lang, setLang] = useState<Language>('zh');
  const [selectedMode, setSelectedMode] = useState<GameMode>('sprint');
  const [muted, setMuted] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [bestScore, setBestScore] = useState<number>(getInitialBestScore);
  const [pausedFromPhase, setPausedFromPhase] = useState<GamePhase>('playing');

  const [gameState, setGameState] = useState<GameState>(() => {
    const autoStart =
      typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).get('autostart') === '1';
    return createInitialGameState(HKDSE_REAGENTS, 'sprint', autoStart);
  });

  // Sync game state to document.body.dataset.state for predictable state inspection
  useEffect(() => {
    const mappedState =
      gameState.phase === 'feedback' ? 'playing' : gameState.phase;
    document.body.dataset.state = mappedState;
  }, [gameState.phase]);

  // Persist high score
  useEffect(() => {
    if (gameState.score > bestScore) {
      setBestScore(gameState.score);
      try {
        localStorage.setItem(BEST_SCORE_KEY, String(gameState.score));
      } catch {
        // Ignore storage errors
      }
    }
  }, [gameState.score, bestScore]);

  const handleStart = useCallback(
    (modeToUse: GameMode = selectedMode) => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      setGameState(createInitialGameState(HKDSE_REAGENTS, modeToUse, true));
    },
    [selectedMode]
  );

  const handleSwipe = useCallback((role: AgentRole) => {
    setGameState((prev) => {
      if (prev.phase !== 'playing') return prev;
      const next = evaluateSwipe(prev, role);
      if (next.lastAnswer?.correct) {
        sound.playCorrect(next.streak);
      } else {
        sound.playWrong();
      }
      return next;
    });
  }, []);

  const handleNext = useCallback(() => {
    setGameState((prev) => {
      if (prev.phase !== 'feedback') return prev;
      const next = advanceAfterFeedback(prev);
      if (next.phase === 'gameover') {
        const defeated = next.mode !== 'practice' && next.hearts <= 0;
        if (!defeated) {
          sound.playVictory();
        }
      }
      return next;
    });
  }, []);

  const handlePause = useCallback(() => {
    setGameState((prev) => {
      if (prev.phase !== 'playing' && prev.phase !== 'feedback') return prev;
      setPausedFromPhase(prev.phase);
      return { ...prev, phase: 'paused' };
    });
  }, []);

  const handleResume = useCallback(() => {
    setGameState((prev) => {
      if (prev.phase !== 'paused') return prev;
      return { ...prev, phase: pausedFromPhase };
    });
  }, [pausedFromPhase]);

  const handleBackToTitle = useCallback(() => {
    setGameState(createInitialGameState(HKDSE_REAGENTS, selectedMode, false));
  }, [selectedMode]);

  const handleToggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      sound.muted = next;
      return next;
    });
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (showReference) {
        if (e.key === 'Escape') {
          setShowReference(false);
        }
        return;
      }

      if (gameState.phase === 'title') {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleStart();
        }
        return;
      }

      if (gameState.phase === 'playing') {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          handleSwipe('OA');
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          handleSwipe('RA');
        } else if (e.key === 'Escape' || e.key.toLowerCase() === 'p') {
          e.preventDefault();
          handlePause();
        }
        return;
      }

      if (gameState.phase === 'feedback') {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNext();
        } else if (e.key === 'Escape' || e.key.toLowerCase() === 'p') {
          e.preventDefault();
          handlePause();
        }
        return;
      }

      if (gameState.phase === 'paused') {
        if (e.key === 'Escape' || e.key.toLowerCase() === 'p') {
          e.preventDefault();
          handleResume();
        }
        return;
      }

      if (gameState.phase === 'gameover') {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleStart();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    gameState.phase,
    showReference,
    handleStart,
    handleSwipe,
    handleNext,
    handlePause,
    handleResume,
  ]);

  const activeCard = gameState.deck[gameState.currentIndex];
  const nextCard = gameState.deck[gameState.currentIndex + 1];
  const isPlayingOrFeedback =
    gameState.phase === 'playing' || gameState.phase === 'feedback';

  const isFinalStep =
    gameState.phase === 'feedback' &&
    ((gameState.mode !== 'practice' && gameState.hearts <= 0) ||
      gameState.currentIndex + 1 >= gameState.deck.length);

  const progressPct =
    gameState.deck.length > 0
      ? Math.round(
          ((gameState.currentIndex + (gameState.phase === 'feedback' ? 1 : 0)) /
            gameState.deck.length) *
            100
        )
      : 0;

  return (
    <div className="min-h-[100dvh] bg-[#F5F7FA] text-slate-900 flex flex-col">
      <TopHud
        lang={lang}
        onToggleLang={() => setLang((l) => (l === 'zh' ? 'en' : 'zh'))}
        hearts={gameState.hearts}
        maxHearts={gameState.maxHearts}
        mode={gameState.mode}
        score={gameState.score}
        streak={gameState.streak}
        currentIndex={gameState.currentIndex}
        totalCards={gameState.deck.length}
        showProgress={isPlayingOrFeedback || gameState.phase === 'paused'}
        muted={muted}
        onToggleMute={handleToggleMute}
        onOpenReference={() => setShowReference(true)}
        onPause={handlePause}
        showPauseButton={isPlayingOrFeedback}
      />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-4 sm:py-6 overflow-x-hidden">
        {gameState.phase === 'title' && (
          <TitleScreen
            lang={lang}
            selectedMode={selectedMode}
            onSelectMode={setSelectedMode}
            onStart={() => handleStart(selectedMode)}
          />
        )}

        {isPlayingOrFeedback && (
          <div className="w-full max-w-[440px] mx-auto flex flex-col items-center">
            {/* Compact Mobile + Desktop Progress Strip */}
            <div className="w-full max-w-[380px] mb-3.5 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 tabular-nums sm:hidden">
                <span>
                  {lang === 'zh' ? '進度' : 'Card'} {gameState.currentIndex + 1}/
                  {gameState.deck.length}
                </span>
                <span className="text-slate-800">
                  {gameState.score} pts
                  {gameState.streak >= 2 ? ` · ${gameState.streak}x` : ''}
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-200/90 overflow-hidden">
                <div
                  className="h-full bg-slate-900 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {/* Active Swipe Card & Thumb Controls OR Instant Feedback Sheet */}
            {gameState.phase === 'playing' && activeCard && (
              <>
                <SwipeCard
                  key={activeCard.id + '-' + gameState.currentIndex}
                  card={activeCard}
                  nextCard={nextCard}
                  lang={lang}
                  onSwipe={handleSwipe}
                />
                <ActionControls lang={lang} onSelect={handleSwipe} />
              </>
            )}

            {gameState.phase === 'feedback' && gameState.lastAnswer && (
              <FeedbackSheet
                key={gameState.lastAnswer.card.id + '-' + gameState.currentIndex}
                record={gameState.lastAnswer}
                lang={lang}
                isFinalStep={isFinalStep}
                onNext={handleNext}
              />
            )}
          </div>
        )}

        {gameState.phase === 'gameover' && (
          <EndScreen
            state={gameState}
            lang={lang}
            bestScore={bestScore}
            onPlayAgain={() => handleStart(gameState.mode)}
            onBackToTitle={handleBackToTitle}
          />
        )}
      </main>

      {gameState.phase === 'paused' && (
        <PauseModal
          lang={lang}
          onResume={handleResume}
          onRestart={() => handleStart(gameState.mode)}
          onBackToTitle={handleBackToTitle}
        />
      )}

      {showReference && (
        <ReferenceModal lang={lang} onClose={() => setShowReference(false)} />
      )}
    </div>
  );
}
