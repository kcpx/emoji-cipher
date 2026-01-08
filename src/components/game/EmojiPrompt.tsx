interface EmojiPromptProps {
  emojis: string[];
}

export function EmojiPrompt({ emojis }: EmojiPromptProps) {
  return (
    <div className="flex justify-center items-center gap-3 py-8">
      {emojis.map((emoji, index) => (
        <div
          key={index}
          className="text-6xl md:text-7xl animate-bounce"
          style={{
            animationDelay: `${index * 0.1}s`,
            animationDuration: '1s',
          }}
        >
          {emoji}
        </div>
      ))}
    </div>
  );
}
