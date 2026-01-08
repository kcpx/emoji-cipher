import { GuessResult, Puzzle } from '../../types';

/**
 * Validates a guess against the puzzle answer
 * @param guess - User's guess (trimmed and lowercased)
 * @param puzzle - Current puzzle
 * @returns 'correct' | 'close' | 'wrong'
 */
export function validateGuess(guess: string, puzzle: Puzzle): GuessResult {
  const normalizedGuess = normalizeString(guess);
  const normalizedAnswer = normalizeString(puzzle.answer);

  // Exact match
  if (normalizedGuess === normalizedAnswer) {
    return 'correct';
  }

  // Check synonyms
  if (puzzle.synonyms) {
    const isCloseMatch = puzzle.synonyms.some(
      (synonym) => normalizeString(synonym) === normalizedGuess
    );
    if (isCloseMatch) {
      return 'close';
    }
  }

  // Check partial match (contains answer or answer contains guess)
  if (
    normalizedAnswer.includes(normalizedGuess) ||
    normalizedGuess.includes(normalizedAnswer)
  ) {
    return 'close';
  }

  // Check for similar words (Levenshtein distance)
  if (calculateSimilarity(normalizedGuess, normalizedAnswer) > 0.7) {
    return 'close';
  }

  return 'wrong';
}

/**
 * Normalizes a string for comparison
 */
function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, '') // Remove special chars
    .replace(/\s+/g, ' '); // Normalize whitespace
}

/**
 * Calculates string similarity using Levenshtein distance
 * Returns a value between 0 and 1 (1 = identical)
 */
function calculateSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;

  if (longer.length === 0) {
    return 1.0;
  }

  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

/**
 * Calculates Levenshtein distance between two strings
 */
function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1 // deletion
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}

/**
 * Calculates the score based on number of attempts
 */
export function calculateScore(attempts: number, maxAttempts: number): number {
  if (attempts <= 0 || attempts > maxAttempts) {
    return 0;
  }
  // Score from 100 (1 attempt) to 25 (max attempts)
  return Math.max(25, 100 - (attempts - 1) * (75 / (maxAttempts - 1)));
}

/**
 * Check if the game should end
 */
export function shouldEndGame(
  attempts: number,
  maxAttempts: number,
  isCorrect: boolean
): boolean {
  return isCorrect || attempts >= maxAttempts;
}

/**
 * Calculate new streak
 */
export function calculateStreak(
  currentStreak: number,
  won: boolean,
  lastPlayedDate: string,
  currentDate: string
): number {
  // Parse dates
  const last = new Date(lastPlayedDate);
  const current = new Date(currentDate);

  // Calculate day difference
  const dayDiff = Math.floor(
    (current.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
  );

  // If played yesterday or today
  if (dayDiff <= 1 && won) {
    return currentStreak + 1;
  }

  // Streak broken
  if (dayDiff > 1) {
    return won ? 1 : 0;
  }

  // Same day, keep streak
  return currentStreak;
}
