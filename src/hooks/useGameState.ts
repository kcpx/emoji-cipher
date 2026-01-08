import { create } from 'zustand';
import { GameState, GuessAttempt, Puzzle } from '../types';
import {
  loadGameState,
  saveGameState,
  saveDailyStats,
  markTutorialSeen as markTutorialSeenStorage,
} from '../features/storage/gameStorage';
import {
  validateGuess,
  shouldEndGame,
  calculateStreak,
} from '../features/game/gameEngine';
import { getDailyPuzzle, getCurrentDate } from '../features/puzzles/generator';

const MAX_ATTEMPTS = 6;

interface GameStore extends GameState {
  currentPuzzle: Puzzle | null;
  isLoading: boolean;

  // Actions
  initializeGame: () => void;
  submitGuess: (guess: string) => void;
  resetForNewDay: () => void;
  markTutorialSeen: () => void;
}

export const useGameState = create<GameStore>((set, get) => ({
  // Initial state
  ...loadGameState(),
  currentPuzzle: null,
  isLoading: true,

  // Initialize game - load puzzle and check if new day
  initializeGame: () => {
    const todaysPuzzle = getDailyPuzzle();
    const state = get();
    const today = getCurrentDate();

    // Check if it's a new day
    if (state.lastPlayedDate !== today) {
      // New day - reset game but keep stats
      const newStreak =
        state.isWon && state.lastPlayedDate
          ? calculateStreak(state.streak, true, state.lastPlayedDate, today)
          : 0;

      const newState: GameState = {
        currentPuzzleId: todaysPuzzle.id,
        guesses: [],
        isComplete: false,
        isWon: false,
        lastPlayedDate: today,
        streak: newStreak,
        totalPlayed: state.totalPlayed,
        totalWins: state.totalWins,
        hasSeenTutorial: state.hasSeenTutorial,
      };

      saveGameState(newState);
      set({
        ...newState,
        currentPuzzle: todaysPuzzle,
        isLoading: false,
      });
    } else {
      // Same day - load existing progress
      set({
        currentPuzzle: todaysPuzzle,
        isLoading: false,
      });
    }
  },

  // Submit a guess
  submitGuess: (guessText: string) => {
    const state = get();

    if (!state.currentPuzzle || state.isComplete) {
      return;
    }

    const trimmedGuess = guessText.trim();
    if (!trimmedGuess) {
      return;
    }

    // Validate the guess
    const result = validateGuess(trimmedGuess, state.currentPuzzle);

    const newAttempt: GuessAttempt = {
      guess: trimmedGuess,
      result,
    };

    const newGuesses = [...state.guesses, newAttempt];
    const isCorrect = result === 'correct';
    const gameEnded = shouldEndGame(newGuesses.length, MAX_ATTEMPTS, isCorrect);

    // Update state
    const newState: GameState = {
      ...state,
      guesses: newGuesses,
      isComplete: gameEnded,
      isWon: isCorrect,
      totalPlayed: gameEnded ? state.totalPlayed + 1 : state.totalPlayed,
      totalWins: isCorrect ? state.totalWins + 1 : state.totalWins,
      streak: gameEnded
        ? calculateStreak(
            state.streak,
            isCorrect,
            state.lastPlayedDate,
            getCurrentDate()
          )
        : state.streak,
    };

    // Save to localStorage
    saveGameState(newState);

    // Save daily stats if game ended
    if (gameEnded) {
      saveDailyStats({
        date: getCurrentDate(),
        puzzleId: state.currentPuzzleId,
        attempts: newGuesses.length,
        won: isCorrect,
        guesses: newGuesses.map((g) => g.guess),
      });
    }

    set(newState);
  },

  // Reset for a new day (manual trigger)
  resetForNewDay: () => {
    get().initializeGame();
  },

  // Mark tutorial as seen
  markTutorialSeen: () => {
    markTutorialSeenStorage();
    set({ hasSeenTutorial: true });
  },
}));
