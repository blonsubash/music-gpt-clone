const MUSIC_PLACEHOLDERS = [
  "Describe your song",
  "What kind of music do you want to create?",
  "Tell me about the vibe you're going for",
  "Describe the mood of your track",
  "What genre are you thinking?",
  "Share your musical vision",
  "What instruments should be featured?",
  "Describe the energy level",
  "What's the story behind this song?",
  "What tempo are you imagining?",
  "Describe the atmosphere you want",
  "What emotions should this convey?",
  "Tell me about the melody you hear",
  "What's the theme of your composition?",
  "Describe the sound you're envisioning",
  "What style are you aiming for?",
  "Share your creative inspiration",
  "What kind of beat are you thinking?",
  "Describe the rhythm you want",
  "What's the feeling you want to capture?",
];

/**
 * Gets a random placeholder from the music placeholders array
 */
export function getRandomPlaceholder(): string {
  return MUSIC_PLACEHOLDERS[
    Math.floor(Math.random() * MUSIC_PLACEHOLDERS.length)
  ];
}

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Gets a shuffled array of placeholders
 */
export function getShuffledPlaceholders(): string[] {
  return shuffleArray(MUSIC_PLACEHOLDERS);
}
