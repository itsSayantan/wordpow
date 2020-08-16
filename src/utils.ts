import words from "./words.json";

const getRandomWord = (): string => {
  const numberOfWords = words.length;
  const randomIndex: number = parseInt(
    (Math.random() * (numberOfWords - 1)).toFixed(0)
  );

  return words[randomIndex];
};

export { getRandomWord };
