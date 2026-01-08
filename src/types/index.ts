export interface Puzzle {
  id: number;
  date: string; // YYYY-MM-DD
  emojis: string[];
  answer: string;
  synonyms?: string[];
  hint?: string;
  category?: string;
}

export type GuessResult = 'correct' | 'close' | 'wrong';

export interface GuessAttempt {
  guess: string;
  result: GuessResult;
}

export interface GameState {
  currentPuzzleId: number;
  guesses: GuessAttempt[];
  isComplete: boolean;
  isWon: boolean;
  lastPlayedDate: string;
  streak: number;
  totalPlayed: number;
  totalWins: number;
  hasSeenTutorial: boolean;
}

export interface DailyStats {
  date: string;
  puzzleId: number;
  attempts: number;
  won: boolean;
  guesses: string[];
}
