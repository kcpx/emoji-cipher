import { useState, FormEvent } from 'react';

interface GuessInputProps {
  onSubmit: (guess: string) => void;
  disabled?: boolean;
  maxLength?: number;
}

export function GuessInput({
  onSubmit,
  disabled = false,
  maxLength = 30,
}: GuessInputProps) {
  const [guess, setGuess] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (guess.trim() && !disabled) {
      onSubmit(guess);
      setGuess('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto px-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          disabled={disabled}
          maxLength={maxLength}
          placeholder="Type your guess..."
          className="flex-1 px-4 py-3 text-lg bg-white/90 backdrop-blur rounded-xl border-2 border-transparent focus:border-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          autoFocus
        />
        <button
          type="submit"
          disabled={disabled || !guess.trim()}
          className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md disabled:active:scale-100 transition-all"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
