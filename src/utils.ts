import words from "./words.json";

const getRandomWord = (): string => {
  const numberOfWords = words.length;
  const randomIndex: number = parseInt(
    (Math.random() * (numberOfWords - 1)).toFixed(0)
  );

  return words[randomIndex];
};

const roundNumber = (num: number): number => {
  if (num % 10 === 0) {
    return num;
  } else {
    const arr = num.toString().split(".");
    const integerPart = arr[0];
    const decimalPart = arr[1]
      .split("")
      .filter((a: string, i: number) => i < 3)
      .join("");
    return Number(integerPart + "." + decimalPart);
  }
};

const calculateWPM = (
  score: number,
  time: number,
  startTime: number,
  endTime: number
): number => {
  const wpm = score / ((time + (endTime - startTime)) / 1000 / 60);
  return roundNumber(wpm);
};

export { getRandomWord, calculateWPM };
