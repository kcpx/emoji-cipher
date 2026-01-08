import { GameState, DailyStats } from '../../types';

const GAME_STATE_KEY = 'emoji-cipher-game-state';
const STATS_KEY = 'emoji-cipher-stats';

/**
 * Default game state for new players
 */
export const DEFAULT_GAME_STATE: GameState = {
  currentPuzzleId: 0,
  guesses: [],
  isComplete: false,
  isWon: false,
  lastPlayedDate: '',
  streak: 0,
  totalPlayed: 0,
  totalWins: 0,
  hasSeenTutorial: false,
};

/**
 * Load game state from localStorage
 */
export function loadGameState(): GameState {
  try {
    const saved = localStorage.getItem(GAME_STATE_KEY);
    if (!saved) {
      return { ...DEFAULT_GAME_STATE };
    }

    const parsed = JSON.parse(saved);
    return {
      ...DEFAULT_GAME_STATE,
      ...parsed,
    };
  } catch (error) {
    console.error('Error loading game state:', error);
    return { ...DEFAULT_GAME_STATE };
  }
}

/**
 * Save game state to localStorage
 */
export function saveGameState(state: GameState): void {
  try {
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving game state:', error);
  }
}

/**
 * Reset game state (keeps stats)
 */
export function resetGameState(): void {
  try {
    const currentState = loadGameState();
    const resetState: GameState = {
      ...DEFAULT_GAME_STATE,
      lastPlayedDate: currentState.lastPlayedDate,
      streak: currentState.streak,
      totalPlayed: currentState.totalPlayed,
      totalWins: currentState.totalWins,
      hasSeenTutorial: currentState.hasSeenTutorial,
    };
    saveGameState(resetState);
  } catch (error) {
    console.error('Error resetting game state:', error);
  }
}

/**
 * Save daily stats
 */
export function saveDailyStats(stats: DailyStats): void {
  try {
    const allStats = loadAllStats();
    allStats[stats.date] = stats;
    localStorage.setItem(STATS_KEY, JSON.stringify(allStats));
  } catch (error) {
    console.error('Error saving daily stats:', error);
  }
}

/**
 * Load all stats
 */
export function loadAllStats(): Record<string, DailyStats> {
  try {
    const saved = localStorage.getItem(STATS_KEY);
    if (!saved) {
      return {};
    }
    return JSON.parse(saved);
  } catch (error) {
    console.error('Error loading stats:', error);
    return {};
  }
}

/**
 * Get stats for specific date
 */
export function getStatsForDate(date: string): DailyStats | null {
  const allStats = loadAllStats();
  return allStats[date] || null;
}

/**
 * Clear all data (for testing or reset)
 */
export function clearAllData(): void {
  try {
    localStorage.removeItem(GAME_STATE_KEY);
    localStorage.removeItem(STATS_KEY);
  } catch (error) {
    console.error('Error clearing data:', error);
  }
}

/**
 * Mark tutorial as seen
 */
export function markTutorialSeen(): void {
  const state = loadGameState();
  saveGameState({ ...state, hasSeenTutorial: true });
}
