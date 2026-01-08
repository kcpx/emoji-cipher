# 🧩 Emoji Cipher

A daily word puzzle game where you guess words and phrases from emoji clues. Built with React, TypeScript, and Vite.

## 🎮 How to Play

1. Look at the emoji clues displayed at the top
2. Type your guess in the input field
3. Submit and see your result:
   - 🟩 **Correct** - Exact match!
   - 🟨 **Close** - Similar or synonym
   - ⬛ **Wrong** - Try again
4. You have 6 attempts to solve each daily puzzle
5. Build your streak by playing every day!

## 🚀 Features

- **Daily Puzzles**: New puzzle every day (same for all players)
- **Streak Tracking**: Build your daily streak
- **Smart Validation**: Accepts synonyms and close matches
- **Share Results**: Share your score without spoilers
- **Offline Support**: Game state saved locally
- **Mobile-Friendly**: Responsive design
- **Tutorial**: Interactive tutorial for new players

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **LocalStorage** - Data persistence

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🧩 Adding Puzzles

Edit `src/features/puzzles/puzzleData.ts` to add new puzzles:

```typescript
{
  emojis: ['🍕', '🇮🇹'],
  answer: 'pizza',
  synonyms: ['italian pizza', 'pie'],
  category: 'Food',
}
```

## 📁 Project Structure

```
src/
├── components/       # React components
│   ├── game/        # Game UI components
│   └── tutorial/    # Tutorial flow
├── features/        # Feature modules
│   ├── game/        # Game engine & validation
│   ├── puzzles/     # Puzzle data & generation
│   ├── storage/     # LocalStorage wrapper
│   └── share/       # Share functionality
├── hooks/           # Custom React hooks
├── types/           # TypeScript types
└── lib/             # Utilities
```

## 🎯 Game Rules

- One puzzle per day (UTC-based)
- 6 maximum attempts
- Guess is case-insensitive
- Accepts exact matches, synonyms, and similar words
- Streak increments on consecutive daily wins
- Progress saved locally (no account needed)

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Upload dist/ folder to gh-pages branch
```

## 📝 License

MIT

## 🤝 Contributing

Feel free to submit issues and pull requests!

---

Made with ❤️ by the Emoji Cipher team
