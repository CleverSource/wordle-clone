import React, { HTMLAttributes } from "react";
import { MAX_ROWS } from "../constants";
import { Row } from "./Row";

type GridProps = HTMLAttributes<HTMLDivElement> & {
  solution: string;
  guesses: string[];
  currentGuess: string;
  currentRow: number;
};

export const Grid: React.FC<GridProps> = ({
  solution,
  guesses,
  currentGuess,
  currentRow,
}) => {
  const emptyRows =
    guesses.length < MAX_ROWS - 1
      ? Array.from(Array(MAX_ROWS - 1 - guesses.length))
      : [];

  return (
    <div className="grid gap-1">
      {guesses.map((guess, index) => {
        return (
          <Row key={index} word={guess} solution={solution} isRevealed={true} />
        );
      })}
      {guesses.length < MAX_ROWS && (
        <Row key={currentRow} word={currentGuess} solution={solution} />
      )}
      {emptyRows.map((_, index) => {
        return <Row key={index} solution={solution} />;
      })}
    </div>
  );
};
