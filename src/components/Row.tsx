import React, { HTMLAttributes } from "react";
import { MAX_WORD_LENGTH } from "../constants";
import { validateDailyWord } from "../utils/validateDailyWord";
import { InputBox } from "./InputBox";

type RowProps = HTMLAttributes<HTMLDivElement> & {
  word?: string;
  solution: string;
  isRevealed?: boolean;
};

export const Row: React.FC<RowProps> = ({
  word,
  solution,
  isRevealed = false,
}) => {
  const rowLayout = [];
  for (let x = 0; x < MAX_WORD_LENGTH; x++) {
    rowLayout[x] = <InputBox key={`${x}`} />;
  }

  if (word) {
    const boxType = validateDailyWord(solution, word);
    [...word].forEach((char, index) => {
      rowLayout[index] = (
        <InputBox
          key={`${index}`}
          letter={char.toUpperCase()}
          type={isRevealed ? boxType[index] : "default"}
        />
      );
    });
  }

  return <div className="flex flex-row gap-1">{rowLayout}</div>;
};
