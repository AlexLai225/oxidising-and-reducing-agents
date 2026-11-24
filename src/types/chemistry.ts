export type AgentRole = 'OA' | 'RA';

export type Language = 'zh' | 'en';

export type GameMode = 'sprint' | 'full' | 'practice';

export type GamePhase = 'title' | 'playing' | 'feedback' | 'paused' | 'gameover';

export type IllustrationType =
  | 'flask_purple'
  | 'flask_orange'
  | 'bottle_acid'
  | 'gas_jar_brown'
  | 'gas_jar_green'
  | 'gas_jar_clear'
  | 'beaker_amber'
  | 'beaker_yellow'
  | 'beaker_green'
  | 'beaker_clear'
  | 'metal_block'
  | 'coke_solid'
  | 'silver_ion';

export interface BilingualText {
  zh: string;
  en: string;
}

export interface ReagentCard {
  id: string;
  name: BilingualText;
  formula: string;
  category: BilingualText;
  clue: BilingualText;
  role: AgentRole;
  bannerBg: string;
  illustration: IllustrationType;
  beforeColor: string;
  beforeColorBorder?: string;
  beforeLabel: BilingualText;
  afterColor: string;
  afterColorBorder?: string;
  afterLabel: BilingualText;
  speciesChange: string;
  observation: BilingualText;
  halfEquation: string;
  oxidationChange: BilingualText;
  explanation: BilingualText;
  examTip?: BilingualText;
}

export interface AnswerRecord {
  card: ReagentCard;
  chosen: AgentRole;
  correct: boolean;
  pointsEarned: number;
}

export interface GameState {
  phase: GamePhase;
  mode: GameMode;
  deck: ReagentCard[];
  currentIndex: number;
  hearts: number;
  maxHearts: number;
  score: number;
  streak: number;
  bestStreak: number;
  records: AnswerRecord[];
  lastAnswer: AnswerRecord | null;
}
