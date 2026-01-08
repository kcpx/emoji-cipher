import { useEffect } from 'react';
import { useGameState } from './hooks/useGameState';
import { EmojiPrompt } from './components/game/EmojiPrompt';
import { GuessInput } from './components/game/GuessInput';
import { GuessGrid } from './components/game/GuessGrid';
import { ResultModal } from './components/game/ResultModal';
import { Tutorial } from './components/tutorial/Tutorial';

const MAX_ATTEMPTS = 6;

function App() {
  const {
    currentPuzzle,
    guesses,
    isComplete,
    isWon,
    streak,
    hasSeenTutorial,
    isLoading,
    initializeGame,
    submitGuess,
    markTutorialSeen,
  } = useGameState();

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl">Loading...</div>
      </div>
    );
  }

  if (!hasSeenTutorial) {
    return <Tutorial onComplete={markTutorialSeen} />;
  }

  if (!currentPuzzle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">😕</div>
          <div className="text-xl">No puzzle available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-6 px-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            🧩 Emoji Cipher
          </h1>
          <div className="text-right">
            <div className="text-sm text-gray-900/60">Puzzle</div>
            <div className="font-bold">#{currentPuzzle.id}</div>
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-8">
        <div className="w-full max-w-2xl">
          {/* Emoji Prompt */}
          <EmojiPrompt emojis={currentPuzzle.emojis} />

          {/* Guess Grid */}
          <GuessGrid guesses={guesses} maxAttempts={MAX_ATTEMPTS} />

          {/* Input */}
          <div className="mt-8">
            <GuessInput
              onSubmit={submitGuess}
              disabled={isComplete}
            />
          </div>

          {/* Stats Bar */}
          <div className="mt-8 text-center space-y-2">
            <div className="text-sm text-gray-900/60">
              {isComplete
                ? isWon
                  ? '🎉 Great job!'
                  : `The answer was: ${currentPuzzle.answer}`
                : `${guesses.length}/${MAX_ATTEMPTS} guesses`}
            </div>
            {streak > 0 && (
              <div className="text-sm font-semibold">
                🔥 {streak} day streak
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Result Modal */}
      <ResultModal
        isOpen={isComplete}
        isWon={isWon}
        guesses={guesses}
        puzzle={currentPuzzle}
        streak={streak}
        maxAttempts={MAX_ATTEMPTS}
        onClose={() => {}}
      />

      {/* Footer */}
      <footer className="py-4 text-center text-sm text-gray-900/60">
        Come back daily for new puzzles!
      </footer>
    </div>
  );
}

export default App;
