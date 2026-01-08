import { GuessAttempt } from '../../types';

/**
 * Generates shareable text from game results
 * Format:
 * 🧩 Emoji Cipher #123
 * ⬛🟨🟩
 * 🔥 3/6
 */
export function generateShareText(
  puzzleId: number,
  guesses: GuessAttempt[],
  maxAttempts: number,
  streak: number
): string {
  const emojiGrid = guesses
    .map((attempt) => {
      switch (attempt.result) {
        case 'correct':
          return '🟩';
        case 'close':
          return '🟨';
        case 'wrong':
          return '⬛';
      }
    })
    .join('');

  const attemptsText = `${guesses.length}/${maxAttempts}`;
  const streakText = streak > 0 ? `🔥 ${streak}` : '';

  return `🧩 Emoji Cipher #${puzzleId}\n${emojiGrid}\n${attemptsText}${
    streakText ? ' • ' + streakText : ''
  }`;
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);

    return successful;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * Share via Web Share API (mobile-friendly)
 */
export async function shareViaWebShare(
  text: string,
  title: string = 'Emoji Cipher'
): Promise<boolean> {
  try {
    if (navigator.share) {
      await navigator.share({
        title,
        text,
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Failed to share:', error);
    return false;
  }
}
