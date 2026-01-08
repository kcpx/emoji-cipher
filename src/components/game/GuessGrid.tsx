import { GuessAttempt } from '../../types';

interface GuessGridProps {
  guesses: GuessAttempt[];
  maxAttempts: number;
}

export function GuessGrid({ guesses, maxAttempts }: GuessGridProps) {
  const emptySlots = Math.max(0, maxAttempts - guesses.length);

  const getResultColor = (result: GuessAttempt['result']) => {
    switch (result) {
      case 'correct':
        return 'bg-correct text-white';
      case 'close':
        return 'bg-close text-white';
      case 'wrong':
        return 'bg-wrong text-white';
    }
  };

  const getResultEmoji = (result: GuessAttempt['result']) => {
    switch (result) {
      case 'correct':
        return '🟩';
      case 'close':
        return '🟨';
      case 'wrong':
        return '⬛';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 space-y-2">
      {/* Filled guesses */}
      {guesses.map((attempt, index) => (
        <div
          key={index}
          className={`px-4 py-3 rounded-lg font-medium text-center uppercase tracking-wide ${getResultColor(
            attempt.result
          )} animate-flipIn`}
          style={{
            animationDelay: `${index * 0.1}s`,
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">{getResultEmoji(attempt.result)}</span>
            <span className="flex-1 text-lg">{attempt.guess}</span>
          </div>
        </div>
      ))}

      {/* Empty slots */}
      {Array.from({ length: emptySlots }).map((_, index) => (
        <div
          key={`empty-${index}`}
          className="px-4 py-3 rounded-lg border-2 border-white/30 border-dashed"
        >
          <div className="h-8"></div>
        </div>
      ))}
    </div>
  );
}
