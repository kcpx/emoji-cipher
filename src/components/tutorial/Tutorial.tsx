import { useState } from 'react';

interface TutorialProps {
  onComplete: () => void;
}

export function Tutorial({ onComplete }: TutorialProps) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: 'Welcome to\nEmoji Game',
      description: 'Solve the puzzle by completing words and phrases with emoji.',
      example: (
        <div className="bg-white rounded-2xl p-6 mt-8">
          <div className="text-2xl font-bold tracking-wider mb-4">
            D I S A P ____
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span>Drag the emoji onto the blanks.</span>
            <div className="flex items-center gap-2">
              <span className="text-xl">👉</span>
              <span className="text-3xl">🍐</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Emoji can have\ndifferent meanings',
      description: 'Consider definitions and associations while interpreting emoji.',
      example: (
        <div className="space-y-4 mt-8">
          <div className="bg-black text-white rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🍐</span>
              <div>
                <div className="font-bold text-lg">DISAP<span className="text-game-yellow">PEAR</span></div>
                <div className="text-xs text-gray-400 mt-1">Cause confusion ... 👁️</div>
              </div>
            </div>
          </div>
          <div className="bg-black text-white rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🍇</span>
              <div>
                <div className="font-bold text-lg"><span className="text-game-yellow">FRUIT</span>FUL</div>
                <div className="text-xs text-gray-400 mt-1">People ... 👁️</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const currentStep = steps[step];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-game-bg flex flex-col items-center justify-center p-6 z-50">
      {/* Close button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-gray-900 hover:bg-white/20 rounded-full transition-all"
      >
        ✕
      </button>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-md w-full">
        <h1 className="text-4xl font-bold text-center whitespace-pre-line mb-4">
          {currentStep.title}
        </h1>
        <p className="text-center text-gray-900/80 mb-2">
          {currentStep.description}
        </p>

        {currentStep.example}
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mb-6">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === step
                ? 'w-8 bg-gray-900'
                : 'w-2 bg-gray-900/30'
            }`}
          />
        ))}
      </div>

      {/* Buttons */}
      <div className="w-full max-w-md space-y-3">
        <button onClick={handleNext} className="w-full btn-primary">
          {step < steps.length - 1 ? 'Next' : 'Start Playing'}
        </button>
        <button onClick={handleSkip} className="w-full btn-secondary">
          Skip Tutorial
        </button>
      </div>
    </div>
  );
}
