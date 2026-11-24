import { AgentRole, AnswerRecord, GameMode, GameState, ReagentCard } from '../types/chemistry';

export const SPRINT_CARD_COUNT = 10;
export const DEFAULT_HEARTS = 3;
export const BASE_POINTS = 100;
export const STREAK_BONUS = 20;

export function shuffleCards(cards: ReagentCard[], rng: () => number = Math.random): ReagentCard[] {
  const copy = [...cards];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function createDeck(
  allReagents: ReagentCard[],
  mode: GameMode,
  rng: () => number = Math.random
): ReagentCard[] {
  if (mode === 'sprint') {
    const oa = shuffleCards(
      allReagents.filter((r) => r.role === 'OA'),
      rng
    ).slice(0, 5);
    const ra = shuffleCards(
      allReagents.filter((r) => r.role === 'RA'),
      rng
    ).slice(0, 5);
    return shuffleCards([...oa, ...ra], rng);
  }
  return shuffleCards(allReagents, rng);
}

export function createInitialGameState(
  allReagents: ReagentCard[],
  mode: GameMode,
  autoStart: boolean = false,
  rng: () => number = Math.random
): GameState {
  const deck = createDeck(allReagents, mode, rng);
  const maxHearts = mode === 'practice' ? 999 : DEFAULT_HEARTS;

  return {
    phase: autoStart ? 'playing' : 'title',
    mode,
    deck,
    currentIndex: 0,
    hearts: maxHearts,
    maxHearts,
    score: 0,
    streak: 0,
    bestStreak: 0,
    records: [],
    lastAnswer: null,
  };
}

export function evaluateSwipe(state: GameState, chosen: AgentRole): GameState {
  if (state.phase !== 'playing') {
    return state;
  }

  const card = state.deck[state.currentIndex];
  if (!card) {
    return { ...state, phase: 'gameover' };
  }

  const correct = card.role === chosen;
  const nextStreak = correct ? state.streak + 1 : 0;
  const pointsEarned = correct ? BASE_POINTS + state.streak * STREAK_BONUS : 0;
  const nextHearts =
    state.mode === 'practice' ? state.hearts : Math.max(0, state.hearts - (correct ? 0 : 1));

  const record: AnswerRecord = {
    card,
    chosen,
    correct,
    pointsEarned,
  };

  return {
    ...state,
    phase: 'feedback',
    hearts: nextHearts,
    score: state.score + pointsEarned,
    streak: nextStreak,
    bestStreak: Math.max(state.bestStreak, nextStreak),
    records: [...state.records, record],
    lastAnswer: record,
  };
}

export function advanceAfterFeedback(state: GameState): GameState {
  if (state.phase !== 'feedback') {
    return state;
  }

  const outOfHearts = state.mode !== 'practice' && state.hearts <= 0;
  const nextIndex = state.currentIndex + 1;
  const deckFinished = nextIndex >= state.deck.length;

  if (outOfHearts || deckFinished) {
    return {
      ...state,
      phase: 'gameover',
    };
  }

  return {
    ...state,
    phase: 'playing',
    currentIndex: nextIndex,
    lastAnswer: null,
  };
}

export function calculateAccuracy(records: AnswerRecord[]): number {
  if (records.length === 0) return 0;
  const correctCount = records.filter((r) => r.correct).length;
  return Math.round((correctCount / records.length) * 100);
}

export function getMistakes(records: AnswerRecord[]): AnswerRecord[] {
  return records.filter((r) => !r.correct);
}

export function getMasteryRank(accuracy: number, defeated: boolean): {
  grade: string;
  zh: string;
  en: string;
} {
  if (defeated) {
    return {
      grade: 'RETRY',
      zh: '再接再厲 · 溫習方程式後再戰',
      en: 'Keep Practicing · Review Half Equations',
    };
  }
  if (accuracy >= 90) {
    return {
      grade: '5**',
      zh: '氧化還原大師 · DSE 5** 水準',
      en: 'Redox Master · DSE 5** Level',
    };
  }
  if (accuracy >= 75) {
    return {
      grade: '5*',
      zh: '實驗室高手 · 概念清晰',
      en: 'Lab Specialist · Strong Command',
    };
  }
  if (accuracy >= 60) {
    return {
      grade: '4',
      zh: '穩步進階 · 多加留意顏色變化',
      en: 'Solid Progress · Watch Colour Changes',
    };
  }
  return {
    grade: '3',
    zh: '基礎達成 · 建議多加重溫常見試劑',
    en: 'Foundation · Review Common Reagents',
  };
}
