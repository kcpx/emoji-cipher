import { Puzzle } from '../../types';
import { puzzleBank } from './puzzleData';

/**
 * Gets the current date in YYYY-MM-DD format (UTC)
 */
export function getCurrentDate(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

/**
 * Gets puzzle number based on date (days since epoch)
 */
export function getPuzzleNumber(date: string): number {
  const puzzleDate = new Date(date);
  const epoch = new Date('2024-01-01'); // Game start date
  const daysSinceEpoch = Math.floor(
    (puzzleDate.getTime() - epoch.getTime()) / (1000 * 60 * 60 * 24)
  );
  return Math.max(0, daysSinceEpoch);
}

/**
 * Simple seeded random number generator
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Gets the daily puzzle for a given date
 * Uses deterministic selection so all players get same puzzle
 */
export function getDailyPuzzle(date: string = getCurrentDate()): Puzzle {
  const puzzleNumber = getPuzzleNumber(date);
  const seed = hashString(date);

  // Use seeded random to select from puzzle bank
  const index = Math.floor(seededRandom(seed) * puzzleBank.length);
  const puzzle = puzzleBank[index];

  return {
    ...puzzle,
    id: puzzleNumber,
    date,
  };
}

/**
 * Simple string hash function for deterministic puzzle selection
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Get puzzle by specific ID (for testing or viewing past puzzles)
 */
export function getPuzzleById(id: number): Puzzle | null {
  // Calculate date from puzzle ID
  const epoch = new Date('2024-01-01');
  const date = new Date(epoch.getTime() + id * 24 * 60 * 60 * 1000);
  const dateStr = date.toISOString().split('T')[0];

  return getDailyPuzzle(dateStr);
}
