import { Puzzle } from '../../types';

/**
 * PUZZLE DATA FORMAT
 *
 * Each puzzle should have:
 * - id: number (will be auto-assigned by generator)
 * - date: string (will be auto-assigned by generator)
 * - emojis: string[] - Array of 2-6 emojis that hint at the answer
 * - answer: string - The correct answer (word or short phrase)
 * - synonyms?: string[] - Optional array of acceptable alternative answers
 * - hint?: string - Optional hint text
 * - category?: string - Optional category (e.g., "Food", "Movie", "Phrase")
 *
 * TIPS FOR CREATING PUZZLES:
 * - Keep answers between 1-3 words
 * - Use 2-4 emojis typically (max 6)
 * - Make sure emojis clearly relate to the answer
 * - Add synonyms for words with multiple valid answers
 * - Test that emojis render on most devices
 */

export const puzzleBank: Omit<Puzzle, 'id' | 'date'>[] = [
  // Food & Drinks
  {
    emojis: ['🍕', '🇮🇹'],
    answer: 'pizza',
    synonyms: ['italian pizza', 'pie'],
    category: 'Food',
  },
  {
    emojis: ['🍔', '🍟'],
    answer: 'fast food',
    synonyms: ['burger and fries', 'junk food'],
    category: 'Food',
  },
  {
    emojis: ['☕', '🌅'],
    answer: 'morning coffee',
    synonyms: ['coffee', 'breakfast coffee'],
    category: 'Food',
  },
  {
    emojis: ['🍦', '😋'],
    answer: 'ice cream',
    synonyms: ['gelato', 'frozen dessert'],
    category: 'Food',
  },

  // Animals & Nature
  {
    emojis: ['🐝', '🍯'],
    answer: 'honey',
    synonyms: ['honeybee', 'bee honey'],
    category: 'Nature',
  },
  {
    emojis: ['🦁', '👑'],
    answer: 'king of the jungle',
    synonyms: ['lion', 'lion king'],
    category: 'Animals',
  },
  {
    emojis: ['🐧', '❄️'],
    answer: 'penguin',
    synonyms: ['arctic penguin', 'cold penguin'],
    category: 'Animals',
  },

  // Common Phrases
  {
    emojis: ['💔', '😢'],
    answer: 'heartbreak',
    synonyms: ['broken heart', 'sad heart'],
    category: 'Emotions',
  },
  {
    emojis: ['🌟', '👀'],
    answer: 'stargazing',
    synonyms: ['watching stars', 'star watching'],
    category: 'Activities',
  },
  {
    emojis: ['🔥', '💪'],
    answer: 'on fire',
    synonyms: ['lit', 'burning', 'hot streak'],
    category: 'Phrases',
  },

  // Technology
  {
    emojis: ['💻', '☕'],
    answer: 'coding',
    synonyms: ['programming', 'developer', 'computer work'],
    category: 'Technology',
  },
  {
    emojis: ['📱', '🔋'],
    answer: 'charging phone',
    synonyms: ['phone battery', 'charging'],
    category: 'Technology',
  },

  // Sports & Activities
  {
    emojis: ['⚽', '🥅'],
    answer: 'soccer goal',
    synonyms: ['football goal', 'goal', 'soccer'],
    category: 'Sports',
  },
  {
    emojis: ['🏃', '💨'],
    answer: 'running fast',
    synonyms: ['sprinting', 'fast runner', 'running'],
    category: 'Sports',
  },

  // Weather & Time
  {
    emojis: ['🌈', '☔'],
    answer: 'rainbow',
    synonyms: ['after rain', 'rain rainbow'],
    category: 'Weather',
  },
  {
    emojis: ['🌙', '⭐'],
    answer: 'starry night',
    synonyms: ['night sky', 'stars'],
    category: 'Weather',
  },

  // Movies & Entertainment
  {
    emojis: ['👻', '🎃'],
    answer: 'halloween',
    synonyms: ['spooky', 'trick or treat'],
    category: 'Holiday',
  },
  {
    emojis: ['🎬', '🍿'],
    answer: 'movie night',
    synonyms: ['cinema', 'watching movie', 'movies'],
    category: 'Entertainment',
  },

  // Objects & Tools
  {
    emojis: ['✂️', '📄'],
    answer: 'scissors',
    synonyms: ['cutting paper', 'cut'],
    category: 'Objects',
  },
  {
    emojis: ['🔑', '🚪'],
    answer: 'unlock',
    synonyms: ['key', 'unlocking', 'open door'],
    category: 'Objects',
  },

  // Emotions & Mental States
  {
    emojis: ['🧠', '💡'],
    answer: 'idea',
    synonyms: ['thought', 'concept'],
    category: 'Mental',
  },
  {
    emojis: ['⏰', '💤'],
    answer: 'sleep',
    synonyms: ['rest', 'nap'],
    category: 'Daily Life',
  },
  {
    emojis: ['🔥', '💪'],
    answer: 'motivation',
    synonyms: ['drive', 'energy'],
    category: 'Emotions',
  },
  {
    emojis: ['📈', '💰'],
    answer: 'profit',
    synonyms: ['gain', 'earnings'],
    category: 'Business',
  },
  {
    emojis: ['🌧️', '☔'],
    answer: 'rain',
    synonyms: ['storm', 'shower'],
    category: 'Weather',
  },
  {
    emojis: ['🧘', '😌'],
    answer: 'calm',
    synonyms: ['peace', 'relaxation'],
    category: 'Emotions',
  },
  {
    emojis: ['📚', '🧠'],
    answer: 'learning',
    synonyms: ['study', 'education'],
    category: 'Education',
  },
  {
    emojis: ['💼', '🏢'],
    answer: 'work',
    synonyms: ['job', 'career'],
    category: 'Business',
  },
  {
    emojis: ['🏃', '💦'],
    answer: 'exercise',
    synonyms: ['workout', 'training'],
    category: 'Sports',
  },
  {
    emojis: ['🍎', '🥗'],
    answer: 'healthy',
    synonyms: ['nutrition', 'wellness'],
    category: 'Health',
  },
  {
    emojis: ['😴', '⏰'],
    answer: 'oversleep',
    synonyms: ['late', 'tired'],
    category: 'Daily Life',
  },
  {
    emojis: ['💡', '🚀'],
    answer: 'innovation',
    synonyms: ['invention', 'breakthrough'],
    category: 'Business',
  },
  {
    emojis: ['💸', '📉'],
    answer: 'loss',
    synonyms: ['decline', 'deficit'],
    category: 'Business',
  },
  {
    emojis: ['🌱', '⏳'],
    answer: 'growth',
    synonyms: ['progress', 'development'],
    category: 'Concepts',
  },
  {
    emojis: ['😤', '🔥'],
    answer: 'anger',
    synonyms: ['rage', 'frustration'],
    category: 'Emotions',
  },
  {
    emojis: ['🤝', '💬'],
    answer: 'agreement',
    synonyms: ['deal', 'consensus'],
    category: 'Social',
  },
  {
    emojis: ['🎯', '🧠'],
    answer: 'focus',
    synonyms: ['concentration', 'attention'],
    category: 'Mental',
  },
  {
    emojis: ['🚧', '🛑'],
    answer: 'obstacle',
    synonyms: ['block', 'barrier'],
    category: 'Challenges',
  },
  {
    emojis: ['💭', '🧠'],
    answer: 'thinking',
    synonyms: ['reflection', 'thought'],
    category: 'Mental',
  },
  {
    emojis: ['🎉', '🥂'],
    answer: 'celebration',
    synonyms: ['party', 'success'],
    category: 'Social',
  },
  {
    emojis: ['😬', '💭'],
    answer: 'anxiety',
    synonyms: ['stress', 'worry'],
    category: 'Emotions',
  },
  {
    emojis: ['📊', '🧮'],
    answer: 'analysis',
    synonyms: ['evaluation', 'calculation'],
    category: 'Business',
  },
  {
    emojis: ['🏆', '💪'],
    answer: 'achievement',
    synonyms: ['victory', 'success'],
    category: 'Success',
  },
  {
    emojis: ['🛠️', '💡'],
    answer: 'solution',
    synonyms: ['fix', 'answer'],
    category: 'Problem Solving',
  },
  {
    emojis: ['⏳', '😤'],
    answer: 'patience',
    synonyms: ['waiting', 'endurance'],
    category: 'Emotions',
  },
  {
    emojis: ['🧑‍🤝‍🧑', '❤️'],
    answer: 'friendship',
    synonyms: ['bond', 'connection'],
    category: 'Social',
  },
  {
    emojis: ['🌍', '✈️'],
    answer: 'travel',
    synonyms: ['journey', 'trip'],
    category: 'Activities',
  },
  {
    emojis: ['💤', '😵'],
    answer: 'exhausted',
    synonyms: ['tired', 'burnout'],
    category: 'Emotions',
  },
  {
    emojis: ['🪙', '📈'],
    answer: 'investment',
    synonyms: ['asset', 'capital'],
    category: 'Business',
  },
  {
    emojis: ['🎨', '🧠'],
    answer: 'creativity',
    synonyms: ['imagination', 'artistry'],
    category: 'Mental',
  },

  // MORE PUZZLES TO ADD:
  // Add your puzzles below following the same format!
  // Example template:
  // {
  //   emojis: ['😀', '🎉'],
  //   answer: 'celebration',
  //   synonyms: ['party', 'happy celebration'],
  //   category: 'Emotions',
  // },
];

// Validate puzzle bank on load
if (puzzleBank.length === 0) {
  throw new Error('Puzzle bank cannot be empty!');
}

console.log(`✅ Loaded ${puzzleBank.length} puzzles into the bank`);
