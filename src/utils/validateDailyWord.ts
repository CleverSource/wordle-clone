import type { BoxTypeVariant } from "../constants";

export const validateDailyWord = (solution: string, guess: string) => {
  const splitSolution = [...solution];
  const splitGuess = [...guess];

  const solutionCharsTaken = splitSolution.map((_) => false);

  const statuses: BoxTypeVariant[] = Array.from(Array(guess.length));

  splitGuess.forEach((letter, index) => {
    if (letter === splitSolution[index]) {
      statuses[index] = "solved";
      solutionCharsTaken[index] = true;
      return;
    }
  });

  splitGuess.forEach((letter, index) => {
    if (statuses[index]) return;

    if (!splitSolution.includes(letter)) {
      statuses[index] = "wrong";
      return;
    }

    const indexOfPresentChar = splitSolution.findIndex(
      (value, index) => value === letter && !solutionCharsTaken[index]
    );

    if (indexOfPresentChar > -1) {
      statuses[index] = "misplaced";
      solutionCharsTaken[indexOfPresentChar] = true;
      return;
    } else {
      statuses[index] = "wrong";
      return;
    }
  });

  return statuses;
};
