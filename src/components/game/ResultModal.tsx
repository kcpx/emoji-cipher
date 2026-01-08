import { useState } from 'react';
import { GuessAttempt, Puzzle } from '../../types';
import {
  generateShareText,
  copyToClipboard,
  shareViaWebShare,
} from '../../features/share/shareGenerator';

interface ResultModalProps {
  isOpen: boolean;
  isWon: boolean;
  guesses: GuessAttempt[];
  puzzle: Puzzle;
  streak: number;
  maxAttempts: number;
  onClose: () => void;
}

export function ResultModal({
  isOpen,
  isWon,
  guesses,
  puzzle,
  streak,
  maxAttempts,
}: ResultModalProps) {
  const [copyMessage, setCopyMessage] = useState('');

  if (!isOpen) return null;

  const handleShare = async () => {
    const shareText = generateShareText(puzzle.id, guesses, maxAttempts, streak);

    // Try Web Share API first (mobile-friendly)
    const shared = await shareViaWebShare(shareText);

    if (!shared) {
      // Fallback to clipboard
      const copied = await copyToClipboard(shareText);
      if (copied) {
        setCopyMessage('Copied to clipboard!');
        setTimeout(() => setCopyMessage(''), 2000);
      } else {
        setCopyMessage('Failed to copy');
        setTimeout(() => setCopyMessage(''), 2000);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-scaleIn">
        {/* Result Header */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">
            {isWon ? '🎉' : '😔'}
          </div>
          <h2 className="text-3xl font-bold mb-2">
            {isWon ? 'You Won!' : 'Game Over'}
          </h2>
          <p className="text-gray-600">
            {isWon
              ? `Solved in ${guesses.length}/${maxAttempts} tries`
              : `The answer was: ${puzzle.answer}`}
          </p>
        </div>

        {/* Stats */}
        <div className="bg-game-bg/10 rounded-xl p-4 mb-6">
          <div className="flex justify-around">
            <div className="text-center">
              <div className="text-2xl font-bold">{guesses.length}</div>
              <div className="text-sm text-gray-600">Attempts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">#{puzzle.id}</div>
              <div className="text-sm text-gray-600">Puzzle</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{streak}</div>
              <div className="text-sm text-gray-600">Streak 🔥</div>
            </div>
          </div>
        </div>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="w-full btn-primary mb-4"
        >
          Share Result
        </button>

        {copyMessage && (
          <p className="text-center text-sm text-green-600 font-medium">
            {copyMessage}
          </p>
        )}

        {/* Next Puzzle Info */}
        <div className="text-center text-sm text-gray-500 mt-4">
          Come back tomorrow for a new puzzle!
        </div>
      </div>
    </div>
  );
}
