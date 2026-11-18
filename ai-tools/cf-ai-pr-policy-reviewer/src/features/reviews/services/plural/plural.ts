/** "1 rule", "2 rules". */
export const plural = (count: number, word: string) =>
  `${count} ${word}${count === 1 ? "" : "s"}`;
